import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { destination, passengers, budget, duration } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const budgetRanges: Record<string, string> = {
      low: "₹5,000–₹15,000",
      medium: "₹15,000–₹40,000",
      high: "₹40,000+",
    };
    const durationMap: Record<string, string> = {
      short: "1-2 days",
      medium: "3-5 days",
      week: "7 days",
      long: "10+ days",
    };
    const passMap: Record<string, string> = {
      solo: "solo traveler",
      couple: "couple (2 people)",
      family: "family of 3-5 people",
      group: "group of 6+ people",
    };

    const systemPrompt = `You are an expert Indian travel planner. Generate detailed, practical, budget-conscious travel itineraries. Always include real place names, real restaurant suggestions, and realistic prices in Indian Rupees. Be specific and actionable.`;

    const userPrompt = `Create a detailed travel itinerary for ${destination}, India for a ${passMap[passengers] || passengers} with a budget of ${budgetRanges[budget] || budget} for ${durationMap[duration] || duration}.

Return a JSON object with this exact structure (no markdown, just raw JSON):
{
  "destination": "${destination}",
  "totalBudget": "estimated total in ₹",
  "budgetBreakdown": {
    "accommodation": { "percentage": number, "amount": "₹X,XXX" },
    "food": { "percentage": number, "amount": "₹X,XXX" },
    "travel": { "percentage": number, "amount": "₹X,XXX" },
    "activities": { "percentage": number, "amount": "₹X,XXX" }
  },
  "itinerary": [
    {
      "day": "Day 1",
      "title": "descriptive title",
      "items": [
        { "type": "place", "label": "specific activity with real place name" },
        { "type": "food", "label": "specific food recommendation with restaurant name and price" },
        { "type": "transport", "label": "specific transport option with cost" }
      ]
    }
  ],
  "recommendations": {
    "stay": ["specific accommodation with price range"],
    "eat": ["specific restaurant/food stall with specialty"],
    "transport": ["specific transport option with cost"]
  },
  "tips": ["practical budget tip"],
  "mapLocations": [
    { "name": "Place name", "lat": number, "lng": number, "type": "attraction|food|hotel|transport" }
  ]
}`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please try again later." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      throw new Error("AI gateway error");
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "";
    
    // Extract JSON from the response (handle possible markdown wrapping)
    let jsonStr = content;
    const jsonMatch = content.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (jsonMatch) jsonStr = jsonMatch[1];
    
    const itineraryData = JSON.parse(jsonStr.trim());

    return new Response(JSON.stringify(itineraryData), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("generate-itinerary error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Failed to generate itinerary" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
