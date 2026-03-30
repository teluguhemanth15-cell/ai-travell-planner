import { motion } from "framer-motion";

const stats = [
  { value: "10K+", label: "Trips Planned" },
  { value: "50+", label: "Destinations" },
  { value: "₹500", label: "Avg. Savings/Trip" },
  { value: "4.8★", label: "User Rating" },
];

const StatsSection = () => (
  <section className="py-16 bg-gradient-hero">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, type: "spring", stiffness: 200 }}
            className="text-center"
          >
            <div className="text-3xl md:text-4xl font-extrabold text-primary-foreground mb-1">
              {s.value}
            </div>
            <div className="text-sm font-medium text-primary-foreground/70">{s.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default StatsSection;
