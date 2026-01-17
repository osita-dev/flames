import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface NameInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  icon: ReactNode;
  placeholder: string;
}

export const NameInput = ({ label, value, onChange, icon, placeholder }: NameInputProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-2"
    >
      <label className="flex items-center gap-2 text-sm font-medium text-foreground">
        <span className="text-primary">{icon}</span>
        {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-xl bg-secondary border-2 border-transparent focus:border-primary/30 focus:bg-card outline-none transition-all text-foreground placeholder:text-muted-foreground font-medium"
      />
    </motion.div>
  );
};
