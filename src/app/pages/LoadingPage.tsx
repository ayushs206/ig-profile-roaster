import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle2, Terminal } from "lucide-react";

const funnyMessages = [
  "Looking at profile...",
  "Reading bio...",
  "Checking captions...",
  "Counting mirror selfies...",
  "Searching for personality...",
  "Still searching...",
  "Checking for \"wanderlust\" in bio...",
  "Calculating ego...",
  "Detecting red flags...",
  "Consulting professional haters...",
  "Cooking emotional damage...",
  "Generating final verdict..."
];

export function LoadingPage() {
  const [searchParams] = useSearchParams();
  const user = searchParams.get("user") || "@unknown";
  const navigate = useNavigate();
  const [messageIndex, setMessageIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    const totalTime = 8000; 
    const intervalTime = totalTime / funnyMessages.length;
    let currentIdx = 0;

    const interval = setInterval(() => {
      currentIdx++;
      if (currentIdx < funnyMessages.length) {
        setMessageIndex(currentIdx);
      }
    }, intervalTime);

    const progressInterval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return p + 2;
      });
    }, totalTime / 50);

    const timeouts = [
      setTimeout(() => setLogs(l => [...l, "✓ Username found"]), 1000),
      setTimeout(() => setLogs(l => [...l, "✓ Profile scanned"]), 2500),
      setTimeout(() => setLogs(l => [...l, "✓ Captions questionable"]), 4000),
      setTimeout(() => setLogs(l => [...l, "✓ Roast quality: Excellent"]), 5500),
      setTimeout(() => setLogs(l => [...l, "✓ Emotional damage ready"]), 7000),
      setTimeout(() => navigate(`/results?user=${encodeURIComponent(user)}`), 8500),
    ];

    return () => {
      clearInterval(interval);
      clearInterval(progressInterval);
      timeouts.forEach(clearTimeout);
    };
  }, [navigate, user]);

  return (
    <div className="min-h-screen flex items-center justify-center p-[clamp(1rem,4vw,2rem)] relative">
      <div className="absolute inset-0 pointer-events-none">
        {/* Decorative elements */}
        <div className="absolute top-10 left-[5%] md:left-10 sticker bg-[#F8B4D9] text-[clamp(0.6rem,2vw,1rem)] hidden md:block">PLEASE WAIT...</div>
        <div className="absolute bottom-20 right-[5%] md:right-10 sticker rotate-12 bg-[#FFFDF8] text-[clamp(0.6rem,2vw,1rem)] hidden md:block">DON'T PANIC</div>
      </div>

      <div className="brutal-card p-[clamp(1.5rem,4vw,3rem)] w-[90%] md:w-full max-w-2xl bg-white flex flex-col gap-[clamp(1.5rem,4vw,2rem)] relative z-10">
        <div className="absolute -top-4 -right-2 md:-right-4 sticker bg-[#FF8FC4] text-white text-[clamp(0.6rem,2vw,0.8rem)]">DIAGNOSTIC</div>
        
        <h2 className="font-bebas text-[clamp(2rem,6vw,3rem)] uppercase text-center drop-shadow-[2px_2px_0_#F8B4D9] leading-tight break-all">
          Preparing Roast for <br className="md:hidden" /> {user}
        </h2>

        <div className="h-10 border-4 border-black w-full bg-[#FFF7FA] relative overflow-hidden shadow-[4px_4px_0_#111]">
          <motion.div 
            className="h-full bg-[#FF8FC4] border-r-4 border-black"
            style={{ width: `${progress}%` }}
          />
          <div className="absolute inset-0 flex items-center justify-center font-bold text-sm mix-blend-difference text-white">
            {Math.floor(progress)}%
          </div>
        </div>

        <div className="text-center h-12 md:h-8 font-bold text-[clamp(0.9rem,3vw,1.125rem)] text-[#111] flex items-center justify-center px-4">
          <AnimatePresence mode="wait">
            <motion.p
              key={messageIndex}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="text-center leading-tight"
            >
              {funnyMessages[messageIndex]}
            </motion.p>
          </AnimatePresence>
        </div>

        <div className="border-4 border-black bg-[#F5F5F5] p-3 md:p-4 text-[clamp(0.75rem,2.5vw,0.875rem)] font-space shadow-[4px_4px_0_#F8B4D9]">
          <div className="flex items-center gap-2 mb-2 pb-2 border-b-2 border-black/20">
            <Terminal size={16} className="shrink-0" /> <span>Diagnostic Logs</span>
          </div>
          <div className="flex flex-col gap-2 h-[clamp(6rem,15vw,8rem)] overflow-hidden justify-end">
            {logs.map((log, i) => (
              <motion.div 
                initial={{ opacity: 0, x: -10 }} 
                animate={{ opacity: 1, x: 0 }} 
                key={i}
                className="flex items-center gap-2 text-[#FF8FC4]"
              >
                <span className="text-black break-words">{log}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
