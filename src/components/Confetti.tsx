import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface ConfettiPiece {
  id: number;
  x: number;
  color: string;
  rotation: number;
  scale: number;
  type: "circle" | "square" | "heart";
}

interface ConfettiProps {
  isActive: boolean;
  resultColor?: string;
}

const COLORS = [
  "hsl(350, 80%, 60%)", // primary
  "hsl(15, 85%, 65%)", // coral
  "hsl(340, 75%, 70%)", // rose
  "hsl(280, 60%, 80%)", // lavender
  "hsl(40, 90%, 65%)", // gold
  "hsl(160, 50%, 75%)", // mint
];

export const Confetti = ({ isActive, resultColor }: ConfettiProps) => {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);

  useEffect(() => {
    if (isActive) {
      const newPieces: ConfettiPiece[] = [];
      for (let i = 0; i < 50; i++) {
        newPieces.push({
          id: i,
          x: Math.random() * 100,
          color: resultColor || COLORS[Math.floor(Math.random() * COLORS.length)],
          rotation: Math.random() * 360,
          scale: 0.5 + Math.random() * 0.5,
          type: ["circle", "square", "heart"][Math.floor(Math.random() * 3)] as "circle" | "square" | "heart",
        });
      }
      setPieces(newPieces);

      const timer = setTimeout(() => setPieces([]), 3000);
      return () => clearTimeout(timer);
    }
  }, [isActive, resultColor]);

  if (!isActive && pieces.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {pieces.map((piece) => (
        <motion.div
          key={piece.id}
          initial={{ 
            y: -20, 
            x: `${piece.x}vw`, 
            rotate: 0,
            opacity: 1,
          }}
          animate={{ 
            y: "110vh", 
            rotate: piece.rotation + 720,
            opacity: [1, 1, 0],
          }}
          transition={{ 
            duration: 2.5 + Math.random() * 1.5,
            ease: "easeIn",
          }}
          className="absolute"
          style={{ left: 0 }}
        >
          {piece.type === "heart" ? (
            <svg 
              width={12 * piece.scale} 
              height={12 * piece.scale} 
              viewBox="0 0 24 24" 
              fill={piece.color}
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          ) : piece.type === "circle" ? (
            <div 
              className="rounded-full" 
              style={{ 
                width: 8 * piece.scale, 
                height: 8 * piece.scale, 
                background: piece.color 
              }} 
            />
          ) : (
            <div 
              style={{ 
                width: 8 * piece.scale, 
                height: 8 * piece.scale, 
                background: piece.color,
                transform: `rotate(${piece.rotation}deg)`,
              }} 
            />
          )}
        </motion.div>
      ))}
    </div>
  );
};
