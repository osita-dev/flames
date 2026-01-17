import { motion, AnimatePresence } from "framer-motion";
import { Heart, RotateCcw, Share2, Gift, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import { getRandomStory } from "@/data/flamesData";
import { SparkleEffect } from "./SparkleEffect";
import type { EasterEgg } from "@/data/flamesData";
import AdBanner from "./AdBanner";
import { MONETAG_EMBED_CODE, AD_PLACEMENTS } from "@/config/monetag";

interface FlamesResultProps {
  result: string;
  meaning: {
    label: string;
    emoji: string;
    color: string;
  };
  name1: string;
  name2: string;
  onReset: () => void;
  easterEgg?: EasterEgg | null;
}

export const FlamesResult = ({ result, meaning, name1, name2, onReset, easterEgg }: FlamesResultProps) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [showSparkles, setShowSparkles] = useState(false);
  const [story] = useState(() => getRandomStory(result as keyof typeof import("@/data/flamesData").RESULT_STORIES));

  const handleShare = async () => {
    const gameUrl = "https://flamesgaming.lovable.app";
    const textForClipboard = `${name1} & ${name2} are ${meaning.label}! ${meaning.emoji}\n\n"${story.slice(0, 100)}..."\n\n🔥 Try FLAMES yourself: ${gameUrl}`;
    const textForShare = `${name1} & ${name2} are ${meaning.label}! ${meaning.emoji}\n\n"${story.slice(0, 100)}..."\n\n🔥 Try FLAMES yourself:`;
    
    // Try native share on mobile
    if (navigator.share && /mobile|android|iphone/i.test(navigator.userAgent)) {
      try {
        await navigator.share({ 
          text: textForShare, 
          title: "FLAMES Result 💕",
          url: gameUrl 
        });
        return;
      } catch {
        // User cancelled - fall through to clipboard
      }
    }
    
    // Copy to clipboard
    try {
      await navigator.clipboard.writeText(textForClipboard);
      toast.success(
        <div className="space-y-1">
          <p className="font-medium">Copied to clipboard! 📋</p>
          <a 
            href={gameUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-xs text-primary underline"
          >
            {gameUrl}
          </a>
        </div>,
        { duration: 4000 }
      );
    } catch {
      toast.error("Couldn't copy to clipboard");
    }
  };

  const handleReveal = () => {
    setIsRevealed(true);
    setShowSparkles(true);
    setTimeout(() => setShowSparkles(false), 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 200 }}
      className="text-center space-y-6 relative"
    >
      <SparkleEffect isActive={showSparkles} />

      {/* Floating hearts animation */}
      <div className="relative h-16 overflow-hidden">
        {[...Array(7)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: 60, x: 20 + i * 35, opacity: 0 }}
            animate={{ y: -20, opacity: [0, 1, 0] }}
            transition={{
              duration: 1.5,
              delay: i * 0.15,
              repeat: Infinity,
              repeatDelay: 0.8,
            }}
            className="absolute"
          >
            <Heart className="w-4 h-4 text-primary" fill="currentColor" />
          </motion.div>
        ))}
      </div>

      {/* Easter egg badge */}
      <AnimatePresence>
        {easterEgg && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-2 text-xs font-medium text-primary bg-primary/10 rounded-full py-1 px-3 mx-auto w-fit"
          >
            <Sparkles className="w-3 h-3" />
            Easter Egg Found!
            <Sparkles className="w-3 h-3" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Flip Card / Surprise Box */}
      <AnimatePresence mode="wait">
        {!isRevealed ? (
          <motion.div
            key="surprise-box"
            onClick={handleReveal}
            className="cursor-pointer mx-auto"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              animate={{
                rotateY: [0, 10, -10, 0],
                scale: [1, 1.02, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-32 h-32 mx-auto gradient-romantic rounded-2xl flex items-center justify-center shadow-glow"
            >
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <Gift className="w-12 h-12 text-primary-foreground" />
              </motion.div>
            </motion.div>
            <p className="text-sm text-muted-foreground mt-3 animate-pulse">
              Tap to reveal your destiny! ✨
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="revealed"
            initial={{ rotateY: 90, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            {/* Result emoji */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.1 }}
              className="text-7xl mb-4"
            >
              {easterEgg ? easterEgg.emoji : meaning.emoji}
            </motion.div>

            {/* Names */}
            <div className="space-y-1">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-lg font-semibold text-foreground"
              >
                {name1} & {name2}
              </motion.p>
              <p className="text-sm text-muted-foreground">are destined to be</p>
            </div>

            {/* Result label */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-4"
            >
              <span className={`inline-block px-6 py-3 rounded-2xl bg-gradient-to-r ${meaning.color} text-white font-bold text-2xl shadow-lg`}>
                {meaning.label}
              </span>
            </motion.div>

            {/* Mini Story */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-6 px-4"
            >
              <div className="bg-secondary/50 rounded-xl p-4 text-sm text-foreground/80 leading-relaxed">
                {easterEgg ? (
                  <div className="space-y-2">
                    <p className="font-semibold text-primary">{easterEgg.message}</p>
                  </div>
                ) : (
                  <p>{story}</p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Inline Ad - Result Phase */}
      {isRevealed && AD_PLACEMENTS.resultPhase && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="pt-2"
        >
          <AdBanner monetagCode={MONETAG_EMBED_CODE} variant="inline" />
        </motion.div>
      )}

      {/* Action buttons */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: isRevealed ? 0.7 : 0.5 }}
        className="flex gap-3 justify-center pt-4"
      >
        <motion.button
          onClick={handleShare}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-secondary text-secondary-foreground font-medium hover:bg-secondary/80 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Share2 className="w-4 h-4" />
          Share
        </motion.button>
        <motion.button
          onClick={onReset}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl gradient-romantic text-primary-foreground font-medium shadow-soft"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <RotateCcw className="w-4 h-4" />
          Try Again
        </motion.button>
      </motion.div>
    </motion.div>
  );
};
