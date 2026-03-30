import { motion } from "framer-motion";
import { Bed, Utensils, Bus, Lightbulb } from "lucide-react";

interface RecommendationsProps {
  recommendations: {
    stay: string[];
    eat: string[];
    transport: string[];
  };
  tips: string[];
}

const Recommendations = ({ recommendations, tips }: RecommendationsProps) => (
  <>
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="grid sm:grid-cols-3 gap-4 mb-8"
    >
      {[
        { icon: Bed, title: "Stay", items: recommendations.stay },
        { icon: Utensils, title: "Eat", items: recommendations.eat },
        { icon: Bus, title: "Transport", items: recommendations.transport },
      ].map((rec) => (
        <div key={rec.title} className="bg-card rounded-2xl border border-border p-6 shadow-card">
          <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center mb-4">
            <rec.icon className="w-5 h-5 text-primary" />
          </div>
          <h4 className="font-bold text-foreground mb-3">{rec.title}</h4>
          <ul className="space-y-2">
            {rec.items.map((item, i) => (
              <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                <span className="text-primary mt-1">•</span> {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </motion.div>

    {tips && tips.length > 0 && (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-card rounded-2xl border border-border p-6 shadow-card"
      >
        <h4 className="font-bold text-foreground mb-3 flex items-center gap-2">
          <Lightbulb className="w-4 h-4 text-primary" /> Budget Tips
        </h4>
        <ul className="space-y-2">
          {tips.map((tip, i) => (
            <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
              <span className="text-primary mt-1">•</span> {tip}
            </li>
          ))}
        </ul>
      </motion.div>
    )}
  </>
);

export default Recommendations;
