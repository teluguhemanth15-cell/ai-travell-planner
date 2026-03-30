import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import goaImg from "@/assets/destinations/goa.jpg";
import manaliImg from "@/assets/destinations/manali.jpg";
import keralaImg from "@/assets/destinations/kerala.jpg";
import jaipurImg from "@/assets/destinations/jaipur.jpg";

const destinations = [
  { name: "Goa", tag: "Beaches & Nightlife", budget: "₹8,000", img: goaImg },
  { name: "Manali", tag: "Mountains & Snow", budget: "₹12,000", img: manaliImg },
  { name: "Kerala", tag: "Backwaters & Nature", budget: "₹10,000", img: keralaImg },
  { name: "Jaipur", tag: "Heritage & Culture", budget: "₹7,000", img: jaipurImg },
];

const DestinationsPreview = () => (
  <section id="destinations" className="py-24">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          Popular <span className="text-gradient-primary">Destinations</span>
        </h2>
        <p className="text-muted-foreground text-lg">Budget-friendly trips starting from just ₹7,000</p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {destinations.map((d, i) => (
          <motion.div
            key={d.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <Link
              to="/plan"
              className="block bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all hover:-translate-y-2 group border border-border"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={d.img}
                  alt={d.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <span className="absolute bottom-3 left-3 text-sm font-semibold text-white bg-primary/90 px-3 py-1 rounded-full">
                  From {d.budget}
                </span>
              </div>
              <div className="p-5">
                <h3 className="text-xl font-bold text-foreground mb-1">{d.name}</h3>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">{d.tag}</p>
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default DestinationsPreview;
