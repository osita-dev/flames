import { motion } from "framer-motion";
import { ArrowLeftRight } from "lucide-react";

interface WhatIfModeProps {
  name1: string;
  name2: string;
  onSwap: () => void;
  suggestions: { name: string; type: "male" | "female" }[];
  onSelectSuggestion: (name: string, type: "male" | "female") => void;
}

const QUICK_NAMES = {
  male: ["Alex", "James", "Chris", "Max", "Sam", "Jordan"],
  female: ["Emma", "Sophia", "Luna", "Aria", "Maya", "Zara"],
};

export const WhatIfMode = ({ name1, name2, onSwap, onSelectSuggestion }: WhatIfModeProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      className="space-y-3 pt-4 border-t border-border/50"
    >
      <div className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground uppercase tracking-wide">Quick "What-If" Mode</p>
        {name1 && name2 && (
          <motion.button
            onClick={onSwap}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-1 text-xs text-primary hover:text-primary/80 transition-colors"
          >
            <ArrowLeftRight className="w-3 h-3" />
            Swap Names
          </motion.button>
        )}
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground">Try as Him:</p>
          <div className="flex flex-wrap gap-1">
            {QUICK_NAMES.male.map((name) => (
              <motion.button
                key={name}
                onClick={() => onSelectSuggestion(name, "male")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-2 py-1 text-xs rounded-full bg-secondary/60 text-secondary-foreground hover:bg-primary/20 hover:text-primary transition-colors"
              >
                {name}
              </motion.button>
            ))}
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground">Try as Her:</p>
          <div className="flex flex-wrap gap-1">
            {QUICK_NAMES.female.map((name) => (
              <motion.button
                key={name}
                onClick={() => onSelectSuggestion(name, "female")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-2 py-1 text-xs rounded-full bg-secondary/60 text-secondary-foreground hover:bg-primary/20 hover:text-primary transition-colors"
              >
                {name}
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
