import { motion } from "framer-motion";
import { MapPin, Utensils, Bus } from "lucide-react";

const iconMap: Record<string, typeof MapPin> = {
  place: MapPin,
  food: Utensils,
  transport: Bus,
};

interface DailyItineraryProps {
  itinerary: {
    day: string;
    title: string;
    items: { type: string; label: string }[];
  }[];
}

const DailyItinerary = ({ itinerary }: DailyItineraryProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.2 }}
    className="md:col-span-2 flex flex-col gap-4"
  >
    {itinerary.map((day, di) => (
      <div key={day.day} className="bg-card rounded-2xl border border-border p-6 shadow-card">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-hero text-primary-foreground flex items-center justify-center font-bold text-sm">
            {di + 1}
          </div>
          <div>
            <span className="text-xs text-muted-foreground font-medium">{day.day}</span>
            <h4 className="font-bold text-foreground">{day.title}</h4>
          </div>
        </div>
        <div className="flex flex-col gap-3 pl-2">
          {day.items.map((item, ii) => {
            const Icon = iconMap[item.type] || MapPin;
            return (
              <div key={ii} className="flex items-start gap-3 text-sm">
                <Icon className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground">{item.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    ))}
  </motion.div>
);

export default DailyItinerary;
