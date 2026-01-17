import { motion } from "framer-motion";

interface FlamesCountdownProps {
  flamesState: ("active" | "eliminated" | "winner")[];
  currentIndex: number;
}

const FLAMES = ["F", "L", "A", "M", "E", "S"] as const;

const LETTER_MEANINGS = {
  F: "Friends",
  L: "Lovers",
  A: "Admire",
  M: "Marriage",
  E: "Enemy",
  S: "Soulmates",
};

export const FlamesCountdown = ({ flamesState, currentIndex }: FlamesCountdownProps) => {
  return (
    <div className="space-y-3">
      <p className="text-xs text-muted-foreground uppercase tracking-wide text-center">
        Counting through FLAMES...
      </p>
      <div className="flex justify-center gap-2">
        {FLAMES.map((letter, index) => {
          const state = flamesState[index];
          const isCurrentTarget = currentIndex === index && state === "active";
          
          return (
            <motion.div
              key={letter}
              layout
              initial={{ scale: 1 }}
              animate={{
                scale: state === "eliminated" ? 0.75 : 
                       state === "winner" ? 1.3 : 
                       isCurrentTarget ? 1.1 : 1,
                opacity: state === "eliminated" ? 0.25 : 1,
                y: isCurrentTarget ? -5 : 0,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
              }}
              className="relative"
            >
              <motion.div
                className={`w-11 h-11 rounded-xl flex flex-col items-center justify-center font-bold text-lg transition-all ${
                  state === "winner"
                    ? "gradient-romantic text-primary-foreground shadow-glow"
                    : state === "eliminated"
                    ? "bg-muted text-muted-foreground line-through"
                    : isCurrentTarget
                    ? "bg-primary/20 text-primary border-2 border-primary ring-2 ring-primary/30"
                    : "bg-secondary text-secondary-foreground"
                }`}
              >
                {letter}
              </motion.div>
              
              {/* Label on hover or winner */}
              {state === "winner" && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[10px] font-medium text-primary whitespace-nowrap"
                >
                  {LETTER_MEANINGS[letter]}
                </motion.div>
              )}
              
              {/* Elimination effect */}
              {state === "eliminated" && (
                <motion.div
                  initial={{ scale: 0, opacity: 1 }}
                  animate={{ scale: 2, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 rounded-xl bg-primary/20"
                />
              )}
              
              {/* Current target pulse */}
              {isCurrentTarget && (
                <motion.div
                  animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  className="absolute inset-0 rounded-xl border-2 border-primary"
                />
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
