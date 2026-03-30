import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Globe, TreePalm } from "lucide-react";

const FooterLogo = () => (
  <div className="relative w-10 h-10">
    <motion.div
      className="absolute inset-0 flex items-center justify-center"
      animate={{ rotate: [0, 360] }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
    >
      <Globe className="w-8 h-8 text-primary" strokeWidth={1.5} />
    </motion.div>
    <motion.div
      className="absolute -top-1 -right-1"
      animate={{ y: [0, -3, 0], rotate: [0, 8, 0] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
    >
      <TreePalm className="w-4 h-4 text-primary" strokeWidth={2} />
    </motion.div>
  </div>
);

const Footer = () => (
  <footer className="bg-foreground text-background py-16">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <FooterLogo />
            <span className="text-xl font-bold text-gradient-primary">Tourfinco</span>
          </div>
          <p className="text-sm opacity-60">AI-powered trip planning for budget travelers. Travel smart, travel happy.</p>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Quick Links</h4>
          <div className="flex flex-col gap-2 text-sm opacity-60">
            <Link to="/" className="hover:opacity-100 transition-opacity">Home</Link>
            <Link to="/plan" className="hover:opacity-100 transition-opacity">Plan Trip</Link>
            <a href="#how-it-works" className="hover:opacity-100 transition-opacity">How it Works</a>
          </div>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Company</h4>
          <div className="flex flex-col gap-2 text-sm opacity-60">
            <a href="#" className="hover:opacity-100 transition-opacity">About Us</a>
            <a href="#" className="hover:opacity-100 transition-opacity">Contact</a>
            <a href="#" className="hover:opacity-100 transition-opacity">Privacy Policy</a>
          </div>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Follow Us</h4>
          <div className="flex gap-3">
            {["Twitter", "Instagram", "Facebook"].map((s) => (
              <a key={s} href="#" className="w-10 h-10 rounded-xl bg-background/10 flex items-center justify-center text-xs font-medium hover:bg-background/20 transition-colors">
                {s[0]}
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-background/10 mt-12 pt-8 text-center text-sm opacity-40">
        © 2026 Tourfinco. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
