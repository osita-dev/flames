import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, User, UserRound, Sparkles, RotateCcw } from "lucide-react";
import { NameInput } from "./NameInput";
import { LetterDisplay } from "./LetterDisplay";
import { FlamesResult } from "./FlamesResult";
import { Confetti } from "./Confetti";
import { Fireworks } from "./Fireworks";
import { EmojiReactions } from "./EmojiReactions";
import { DynamicBackground, getThemeFromResult } from "./DynamicBackground";
import { FlamesCountdown } from "./FlamesCountdown";
import { WhatIfMode } from "./WhatIfMode";
import AdBanner from "./AdBanner";
import { useSoundEffects } from "@/hooks/useSoundEffects";
import { checkEasterEgg } from "@/data/flamesData";
import type {  EasterEgg } from "@/data/flamesData";
import { MONETAG_EMBED_CODE, AD_PLACEMENTS } from "@/config/monetag";

const FLAMES = ["F", "L", "A", "M", "E", "S"] as const;

const FLAMES_MEANINGS = {
  F: { label: "Friends", emoji: "🤝", color: "from-mint to-emerald-400" },
  L: { label: "Lovers", emoji: "💕", color: "from-rose to-pink-400" },
  A: { label: "Admire", emoji: "✨", color: "from-lavender to-purple-400" },
  M: { label: "Marriage", emoji: "💍", color: "from-coral to-orange-400" },
  E: { label: "Enemy", emoji: "⚔️", color: "from-red-400 to-red-600" },
  S: { label: "Soulmates", emoji: "💝", color: "from-primary to-rose" },
} as const;

type FlamesLetter = keyof typeof FLAMES_MEANINGS;

export const FlamesGame = () => {
  const [name1, setName1] = useState("");
  const [name2, setName2] = useState("");
  const [gameState, setGameState] = useState<"input" | "slashing" | "counting" | "result">("input");
  const [slashedLetters1, setSlashedLetters1] = useState<number[]>([]);
  const [slashedLetters2, setSlashedLetters2] = useState<number[]>([]);
  const [remainingCount, setRemainingCount] = useState(0);
  const [result, setResult] = useState<FlamesLetter | null>(null);
  const [flamesState, setFlamesState] = useState<("active" | "eliminated" | "winner")[]>(
    FLAMES.map(() => "active")
  );
  const [currentFlameIndex, setCurrentFlameIndex] = useState(-1);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showFireworks, setShowFireworks] = useState(false);
  const [emojiTrigger, setEmojiTrigger] = useState(0);
  const [easterEgg, setEasterEgg] = useState<EasterEgg | null>(null);
  const [showWhatIf, setShowWhatIf] = useState(false);

  const { playPop, playSwoosh, playHeartTap, playEliminate, playWinner, playSparkle } = useSoundEffects();

  const calculateFlames = useCallback(() => {
    if (!name1.trim() || !name2.trim()) return;

    playHeartTap();
    
    // Check for easter eggs
    const egg = checkEasterEgg(name1, name2);
    setEasterEgg(egg);

    const letters1 = name1.toLowerCase().replace(/[^a-z]/g, "").split("");
    const letters2 = name2.toLowerCase().replace(/[^a-z]/g, "").split("");

    const slashed1: number[] = [];
    const slashed2: number[] = [];
    const used2: boolean[] = new Array(letters2.length).fill(false);

    letters1.forEach((char, i) => {
      const matchIndex = letters2.findIndex((c, j) => c === char && !used2[j]);
      if (matchIndex !== -1) {
        slashed1.push(i);
        slashed2.push(matchIndex);
        used2[matchIndex] = true;
      }
    });

    const remaining = letters1.length + letters2.length - slashed1.length - slashed2.length;

    setSlashedLetters1(slashed1);
    setSlashedLetters2(slashed2);
    setRemainingCount(remaining);
    setGameState("slashing");

    // Play swoosh for slashing
    setTimeout(() => playSwoosh(), 300);

    setTimeout(() => {
      setGameState("counting");
      animateFlames(remaining);
    }, 1500);
  }, [name1, name2, playHeartTap, playSwoosh]);

  const animateFlames = (count: number) => {
    let flames = [...FLAMES];
    let currentStates: ("active" | "eliminated" | "winner")[] = FLAMES.map(() => "active");
    let position = 0;

    const eliminateNext = () => {
      if (flames.length === 1) {
        const winnerIndex = FLAMES.indexOf(flames[0] as typeof FLAMES[number]);
        currentStates[winnerIndex] = "winner";
        setFlamesState([...currentStates]);
        setCurrentFlameIndex(winnerIndex);
        setResult(flames[0] as FlamesLetter);
        
        playWinner();
        playSparkle();
        setShowConfetti(true);
        setShowFireworks(true);
        setEmojiTrigger(prev => prev + 1);
        
        setTimeout(() => {
          setShowConfetti(false);
          setShowFireworks(false);
        }, 3000);
        
        setTimeout(() => setGameState("result"), 800);
        return;
      }

      position = (position + count - 1) % flames.length;
      const eliminated = flames[position];
      const eliminatedIndex = FLAMES.indexOf(eliminated as typeof FLAMES[number]);
      
      setCurrentFlameIndex(eliminatedIndex);
      playEliminate();
      
      setTimeout(() => {
        currentStates[eliminatedIndex] = "eliminated";
        setFlamesState([...currentStates]);
        playPop();
      }, 200);

      flames.splice(position, 1);
      if (position >= flames.length) position = 0;

      setTimeout(eliminateNext, 500);
    };

    setTimeout(eliminateNext, 600);
  };

  const resetGame = useCallback(() => {
    playPop();
    setName1("");
    setName2("");
    setGameState("input");
    setSlashedLetters1([]);
    setSlashedLetters2([]);
    setRemainingCount(0);
    setResult(null);
    setFlamesState(FLAMES.map(() => "active"));
    setCurrentFlameIndex(-1);
    setEasterEgg(null);
    setShowWhatIf(false);
  }, [playPop]);

  const handleSwapNames = useCallback(() => {
    playPop();
    setName1(name2);
    setName2(name1);
  }, [name1, name2, playPop]);

  const handleQuickName = useCallback((name: string, type: "male" | "female") => {
    playPop();
    if (type === "male") setName1(name);
    else setName2(name);
  }, [playPop]);

  const backgroundTheme = getThemeFromResult(result);

  return (
    <>
      <DynamicBackground theme={backgroundTheme} />
      <Confetti isActive={showConfetti} />
      <Fireworks isActive={showFireworks} />
      <EmojiReactions trigger={emojiTrigger} resultEmoji={result ? FLAMES_MEANINGS[result].emoji : undefined} />

      <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
        {/* Floating hearts background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-primary/10"
              initial={{ y: "100vh", x: `${15 + i * 15}vw` }}
              animate={{ y: "-10vh" }}
              transition={{
                duration: 15 + i * 2,
                repeat: Infinity,
                ease: "linear",
                delay: i * 2,
              }}
            >
              <Heart className="w-8 h-8 md:w-12 md:h-12" fill="currentColor" />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md relative z-10"
        >
          {/* Title */}
          <motion.div
            className="text-center mb-8"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <motion.h1 
              className="font-display text-5xl md:text-6xl text-gradient mb-2"
              whileHover={{ scale: 1.05 }}
            >
              FLAMES
            </motion.h1>
            <p className="text-muted-foreground text-sm">Discover your relationship destiny ✨</p>
          </motion.div>

          {/* Main Card */}
          <motion.div
            className="bg-card/90 backdrop-blur-sm rounded-2xl shadow-card p-6 md:p-8 border border-border/50"
            layout
          >
            <AnimatePresence mode="wait">
              {gameState === "input" && (
                <motion.div
                  key="input"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  <NameInput
                    label="His Name"
                    value={name1}
                    onChange={setName1}
                    icon={<User className="w-5 h-5" />}
                    placeholder="Enter his name..."
                  />
                  <motion.div 
                    className="flex items-center justify-center"
                    whileHover={{ scale: 1.2 }}
                    onClick={() => playHeartTap()}
                  >
                    <Heart className="w-6 h-6 text-primary animate-heartbeat cursor-pointer" fill="currentColor" />
                  </motion.div>
                  <NameInput
                    label="Her Name"
                    value={name2}
                    onChange={setName2}
                    icon={<UserRound className="w-5 h-5" />}
                    placeholder="Enter her name..."
                  />

                  <motion.button
                    onClick={calculateFlames}
                    disabled={!name1.trim() || !name2.trim()}
                    className="w-full py-4 rounded-xl gradient-romantic text-primary-foreground font-semibold text-lg shadow-soft disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.02, boxShadow: "0 0 30px hsl(350, 80%, 60%, 0.4)" }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Sparkles className="w-5 h-5" />
                    Find Your Destiny
                  </motion.button>

                  {/* What-If Mode Toggle */}
                  <motion.button
                    onClick={() => setShowWhatIf(!showWhatIf)}
                    className="w-full text-center text-xs text-muted-foreground hover:text-primary transition-colors"
                  >
                    {showWhatIf ? "Hide quick options ▲" : "Show quick options ▼"}
                  </motion.button>

                  <AnimatePresence>
                    {showWhatIf && (
                      <WhatIfMode
                        name1={name1}
                        name2={name2}
                        onSwap={handleSwapNames}
                        suggestions={[]}
                        onSelectSuggestion={handleQuickName}
                      />
                    )}
                  </AnimatePresence>

                  {/* Inline Ad - Input Phase */}
                  {AD_PLACEMENTS.inputPhase && <AdBanner monetagCode={MONETAG_EMBED_CODE} variant="compact" />}
                </motion.div>
              )}

              {(gameState === "slashing" || gameState === "counting") && (
                <motion.div
                  key="processing"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  <LetterDisplay
                    name={name1}
                    slashedIndices={slashedLetters1}
                    label="His Name"
                    isAnimating={gameState === "counting"}
                  />
                  <LetterDisplay
                    name={name2}
                    slashedIndices={slashedLetters2}
                    label="Her Name"
                    isAnimating={gameState === "counting"}
                  />

                  {gameState === "counting" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-center"
                    >
                      <p className="text-sm text-muted-foreground mb-2">Remaining letters</p>
                      <motion.span 
                        className="text-4xl font-bold text-gradient"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 0.5, repeat: Infinity }}
                      >
                        {remainingCount}
                      </motion.span>
                    </motion.div>
                  )}

                  <FlamesCountdown 
                    flamesState={flamesState} 
                    currentIndex={currentFlameIndex}
                  />

                  {/* Inline Ad - Processing Phase */}
                  {AD_PLACEMENTS.processingPhase && <AdBanner monetagCode={MONETAG_EMBED_CODE} variant="compact" className="mt-4" />}
                </motion.div>
              )}

              {gameState === "result" && result && (
                <FlamesResult
                  result={result}
                  meaning={FLAMES_MEANINGS[result]}
                  name1={name1}
                  name2={name2}
                  onReset={resetGame}
                  easterEgg={easterEgg}
                />
              )}
            </AnimatePresence>
          </motion.div>

          {gameState !== "input" && gameState !== "result" && (
            <motion.button
              onClick={resetGame}
              className="mt-4 mx-auto flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              whileHover={{ scale: 1.05 }}
            >
              <RotateCcw className="w-4 h-4" />
              Start Over
            </motion.button>
          )}

          {/* Footer Ad - Always visible */}
          {AD_PLACEMENTS.footer && (
            <div className="mt-6 w-full">
              <AdBanner monetagCode={MONETAG_EMBED_CODE} variant="footer" />
            </div>
          )}
        </motion.div>
      </div>
    </>
  );
};
