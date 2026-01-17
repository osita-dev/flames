// Mini stories and fun messages for each FLAMES result
export const RESULT_STORIES = {
  F: [
    "Your bond runs deep like an eternal friendship! You two are destined to share inside jokes, midnight snacks, and adventures that only best friends understand. 🎉",
    "Friendship is the foundation of all great relationships! You've found someone who gets you at your core. Treasure this connection! 🌟",
    "Some souls connect as friends across lifetimes. You two share that rare, beautiful friendship that makes life sweeter! 🍀",
  ],
  L: [
    "The stars have aligned for a romantic journey! Your hearts beat in sync, creating a love story written in the constellations. Get ready for butterflies! 💫",
    "Love is in the air! You two are meant for moonlit walks, stolen glances, and the kind of romance that makes hearts flutter. 🌹",
    "When love finds its match, magic happens! You've discovered a soulmate-level connection that will only grow stronger. 💝",
  ],
  A: [
    "Someone has a secret admirer vibe! There's an undeniable attraction brewing, filled with stolen glances and racing hearts. 😍",
    "The spark of admiration is the beginning of something beautiful! This connection has the potential to bloom into something magical. ✨",
    "Admiration is where great love stories begin! You're at the exciting chapter where every interaction feels electric. 💖",
  ],
  M: [
    "Wedding bells are ringing in your future! You two are soulmates destined to build a beautiful life together. Start planning! 💒",
    "The universe has spoken — marriage is written in your stars! You've found your forever person. 👰💍",
    "True partnership material! Your connection has the depth and strength that builds lasting marriages. Congratulations, you've found 'the one'! 🎊",
  ],
  E: [
    "Opposites attract, but sometimes they clash! Your dynamic is fiery and intense — perfect for a rivals-to-lovers arc! 🔥",
    "Every great story needs tension! Your 'enemy' status might just be unresolved chemistry waiting to explode. 💥",
    "Plot twist: Many epic love stories started as rivalries! This tension could lead somewhere unexpected... 😏",
  ],
  S: [
    "SOULMATES! Your souls have been searching for each other across galaxies. This is the rarest and most precious connection! 🌌",
    "Written in the stars, sealed by the universe — you are true soulmates! Your love transcends time and space. ✨💕",
    "The universe conspired to bring you together! Soulmates like you share a bond that nothing can break. 💞🌟",
  ],
};

// Easter eggs for special name combinations
export interface EasterEgg {
  names: [string, string]; // [name1, name2] - order matters for some
  message: string;
  emoji: string;
  specialAnimation?: "rainbow" | "explosion" | "hearts" | "magic";
}

export const EASTER_EGGS: EasterEgg[] = [
  // Famous couples
  { names: ["romeo", "juliet"], message: "A love story for the ages! 🎭 Star-crossed lovers reunited!", emoji: "💔❤️", specialAnimation: "hearts" },
  { names: ["jack", "rose"], message: "I'll never let go! 🚢 A love that survived the icy depths!", emoji: "💎", specialAnimation: "magic" },
  { names: ["adam", "eve"], message: "The original love story! 🍎 Eden approves this match!", emoji: "🌿", specialAnimation: "magic" },
  { names: ["bonnie", "clyde"], message: "Partners in crime! 💰 An adventurous duo!", emoji: "🔫💕", specialAnimation: "explosion" },
  { names: ["mickey", "minnie"], message: "Disney magic at its finest! 🏰 A timeless love!", emoji: "🐭❤️", specialAnimation: "magic" },
  
  // Same name
  { names: ["same", "same"], message: "Loving yourself is the first step! Self-love champion! 💪", emoji: "🪞✨", specialAnimation: "rainbow" },
  
  // Fun combinations
  { names: ["pizza", "pizza"], message: "Pizza loves pizza! A match made in food heaven! 🍕", emoji: "🍕💕", specialAnimation: "hearts" },
  { names: ["love", "love"], message: "Love loves love! How meta and beautiful! 💗", emoji: "💕", specialAnimation: "hearts" },
];

// Check for easter eggs
export const checkEasterEgg = (name1: string, name2: string): EasterEgg | null => {
  const n1 = name1.toLowerCase().trim();
  const n2 = name2.toLowerCase().trim();
  
  // Check if same name
  if (n1 === n2) {
    return {
      names: ["same", "same"],
      message: `${name1} loves ${name2}! Self-love is the best love! 💪✨`,
      emoji: "🪞💕",
      specialAnimation: "rainbow",
    };
  }
  
  // Check for predefined easter eggs
  for (const egg of EASTER_EGGS) {
    if ((n1 === egg.names[0] && n2 === egg.names[1]) || 
        (n1 === egg.names[1] && n2 === egg.names[0])) {
      return egg;
    }
  }
  
  // Special patterns
  if (n1.includes("love") || n2.includes("love")) {
    return {
      names: [n1, n2],
      message: "Love is literally in the name! 💕 The universe approves!",
      emoji: "💝",
      specialAnimation: "hearts",
    };
  }
  
  if (n1.length + n2.length === 13) {
    return {
      names: [n1, n2],
      message: "Lucky number 13! 🍀 Some say it's unlucky, but for love, it's magical!",
      emoji: "🌟",
      specialAnimation: "magic",
    };
  }
  
  return null;
};

// Get random story for a result
export const getRandomStory = (result: keyof typeof RESULT_STORIES): string => {
  const stories = RESULT_STORIES[result];
  return stories[Math.floor(Math.random() * stories.length)];
};
