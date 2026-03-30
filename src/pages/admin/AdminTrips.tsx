import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

interface Trip {
  id: string;
  user_id: string | null;
  destination: string;
  start_date: string | null;
  end_date: string | null;
  budget: number | null;
  travelers: number | null;
  created_at: string;
}

const AdminTrips = () => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const { toast } = useToast();

  const fetchTrips = async () => {
    const { data } = await supabase
      .from("trips")
      .select("*")
      .order("created_at", { ascending: false });
    setTrips(data || []);
  };

  useEffect(() => {
    fetchTrips();
  }, []);

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("trips").delete().eq("id", id);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Trip deleted" });
      fetchTrips();
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-foreground">Trip Management</h2>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">All Trips ({trips.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Destination</TableHead>
                  <TableHead>Dates</TableHead>
                  <TableHead>Budget</TableHead>
                  <TableHead>Travelers</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {trips.map((trip) => (
                  <TableRow key={trip.id}>
                    <TableCell className="font-medium">{trip.destination}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {trip.start_date && trip.end_date
                        ? `${format(new Date(trip.start_date), "MMM dd")} – ${format(new Date(trip.end_date), "MMM dd, yyyy")}`
                        : "N/A"}
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">
                        ₹{trip.budget ? Number(trip.budget).toLocaleString() : "N/A"}
                      </Badge>
                    </TableCell>
                    <TableCell>{trip.travelers || 1}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {format(new Date(trip.created_at), "MMM dd, yyyy")}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive hover:text-destructive"
                        onClick={() => handleDelete(trip.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {trips.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                      No trips found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminTrips;
