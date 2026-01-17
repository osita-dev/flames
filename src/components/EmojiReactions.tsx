import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface Emoji {
  id: number;
  emoji: string;
  x: number;
  y: number;
}

interface EmojiReactionsProps {
  trigger: number; // Increment to trigger new emojis
  resultEmoji?: string;
}

const LOVE_EMOJIS = ["💕", "💖", "💗", "💓", "💝", "✨", "🌟", "💫"];

export const EmojiReactions = ({ trigger, resultEmoji }: EmojiReactionsProps) => {
  const [emojis, setEmojis] = useState<Emoji[]>([]);

  useEffect(() => {
    if (trigger > 0) {
      const newEmojis: Emoji[] = [];
      const emojiPool = resultEmoji ? [resultEmoji, ...LOVE_EMOJIS] : LOVE_EMOJIS;
      
      for (let i = 0; i < 8; i++) {
        newEmojis.push({
          id: Date.now() + i,
          emoji: emojiPool[Math.floor(Math.random() * emojiPool.length)],
          x: 20 + Math.random() * 60,
          y: 30 + Math.random() * 40,
        });
      }
      
      setEmojis(prev => [...prev, ...newEmojis]);
      
      const timer = setTimeout(() => {
        setEmojis(prev => prev.filter(e => !newEmojis.find(ne => ne.id === e.id)));
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [trigger, resultEmoji]);

  return (
    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
      <AnimatePresence>
        {emojis.map((emoji) => (
          <motion.div
            key={emoji.id}
            initial={{ 
              scale: 0, 
              opacity: 0, 
              x: `${emoji.x}vw`, 
              y: `${emoji.y}vh`,
            }}
            animate={{ 
              scale: [0, 1.5, 1], 
              opacity: [0, 1, 0],
              y: `${emoji.y - 20}vh`,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute text-3xl"
            style={{ left: 0 }}
          >
            {emoji.emoji}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
