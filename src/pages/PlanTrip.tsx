import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import { MapPin, Users, Wallet, Clock, ArrowLeft, ArrowRight, Search } from "lucide-react";

const popularDests = ["Goa", "Manali", "Kerala", "Jaipur", "Udaipur", "Rishikesh", "Shimla", "Ooty"];

const passengerOptions = [
  { label: "Solo", desc: "Just me", emoji: "🧳", value: "solo" },
  { label: "Couple", desc: "2 travelers", emoji: "💑", value: "couple" },
  { label: "Family", desc: "3–5 people", emoji: "👨‍👩‍👧‍👦", value: "family" },
  { label: "Group", desc: "6+ people", emoji: "👥", value: "group" },
];

const budgetOptions = [
  { label: "Low Budget", range: "₹5,000 – ₹15,000", value: "low", emoji: "💰" },
  { label: "Medium Budget", range: "₹15,000 – ₹40,000", value: "medium", emoji: "💎" },
  { label: "High Budget", range: "₹40,000+", value: "high", emoji: "👑" },
];

const durationOptions = [
  { label: "1–2 days", value: "short", emoji: "⚡" },
  { label: "3–5 days", value: "medium", emoji: "🌤️" },
  { label: "1 week", value: "week", emoji: "📅" },
  { label: "10+ days", value: "long", emoji: "🗺️" },
];

const PlanTrip = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [destination, setDestination] = useState("");
  const [search, setSearch] = useState("");
  const [passengers, setPassengers] = useState("");
  const [budget, setBudget] = useState("");
  const [duration, setDuration] = useState("");

  const canProceed = [
    destination.length > 0,
    passengers.length > 0,
    budget.length > 0,
    duration.length > 0,
  ][step];

  const handleSubmit = () => {
    navigate("/result", { state: { destination, passengers, budget, duration } });
  };

  const filteredDests = popularDests.filter((d) =>
    d.toLowerCase().includes(search.toLowerCase())
  );

  const stepIcons = [MapPin, Users, Wallet, Clock];
  const stepLabels = ["Destination", "Travelers", "Budget", "Duration"];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-2xl">
          {/* Progress */}
          <div className="flex items-center justify-center gap-2 mb-10">
            {stepLabels.map((label, i) => {
              const Icon = stepIcons[i];
              return (
                <div key={label} className="flex items-center gap-2">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                      i <= step ? "bg-gradient-hero text-primary-foreground" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  {i < 3 && (
                    <div className={`w-8 h-0.5 rounded ${i < step ? "bg-primary" : "bg-border"}`} />
                  )}
                </div>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.3 }}
            >
              {step === 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-2 text-center">Where do you want to go?</h2>
                  <p className="text-muted-foreground text-center mb-8">Search or pick a popular destination</p>
                  <div className="relative mb-6">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Search destinations..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 bg-muted rounded-2xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 text-lg"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {filteredDests.map((d) => (
                      <button
                        key={d}
                        onClick={() => { setDestination(d); setSearch(d); }}
                        className={`p-4 rounded-2xl border-2 text-left font-medium transition-all ${
                          destination === d
                            ? "border-primary bg-secondary text-foreground shadow-card"
                            : "border-border bg-card text-foreground hover:border-primary/30"
                        }`}
                      >
                        <MapPin className="w-4 h-4 text-primary mb-1 inline-block mr-2" />
                        {d}
                      </button>
                    ))}
                  </div>
                  {search && !popularDests.includes(search) && (
                    <button
                      onClick={() => setDestination(search)}
                      className={`mt-3 w-full p-4 rounded-2xl border-2 text-left font-medium transition-all ${
                        destination === search
                          ? "border-primary bg-secondary text-foreground"
                          : "border-border bg-card text-foreground hover:border-primary/30"
                      }`}
                    >
                      <MapPin className="w-4 h-4 text-primary mb-1 inline-block mr-2" />
                      {search}
                    </button>
                  )}
                </div>
              )}

              {step === 1 && (
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-2 text-center">How many people are traveling?</h2>
                  <p className="text-muted-foreground text-center mb-8">Select your travel group</p>
                  <div className="grid grid-cols-2 gap-4">
                    {passengerOptions.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => setPassengers(opt.value)}
                        className={`p-6 rounded-2xl border-2 text-center transition-all ${
                          passengers === opt.value
                            ? "border-primary bg-secondary shadow-card"
                            : "border-border bg-card hover:border-primary/30"
                        }`}
                      >
                        <div className="text-4xl mb-3">{opt.emoji}</div>
                        <div className="font-bold text-foreground">{opt.label}</div>
                        <div className="text-sm text-muted-foreground">{opt.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 2 && (
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-2 text-center">What is your travel budget?</h2>
                  <p className="text-muted-foreground text-center mb-8">Per person estimated budget</p>
                  <div className="flex flex-col gap-4">
                    {budgetOptions.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => setBudget(opt.value)}
                        className={`p-6 rounded-2xl border-2 flex items-center gap-4 transition-all ${
                          budget === opt.value
                            ? "border-primary bg-secondary shadow-card"
                            : "border-border bg-card hover:border-primary/30"
                        }`}
                      >
                        <span className="text-3xl">{opt.emoji}</span>
                        <div className="text-left">
                          <div className="font-bold text-foreground">{opt.label}</div>
                          <div className="text-sm text-muted-foreground">{opt.range}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 3 && (
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-2 text-center">How long is your trip?</h2>
                  <p className="text-muted-foreground text-center mb-8">Select trip duration</p>
                  <div className="grid grid-cols-2 gap-4">
                    {durationOptions.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => setDuration(opt.value)}
                        className={`p-6 rounded-2xl border-2 text-center transition-all ${
                          duration === opt.value
                            ? "border-primary bg-secondary shadow-card"
                            : "border-border bg-card hover:border-primary/30"
                        }`}
                      >
                        <div className="text-3xl mb-2">{opt.emoji}</div>
                        <div className="font-bold text-foreground">{opt.label}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex justify-between mt-10">
            <button
              onClick={() => setStep(Math.max(0, step - 1))}
              disabled={step === 0}
              className="flex items-center gap-2 px-6 py-3 rounded-xl text-muted-foreground hover:text-foreground disabled:opacity-30 transition-all font-medium"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            {step < 3 ? (
              <button
                onClick={() => setStep(step + 1)}
                disabled={!canProceed}
                className="flex items-center gap-2 px-8 py-3 rounded-xl bg-gradient-hero text-primary-foreground font-semibold disabled:opacity-40 transition-all hover:opacity-90"
              >
                Next <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={!canProceed}
                className="flex items-center gap-2 px-8 py-3 rounded-xl bg-gradient-hero text-primary-foreground font-semibold disabled:opacity-40 transition-all hover:opacity-90"
              >
                Generate Plan ✨
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanTrip;
