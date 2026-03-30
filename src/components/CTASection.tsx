import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";

const CTASection = () => (
  <section className="py-24 relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-warm opacity-50" />
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl" />

    <div className="container mx-auto px-4 relative">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-3xl mx-auto text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", delay: 0.2 }}
          className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6"
        >
          <Sparkles className="w-8 h-8 text-primary" />
        </motion.div>

        <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
          Ready to Plan Your{" "}
          <span className="text-gradient-primary">Dream Trip?</span>
        </h2>
        <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
          Join thousands of budget travelers who plan smarter with AI. No sign-up required — start planning in seconds.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/plan"
            className="inline-flex items-center justify-center gap-2 bg-gradient-hero text-primary-foreground px-10 py-4 rounded-2xl font-semibold text-lg hover:opacity-90 transition-all hover:scale-105 shadow-elevated"
          >
            Start Planning Now
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            to="/auth"
            className="inline-flex items-center justify-center gap-2 bg-card text-foreground px-10 py-4 rounded-2xl font-semibold text-lg border border-border hover:border-primary/30 transition-all"
          >
            Create Free Account
          </Link>
        </div>
      </motion.div>
    </div>
  </section>
);

export default CTASection;
