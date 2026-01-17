import { motion } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";

interface AdBannerProps {
  /** 
   * Monetag embed code or script URL
   * Paste your Monetag script/iframe here
   */
  monetagCode?: string;
  /** 
   * Position variant for different placements 
   */
  variant?: "footer" | "inline" | "compact";
  /** 
   * Optional className for additional styling 
   */
  className?: string;
}

/**
 * Reusable CPM Ad Banner Component
 * 
 * Usage:
 * 1. Get your Monetag embed code from your dashboard
 * 2. Pass it via the `monetagCode` prop
 * 3. Place <AdBanner /> wherever you want ads to appear
 * 
 * The component is styled to blend with the FLAMES UI theme.
 * It's purely impression-based - no popups or redirects.
 */
const AdBanner = ({ monetagCode, variant = "footer", className = "" }: AdBannerProps) => {
  const variantStyles = {
    footer: "h-16 md:h-20",
    inline: "h-24 md:h-28 my-4",
    compact: "h-12 md:h-14",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className={`
        relative overflow-hidden rounded-xl
        bg-gradient-to-r from-secondary/80 via-card/60 to-secondary/80
        backdrop-blur-sm border border-border/30
        ${variantStyles[variant]}
        ${className}
      `}
    >
      {/* Decorative elements to blend with FLAMES theme */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute -left-2 top-1/2 -translate-y-1/2 text-primary/10"
          animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <Heart className="w-8 h-8" fill="currentColor" />
        </motion.div>
        <motion.div
          className="absolute -right-2 top-1/2 -translate-y-1/2 text-accent/10"
          animate={{ scale: [1, 1.1, 1], rotate: [0, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        >
          <Sparkles className="w-6 h-6" />
        </motion.div>
      </div>

      {/* Ad container */}
      <div className="relative z-10 w-full h-full flex items-center justify-center px-4">
        {monetagCode ? (
          // When Monetag code is provided, render it
          <div 
            className="w-full h-full flex items-center justify-center"
            dangerouslySetInnerHTML={{ __html: monetagCode }}
          />
        ) : (
          // Placeholder when no ad code is set
          <div className="flex items-center gap-2 text-muted-foreground/60 text-xs md:text-sm">
            <Sparkles className="w-3 h-3 md:w-4 md:h-4" />
            <span className="font-medium tracking-wide">Sponsored</span>
            <Heart className="w-3 h-3 md:w-4 md:h-4" fill="currentColor" />
          </div>
        )}
      </div>

      {/* Subtle gradient overlay for blending */}
      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-card/20 pointer-events-none" />
    </motion.div>
  );
};

export default AdBanner;
