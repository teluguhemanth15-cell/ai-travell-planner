import { motion } from "framer-motion";
import compassImg from "@/assets/3d-compass.png";
import suitcaseImg from "@/assets/3d-suitcase.png";
import airplaneImg from "@/assets/3d-airplane.png";

const steps = [
  {
    img: compassImg,
    title: "Enter Your Destination",
    desc: "Tell us where you want to go. Search from popular destinations across India.",
  },
  {
    img: suitcaseImg,
    title: "Select Travelers & Budget",
    desc: "Choose how many people are traveling and set your budget range.",
  },
  {
    img: airplaneImg,
    title: "Get AI Travel Plan",
    desc: "Receive a complete AI-generated itinerary with food, stays, and transport.",
  },
];

const HowItWorks = () => (
  <section id="how-it-works" className="py-24 bg-muted/50">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          How <span className="text-gradient-primary">Tourfinco</span> Works
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Three simple steps to plan your perfect budget-friendly trip
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
        {steps.map((step, i) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className="relative bg-card rounded-2xl p-8 shadow-card hover:shadow-card-hover transition-shadow text-center group"
          >
            <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-gradient-hero text-primary-foreground flex items-center justify-center text-sm font-bold">
              {i + 1}
            </div>
            <motion.img
              src={step.img}
              alt={step.title}
              className="w-20 h-20 mx-auto mb-5 object-contain drop-shadow-md"
              whileHover={{ scale: 1.15, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
            <h3 className="text-lg font-bold text-foreground mb-2">{step.title}</h3>
            <p className="text-sm text-muted-foreground">{step.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorks;
