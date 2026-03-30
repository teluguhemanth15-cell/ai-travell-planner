import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, MapPin, TrendingUp, DollarSign } from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";

interface Stats {
  totalUsers: number;
  totalTrips: number;
  avgBudget: number;
  topDestination: string;
}

const AdminDashboard = () => {
  const [stats, setStats] = useState<Stats>({
    totalUsers: 0,
    totalTrips: 0,
    avgBudget: 0,
    topDestination: "N/A",
  });
  const [recentTrips, setRecentTrips] = useState<any[]>([]);

  useEffect(() => {
    const fetchStats = async () => {
      const [profilesRes, tripsRes] = await Promise.all([
        supabase.from("profiles").select("id", { count: "exact", head: true }),
        supabase.from("trips").select("*"),
      ]);

      const trips = tripsRes.data || [];
      const budgets = trips.filter((t) => t.budget).map((t) => Number(t.budget));
      const avgBudget = budgets.length ? budgets.reduce((a, b) => a + b, 0) / budgets.length : 0;

      // Find top destination
      const destCounts: Record<string, number> = {};
      trips.forEach((t) => {
        destCounts[t.destination] = (destCounts[t.destination] || 0) + 1;
      });
      const topDest = Object.entries(destCounts).sort((a, b) => b[1] - a[1])[0];

      setStats({
        totalUsers: profilesRes.count || 0,
        totalTrips: trips.length,
        avgBudget: Math.round(avgBudget),
        topDestination: topDest ? topDest[0] : "N/A",
      });

      setRecentTrips(trips.slice(0, 5));
    };

    fetchStats();
  }, []);

  const statCards = [
    { label: "Total Users", value: stats.totalUsers, icon: Users, color: "text-primary" },
    { label: "Total Trips", value: stats.totalTrips, icon: MapPin, color: "text-green-600" },
    { label: "Avg Budget", value: `₹${stats.avgBudget.toLocaleString()}`, icon: DollarSign, color: "text-amber-600" },
    { label: "Top Destination", value: stats.topDestination, icon: TrendingUp, color: "text-blue-600" },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-foreground">Dashboard</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map((s) => (
            <Card key={s.label}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{s.label}</CardTitle>
                <s.icon className={`h-5 w-5 ${s.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{s.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent Trips</CardTitle>
          </CardHeader>
          <CardContent>
            {recentTrips.length === 0 ? (
              <p className="text-muted-foreground text-sm">No trips yet.</p>
            ) : (
              <div className="space-y-3">
                {recentTrips.map((trip) => (
                  <div key={trip.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div>
                      <p className="font-medium">{trip.destination}</p>
                      <p className="text-sm text-muted-foreground">
                        {trip.start_date} → {trip.end_date}
                      </p>
                    </div>
                    <span className="text-sm font-semibold text-primary">
                      ₹{trip.budget ? Number(trip.budget).toLocaleString() : "N/A"}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
