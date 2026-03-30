import { Suspense } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import TravelGlobe from "./3d/TravelGlobe";

const HeroSection = () => (
  <section className="relative pt-24 pb-8 overflow-hidden min-h-[90vh] flex items-center">
    {/* Subtle background */}
    <div className="absolute inset-0 bg-gradient-warm opacity-30" />
    <div className="absolute top-20 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
    <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />

    <div className="container mx-auto px-4 relative">
      <div className="grid lg:grid-cols-2 gap-4 items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center lg:text-left"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-secondary px-4 py-2 rounded-full mb-6"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-secondary-foreground">AI-Powered Trip Planning</span>
          </motion.div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 text-foreground">
            Your AI Travel
            <br />
            <span className="text-gradient-primary">Budget Planner</span>
          </h1>

          <p className="text-lg text-muted-foreground mb-8 max-w-lg mx-auto lg:mx-0">
            Tell us your destination, budget & group size — get a complete AI-generated itinerary with food, stays, transport & hidden gems. All within your budget.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link
              to="/plan"
              className="inline-flex items-center justify-center gap-2 bg-gradient-hero text-primary-foreground px-8 py-4 rounded-2xl font-semibold text-lg hover:opacity-90 transition-all hover:scale-105 shadow-elevated"
            >
              Plan My Trip
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="#how-it-works"
              className="inline-flex items-center justify-center gap-2 bg-card text-foreground px-8 py-4 rounded-2xl font-semibold text-lg border border-border hover:border-primary/30 transition-all"
            >
              How it Works
            </a>
          </div>

          {/* Trust badges */}
          <div className="flex items-center gap-6 mt-8 justify-center lg:justify-start">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="w-2 h-2 rounded-full bg-primary" />
              Free to use
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="w-2 h-2 rounded-full bg-primary" />
              No sign-up needed
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="hidden lg:block"
        >
          <Suspense fallback={<div className="w-full h-[500px] flex items-center justify-center text-muted-foreground">Loading 3D Scene...</div>}>
            <TravelGlobe />
          </Suspense>
        </motion.div>
      </div>
    </div>
  </section>
);

export default HeroSection;
