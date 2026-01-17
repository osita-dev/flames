import { motion } from "framer-motion";
import { useEffect, useState } from "react";

type BackgroundTheme = "default" | "lovers" | "friends" | "marriage" | "enemies" | "soulmates" | "admire";

interface DynamicBackgroundProps {
  theme: BackgroundTheme;
}

const THEME_CONFIGS: Record<BackgroundTheme, {
  gradient: string;
  particles: string[];
  particleColors: string[];
}> = {
  default: {
    gradient: "from-background via-blush/30 to-background",
    particles: ["💕"],
    particleColors: ["hsl(350, 80%, 60%)"],
  },
  lovers: {
    gradient: "from-rose/20 via-pink-200/30 to-rose/10",
    particles: ["💕", "💖", "💗", "💓"],
    particleColors: ["hsl(340, 75%, 70%)", "hsl(350, 80%, 60%)"],
  },
  friends: {
    gradient: "from-mint/20 via-emerald-100/30 to-mint/10",
    particles: ["🌟", "✨", "🎉"],
    particleColors: ["hsl(160, 50%, 75%)", "hsl(40, 90%, 65%)"],
  },
  marriage: {
    gradient: "from-amber-100/30 via-orange-100/20 to-coral/20",
    particles: ["💍", "👰", "💒", "🎊"],
    particleColors: ["hsl(40, 90%, 65%)", "hsl(15, 85%, 65%)"],
  },
  enemies: {
    gradient: "from-red-100/20 via-red-50/10 to-background",
    particles: ["⚔️", "🔥", "💥"],
    particleColors: ["hsl(0, 70%, 60%)", "hsl(25, 90%, 55%)"],
  },
  soulmates: {
    gradient: "from-lavender/30 via-purple-100/20 to-pink-100/20",
    particles: ["💝", "🌌", "✨", "💫", "⭐"],
    particleColors: ["hsl(280, 60%, 80%)", "hsl(350, 80%, 60%)", "hsl(40, 90%, 65%)"],
  },
  admire: {
    gradient: "from-lavender/20 via-purple-50/20 to-background",
    particles: ["✨", "💖", "😍"],
    particleColors: ["hsl(280, 60%, 80%)", "hsl(340, 75%, 70%)"],
  },
};

interface FloatingParticle {
  id: number;
  emoji: string;
  x: number;
  duration: number;
  delay: number;
  size: number;
}

export const DynamicBackground = ({ theme }: DynamicBackgroundProps) => {
  const [particles, setParticles] = useState<FloatingParticle[]>([]);
  const config = THEME_CONFIGS[theme];

  useEffect(() => {
    const newParticles: FloatingParticle[] = [];
    for (let i = 0; i < 12; i++) {
      newParticles.push({
        id: i,
        emoji: config.particles[Math.floor(Math.random() * config.particles.length)],
        x: Math.random() * 100,
        duration: 12 + Math.random() * 8,
        delay: Math.random() * 10,
        size: 16 + Math.random() * 16,
      });
    }
    setParticles(newParticles);
  }, [theme, config.particles]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
      {/* Gradient overlay */}
      <motion.div
        key={theme}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className={`absolute inset-0 bg-gradient-to-b ${config.gradient}`}
      />

      {/* Floating particles */}
      {particles.map((particle) => (
        <motion.div
          key={`${theme}-${particle.id}`}
          initial={{ y: "110vh", x: `${particle.x}vw`, opacity: 0 }}
          animate={{ y: "-10vh", opacity: [0, 0.6, 0.6, 0] }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute"
          style={{ fontSize: particle.size }}
        >
          {particle.emoji}
        </motion.div>
      ))}

      {/* Ambient glow effect for special themes */}
      {(theme === "soulmates" || theme === "marriage") && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-primary/10 blur-3xl"
        />
      )}
    </div>
  );
};

export const getThemeFromResult = (result: string | null): BackgroundTheme => {
  switch (result) {
    case "F": return "friends";
    case "L": return "lovers";
    case "A": return "admire";
    case "M": return "marriage";
    case "E": return "enemies";
    case "S": return "soulmates";
    default: return "default";
  }
};
