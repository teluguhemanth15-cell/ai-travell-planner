import { motion } from "framer-motion";
import { Brain, IndianRupee, Utensils, MapPin, Clock, Shield } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Itineraries",
    desc: "Our AI builds day-by-day travel plans tailored to your destination, budget, and group size.",
  },
  {
    icon: IndianRupee,
    title: "Budget Breakdown",
    desc: "See exactly where your money goes — transport, food, stays, and activities, all within your budget.",
  },
  {
    icon: Utensils,
    title: "Food Recommendations",
    desc: "Discover must-try local dishes and budget-friendly restaurants at every destination.",
  },
  {
    icon: MapPin,
    title: "Hidden Gems",
    desc: "Explore offbeat spots and local favorites that typical tourists miss.",
  },
  {
    icon: Clock,
    title: "Plan in 30 Seconds",
    desc: "Enter destination, travelers, and budget — get a complete trip plan instantly.",
  },
  {
    icon: Shield,
    title: "Trusted & Free",
    desc: "No hidden fees, no sign-up walls. Just honest, AI-powered travel planning.",
  },
];

const FeaturesSection = () => (
  <section className="py-24 relative overflow-hidden">
    {/* Background decoration */}
    <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
    <div className="absolute bottom-0 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

    <div className="container mx-auto px-4 relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <span className="text-sm font-semibold text-primary uppercase tracking-wider">Why Tourfinco</span>
        <h2 className="text-3xl md:text-5xl font-bold text-foreground mt-3 mb-4">
          Everything You Need to{" "}
          <span className="text-gradient-primary">Travel Smart</span>
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          One app to plan your entire trip — powered by AI, designed for budget travelers.
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            whileHover={{ y: -6, transition: { duration: 0.25 } }}
            className="bg-card rounded-2xl p-7 border border-border shadow-card hover:shadow-card-hover transition-shadow group"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
              <f.icon className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-bold text-foreground mb-2">{f.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default FeaturesSection;
