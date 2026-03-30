import { motion } from "framer-motion";
import { IndianRupee } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const pieColors = ["#FF6B00", "#FF8C40", "#FFB380", "#FFE5D0"];

interface BudgetBreakdownProps {
  breakdown: {
    accommodation: { percentage: number; amount: string };
    food: { percentage: number; amount: string };
    travel: { percentage: number; amount: string };
    activities: { percentage: number; amount: string };
  };
}

const BudgetBreakdown = ({ breakdown }: BudgetBreakdownProps) => {
  const pieData = [
    { name: "Accommodation", value: breakdown.accommodation.percentage, amount: breakdown.accommodation.amount },
    { name: "Food", value: breakdown.food.percentage, amount: breakdown.food.amount },
    { name: "Travel", value: breakdown.travel.percentage, amount: breakdown.travel.amount },
    { name: "Activities", value: breakdown.activities.percentage, amount: breakdown.activities.amount },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="md:col-span-1 bg-card rounded-2xl border border-border p-6 shadow-card"
    >
      <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
        <IndianRupee className="w-4 h-4 text-primary" /> Budget Breakdown
      </h3>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={pieData} cx="50%" cy="50%" innerRadius={40} outerRadius={70} dataKey="value" paddingAngle={4}>
              {pieData.map((_, i) => (
                <Cell key={i} fill={pieColors[i]} />
              ))}
            </Pie>
            <Tooltip formatter={(value: number) => `${value}%`} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="flex flex-col gap-2 mt-2">
        {pieData.map((item, i) => (
          <div key={item.name} className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: pieColors[i] }} />
              <span className="text-muted-foreground">{item.name}</span>
            </div>
            <span className="font-medium text-foreground">{item.amount}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default BudgetBreakdown;
