import { motion } from "framer-motion";
import { Bookmark, Share2, Download } from "lucide-react";

interface TripOverviewCardProps {
  destination: string;
  passengers: string;
  totalBudget: string;
}

const TripOverviewCard = ({ destination, passengers, totalBudget }: TripOverviewCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-gradient-hero rounded-3xl p-8 md:p-10 text-primary-foreground mb-8"
  >
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div>
        <p className="text-sm opacity-80 mb-1">Your AI Travel Plan</p>
        <h1 className="text-3xl md:text-4xl font-extrabold mb-2">{destination}</h1>
        <div className="flex flex-wrap gap-3 text-sm">
          <span className="bg-background/20 px-3 py-1 rounded-full">{passengers}</span>
          <span className="bg-background/20 px-3 py-1 rounded-full">Est. {totalBudget}</span>
        </div>
      </div>
      <div className="flex gap-2">
        {[Bookmark, Share2, Download].map((Icon, i) => (
          <button key={i} className="w-10 h-10 rounded-xl bg-background/20 flex items-center justify-center hover:bg-background/30 transition-colors">
            <Icon className="w-5 h-5" />
          </button>
        ))}
      </div>
    </div>
  </motion.div>
);

export default TripOverviewCard;
