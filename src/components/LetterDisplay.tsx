import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface LetterDisplayProps {
  name: string;
  slashedIndices: number[];
  label: string;
  isAnimating?: boolean;
}

type DanceEffect = "wiggle" | "bounce" | "glow" | "pulse" | "none";

export const LetterDisplay = ({ name, slashedIndices, label, isAnimating = false }: LetterDisplayProps) => {
  const letters = name.toLowerCase().replace(/[^a-z]/g, "").split("");
  const [danceEffects, setDanceEffects] = useState<DanceEffect[]>([]);

  useEffect(() => {
    if (isAnimating) {
      // Randomly assign dance effects to non-slashed letters
      const effects: DanceEffect[] = letters.map((_, i) => {
        if (slashedIndices.includes(i)) return "none";
        const random = Math.random();
        if (random < 0.33) return "wiggle";
        if (random < 0.66) return "bounce";
        return "glow";
      });
      setDanceEffects(effects);
    } else {
      setDanceEffects([]);
    }
  }, [isAnimating, letters.length, slashedIndices]);

  const getAnimationVariants = (effect: DanceEffect, index: number) => {
    switch (effect) {
      case "wiggle":
        return {
          animate: {
            rotate: [0, -5, 5, -5, 5, 0],
            transition: {
              duration: 0.5,
              delay: index * 0.05,
              repeat: Infinity,
              repeatDelay: 1,
            },
          },
        };
      case "bounce":
        return {
          animate: {
            y: [0, -8, 0],
            transition: {
              duration: 0.4,
              delay: index * 0.08,
              repeat: Infinity,
              repeatDelay: 0.8,
            },
          },
        };
      case "glow":
        return {
          animate: {
            boxShadow: [
              "0 0 0 0 hsl(350, 80%, 60%)",
              "0 0 20px 5px hsl(350, 80%, 60%)",
              "0 0 0 0 hsl(350, 80%, 60%)",
            ],
            transition: {
              duration: 1.2,
              delay: index * 0.1,
              repeat: Infinity,
            },
          },
        };
      case "pulse":
        return {
          animate: {
            scale: [1, 1.1, 1],
            transition: {
              duration: 0.6,
              delay: index * 0.05,
              repeat: Infinity,
            },
          },
        };
      default:
        return {};
    }
  };

  return (
    <div className="space-y-2">
      <p className="text-xs text-muted-foreground uppercase tracking-wide">{label}</p>
      <div className="flex flex-wrap gap-1.5 justify-center">
        {letters.map((letter, index) => {
          const isSlashed = slashedIndices.includes(index);
          const effect = danceEffects[index] || "none";
          const variants = getAnimationVariants(effect, index);

          return (
            <motion.div
              key={`${letter}-${index}`}
              initial={{ scale: 1, opacity: 1, rotate: 0 }}
              animate={
                isSlashed
                  ? {
                      scale: 0.85,
                      opacity: 0.4,
                    }
                  : variants.animate || { scale: 1, opacity: 1 }
              }
              transition={
                isSlashed
                  ? { delay: 0.3 + index * 0.05 }
                  : undefined
              }
              whileHover={
                !isSlashed
                  ? {
                      scale: 1.2,
                      rotate: [0, -10, 10, 0],
                      transition: { duration: 0.3 },
                    }
                  : undefined
              }
              className={`w-9 h-9 rounded-lg flex items-center justify-center font-bold text-base uppercase relative cursor-default select-none ${
                isSlashed
                  ? "bg-muted text-muted-foreground"
                  : effect === "glow"
                  ? "bg-primary/20 text-primary border-2 border-primary/50"
                  : "bg-secondary text-secondary-foreground hover:bg-primary/10"
              }`}
            >
              {letter}
              {isSlashed && (
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.5 + index * 0.05 }}
                  className="absolute inset-x-1 top-1/2 h-0.5 bg-primary/60 -translate-y-1/2"
                />
              )}
              {!isSlashed && effect !== "none" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: index * 0.1 }}
                  className="absolute -top-1 -right-1 text-xs"
                >
                  ✨
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
