import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, LogOut, Globe, TreePalm } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Plan Trip", path: "/plan" },
  { label: "How it Works", path: "/#how-it-works" },
  { label: "Destinations", path: "/#destinations" },
];

const LogoIcon = () => (
  <div className="relative w-10 h-10">
    {/* Globe */}
    <motion.div
      className="absolute inset-0 flex items-center justify-center"
      animate={{ rotate: [0, 360] }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
    >
      <Globe className="w-8 h-8 text-primary" strokeWidth={1.5} />
    </motion.div>
    {/* Tiny palm tree hovering */}
    <motion.div
      className="absolute -top-1 -right-1"
      animate={{ y: [0, -3, 0], rotate: [0, 8, 0] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
    >
      <TreePalm className="w-4 h-4 text-primary" strokeWidth={2} />
    </motion.div>
  </div>
);

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { user, signOut } = useAuth();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="flex items-center gap-2 group">
          <motion.div
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400, damping: 12 }}
          >
            <LogoIcon />
          </motion.div>
          <motion.span
            className="text-xl font-bold text-gradient-primary"
            whileHover={{ letterSpacing: "0.05em" }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Tourfinco
          </motion.span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location.pathname === link.path ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <>
              <span className="text-sm text-muted-foreground truncate max-w-[150px]">{user.email}</span>
              <button
                onClick={signOut}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-3 py-2 flex items-center gap-1.5"
              >
                <LogOut className="w-4 h-4" /> Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/auth" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-4 py-2">
                Login
              </Link>
              <Link
                to="/auth"
                className="text-sm font-semibold bg-gradient-hero text-primary-foreground px-5 py-2.5 rounded-xl hover:opacity-90 transition-opacity"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        <button
          className="md:hidden text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-b border-border overflow-hidden"
          >
            <div className="px-4 py-4 flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileOpen(false)}
                  className="text-sm font-medium text-muted-foreground hover:text-primary py-2"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/plan"
                onClick={() => setMobileOpen(false)}
                className="text-sm font-semibold bg-gradient-hero text-primary-foreground px-5 py-2.5 rounded-xl text-center mt-2"
              >
                Plan My Trip
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
