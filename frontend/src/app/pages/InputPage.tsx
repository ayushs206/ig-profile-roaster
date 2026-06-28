import { useState } from "react";
import { useNavigate } from "react-router";
import { Sparkles, TerminalSquare, AlertTriangle, MousePointer2 } from "lucide-react";
import { motion } from "motion/react";

export function InputPage() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleRoast = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      navigate(`/loading?user=${encodeURIComponent(username)}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-[clamp(1rem,4vw,2rem)] relative">
      {/* Floating Elements Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Only shown on md and above */}
        <motion.div 
          animate={{ y: [0, -10, 0], rotate: [-2, 2, -2] }} 
          transition={{ duration: 4, repeat: Infinity }}
          className="hidden md:block absolute top-10 md:top-20 left-[5%] md:left-[10%] sticker rotate-6 bg-[#FF8FC4] text-white border-2 border-black text-[clamp(0.6rem,2vw,1rem)]"
        >
          CRINGE DETECTED
        </motion.div>
        
        <motion.div 
          animate={{ y: [0, 15, 0], rotate: [5, -5, 5] }} 
          transition={{ duration: 5, repeat: Infinity, delay: 1 }}
          className="hidden md:block absolute top-40 right-[10%] md:right-[15%] sticker bg-[#F7D7E8] text-[clamp(0.6rem,2vw,1rem)]"
        >
          TOUCH GRASS
        </motion.div>

        <motion.div 
          animate={{ scale: [1, 1.1, 1] }} 
          transition={{ duration: 3, repeat: Infinity }}
          className="hidden lg:block absolute bottom-32 left-[10%] md:left-[15%] sticker bg-[#EADCFB] rotate-[-5deg] text-[clamp(0.6rem,2vw,1rem)]"
        >
          VIBES UNDER REVIEW
        </motion.div>

        <motion.div 
          animate={{ y: [0, -20, 0] }} 
          transition={{ duration: 6, repeat: Infinity }}
          className="hidden md:block absolute bottom-20 md:bottom-40 right-[5%] md:right-[10%] sticker bg-[#FFFDF8] rotate-[8deg] text-[clamp(0.6rem,2vw,1rem)]"
        >
          CERTIFIED DELULU
        </motion.div>

        {/* Fake Mini Windows - Laptop only */}
        <div className="hidden lg:block absolute top-1/4 left-5 w-[clamp(6rem,12vw,8rem)] brutal-card border-2 shadow-[4px_4px_0px_#111] p-2 bg-white -rotate-3 text-xs">
          <div className="flex gap-1 border-b-2 border-black pb-1 mb-1">
             <div className="w-2 h-2 rounded-full bg-[#FF8FC4] border border-black"></div>
             <div className="w-2 h-2 rounded-full bg-[#F7D7E8] border border-black"></div>
          </div>
          <span className="text-[10px]">scan.exe running...</span>
        </div>

        <div className="hidden lg:flex absolute top-1/3 right-10 brutal-card border-2 shadow-[4px_4px_0px_#111] p-3 bg-[#EADCFB] rotate-6 text-xs items-center gap-2 max-w-[200px]">
          <AlertTriangle size={16} className="shrink-0" /> <span className="font-bold">404 SELF AWARENESS</span>
        </div>

        <div className="hidden lg:block absolute bottom-1/4 right-20 text-[#FF8FC4]">
          <Sparkles size={40} className="animate-spin-slow" style={{ animationDuration: '8s' }} />
        </div>

        <div className="hidden lg:block absolute top-1/2 left-10 xl:left-20 text-[#74A9FF]">
          <MousePointer2 size={30} className="rotate-[-45deg]" />
        </div>
      </div>

      <div className="relative z-10 w-full flex flex-col items-center">
        <motion.h1 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="font-bebas text-[clamp(2.2rem,7vw,5rem)] text-center leading-[0.9] tracking-tight mb-[clamp(1rem,3vw,1.5rem)] uppercase drop-shadow-[4px_4px_0_#F8B4D9]"
        >
          Let's Judge Your<br />Instagram.
        </motion.h1>
        
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-[clamp(1rem,2vw,1.3rem)] font-bold w-[90%] max-w-md mx-auto mb-[clamp(2.5rem,6vw,4rem)] bg-white border-2 border-black p-3 shadow-[4px_4px_0_#111] rotate-1 text-center"
        >
          Drop a public username and prepare for emotional damage.
        </motion.p>

        <form onSubmit={handleRoast} className="w-[90%] md:max-w-[550px] lg:max-w-[600px] xl:max-w-[650px] flex flex-col items-center gap-[clamp(1.5rem,4vw,2.5rem)]">
          <motion.div 
             initial={{ scale: 0.9, opacity: 0 }}
             animate={{ scale: 1, opacity: 1 }}
             transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
             className="brutalist-container w-full"
          >
            <input
              type="text"
              className="brutalist-input smooth-type text-center w-full"
              placeholder="@username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              spellCheck="false"
            />
            <label className="brutalist-label uppercase tracking-widest max-[374px]:hidden">
              TARGET
            </label>
          </motion.div>

          <motion.button 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            type="submit"
            disabled={!username.trim()}
            className="brutal-button w-[90%] max-w-[350px] md:w-[250px] md:max-w-none lg:w-auto lg:px-12 py-3 md:py-4 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ROAST 🔥
          </motion.button>
        </form>
      </div>
    </div>
  );
}