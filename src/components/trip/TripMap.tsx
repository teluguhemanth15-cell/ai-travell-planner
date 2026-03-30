import { MapPin } from "lucide-react";

interface TripMapProps {
  locations: { name: string; lat: number; lng: number; type: string }[];
  destination: string;
}

const typeColors: Record<string, string> = {
  attraction: "bg-primary text-primary-foreground",
  food: "bg-orange-400 text-primary-foreground",
  hotel: "bg-blue-500 text-primary-foreground",
  transport: "bg-green-500 text-primary-foreground",
};

const TripMap = ({ locations, destination }: TripMapProps) => {
  // Use OpenStreetMap embed as a free map solution
  const center = locations[0];
  const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${center.lng - 0.1},${center.lat - 0.05},${center.lng + 0.1},${center.lat + 0.05}&layer=mapnik&marker=${center.lat},${center.lng}`;

  return (
    <div className="bg-card rounded-2xl border border-border overflow-hidden shadow-card">
      <div className="p-4 border-b border-border">
        <h3 className="font-bold text-foreground flex items-center gap-2">
          <MapPin className="w-4 h-4 text-primary" /> Map — {destination}
        </h3>
      </div>
      <div className="relative">
        <iframe
          src={mapUrl}
          width="100%"
          height="300"
          className="border-0"
          loading="lazy"
          title={`Map of ${destination}`}
        />
      </div>
      <div className="p-4 flex flex-wrap gap-2">
        {locations.map((loc, i) => (
          <span
            key={i}
            className={`text-xs px-3 py-1.5 rounded-full font-medium ${typeColors[loc.type] || "bg-muted text-muted-foreground"}`}
          >
            📍 {loc.name}
          </span>
        ))}
      </div>
    </div>
  );
};

export default TripMap;
