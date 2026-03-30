import { motion } from "framer-motion";
import suitcaseImg from "@/assets/3d-suitcase.png";
import airplaneImg from "@/assets/3d-airplane.png";
import compassImg from "@/assets/3d-compass.png";

const TravelScene = () => (
  <div className="relative w-full h-[400px] md:h-[500px] flex items-center justify-center">
    {/* Main suitcase */}
    <motion.img
      src={suitcaseImg}
      alt="3D Travel Suitcase"
      className="w-64 md:w-80 drop-shadow-2xl"
      animate={{ y: [0, -15, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    />
    {/* Floating airplane */}
    <motion.img
      src={airplaneImg}
      alt="3D Airplane"
      className="absolute top-4 right-4 md:top-8 md:right-8 w-28 md:w-36 drop-shadow-lg"
      animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
    />
    {/* Floating compass */}
    <motion.img
      src={compassImg}
      alt="3D Compass"
      className="absolute bottom-8 left-4 md:bottom-12 md:left-8 w-20 md:w-24 drop-shadow-lg"
      animate={{ y: [0, -8, 0], rotate: [0, -10, 0] }}
      transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
    />
    {/* Decorative orange circles */}
    <motion.div
      className="absolute top-16 left-16 w-6 h-6 rounded-full bg-primary/30"
      animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.6, 0.3] }}
      transition={{ duration: 3, repeat: Infinity }}
    />
    <motion.div
      className="absolute bottom-24 right-16 w-4 h-4 rounded-full bg-primary/20"
      animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.5, 0.2] }}
      transition={{ duration: 2.5, repeat: Infinity, delay: 0.8 }}
    />
  </div>
);

export default TravelScene;
