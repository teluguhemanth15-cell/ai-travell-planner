import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import TripOverviewCard from "@/components/trip/TripOverviewCard";
import BudgetBreakdown from "@/components/trip/BudgetBreakdown";
import DailyItinerary from "@/components/trip/DailyItinerary";
import Recommendations from "@/components/trip/Recommendations";
import TripMap from "@/components/trip/TripMap";
import TripLoadingSkeleton from "@/components/trip/TripLoadingSkeleton";
import { ArrowLeft } from "lucide-react";

export interface ItineraryData {
  destination: string;
  totalBudget: string;
  budgetBreakdown: {
    accommodation: { percentage: number; amount: string };
    food: { percentage: number; amount: string };
    travel: { percentage: number; amount: string };
    activities: { percentage: number; amount: string };
  };
  itinerary: {
    day: string;
    title: string;
    items: { type: string; label: string }[];
  }[];
  recommendations: {
    stay: string[];
    eat: string[];
    transport: string[];
  };
  tips: string[];
  mapLocations: {
    name: string;
    lat: number;
    lng: number;
    type: string;
  }[];
}

const TripResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const state = (location.state as { destination: string; passengers: string; budget: string; duration: string }) || {
    destination: "Goa",
    passengers: "solo",
    budget: "medium",
    duration: "medium",
  };

  const [loading, setLoading] = useState(true);
  const [itineraryData, setItineraryData] = useState<ItineraryData | null>(null);

  const { destination, passengers, budget, duration } = state;

  const passLabel: Record<string, string> = {
    solo: "Solo Traveler",
    couple: "Couple",
    family: "Family (3–5)",
    group: "Group (6+)",
  };

  useEffect(() => {
    const generatePlan = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase.functions.invoke("generate-itinerary", {
          body: { destination, passengers, budget, duration },
        });

        if (error) throw error;
        if (data?.error) throw new Error(data.error);

        setItineraryData(data);
      } catch (err: any) {
        console.error("Failed to generate itinerary:", err);
        toast({
          title: "Failed to generate plan",
          description: err.message || "Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    generatePlan();
  }, [destination, passengers, budget, duration]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <button
            onClick={() => navigate("/plan")}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 font-medium"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Planner
          </button>

          {loading ? (
            <TripLoadingSkeleton />
          ) : itineraryData ? (
            <>
              <TripOverviewCard
                destination={itineraryData.destination}
                passengers={passLabel[passengers] || passengers}
                totalBudget={itineraryData.totalBudget}
              />

              {/* Map */}
              {itineraryData.mapLocations && itineraryData.mapLocations.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  className="mb-8"
                >
                  <TripMap locations={itineraryData.mapLocations} destination={itineraryData.destination} />
                </motion.div>
              )}

              <div className="grid md:grid-cols-3 gap-6 mb-10">
                <BudgetBreakdown breakdown={itineraryData.budgetBreakdown} />
                <DailyItinerary itinerary={itineraryData.itinerary} />
              </div>

              <Recommendations recommendations={itineraryData.recommendations} tips={itineraryData.tips} />
            </>
          ) : (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg">Failed to generate your travel plan. Please go back and try again.</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TripResult;
