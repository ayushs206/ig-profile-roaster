import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { Terminal } from "lucide-react";

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
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    const cleanUser = user.startsWith("@") ? user.substring(1) : user;
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

    // Progress tick: smoothly increment up to 90%
    const progressInterval = setInterval(() => {
      setProgress(p => {
        if (p >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return p + 2;
      });
    }, 150);

    // Funny messages rotation
    const messageInterval = setInterval(() => {
      setMessageIndex(prev => (prev + 1) % funnyMessages.length);
    }, 1000);

    // Logs addition simulation
    const logsSequence = [
      "Connecting to Instagram servers...",
      "Scraping user profile details...",
      "Analyzing bio metadata...",
      "Reading caption sentiments...",
      "Consulting the hater algorithm...",
      "Compiling emotional damage..."
    ];
    let logIdx = 0;
    const logInterval = setInterval(() => {
      if (logIdx < logsSequence.length) {
        setLogs(l => [...l, `✓ ${logsSequence[logIdx]}`]);
        logIdx++;
      } else {
        clearInterval(logInterval);
      }
    }, 1000);

    // Fetch the roast from the backend
    fetch(`${apiBaseUrl}/api/scrap?username=${encodeURIComponent(cleanUser)}`)
      .then(async res => {
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.error || `HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        if (!active) return;
        if (data.success) {
          clearInterval(progressInterval);
          clearInterval(messageInterval);
          clearInterval(logInterval);
          
          setLogs(l => [...l, "✓ Analysis completed!", "✓ Roast successfully cooked!"]);
          setProgress(100);

          // Save in session storage for persistence on refresh
          sessionStorage.setItem(`roast_${user}`, JSON.stringify(data));
          
          // Small delay for smooth transition after reaching 100%
          setTimeout(() => {
            if (active) {
              navigate(`/results?user=${encodeURIComponent(user)}`, { state: { data } });
            }
          }, 800);
        } else {
          throw new Error("Failed to process profile data.");
        }
      })
      .catch(err => {
        if (!active) return;
        clearInterval(progressInterval);
        clearInterval(messageInterval);
        clearInterval(logInterval);
        setError(err.message || "Failed to fetch profile. Make sure the username is correct, public, and the backend is running.");
      });

    return () => {
      active = false;
      clearInterval(progressInterval);
      clearInterval(messageInterval);
      clearInterval(logInterval);
    };
  }, [user, navigate]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-[clamp(1rem,4vw,2rem)] relative">
        <div className="brutal-card p-[clamp(1.5rem,4vw,3rem)] w-[90%] md:w-full max-w-2xl bg-white flex flex-col gap-6 relative z-10 border-red-500">
          <div className="absolute -top-4 -right-2 md:-right-4 sticker bg-[#FF3B30] text-white text-[clamp(0.6rem,2vw,0.8rem)]">ERROR</div>
          
          <h2 className="font-bebas text-[clamp(2rem,6vw,3rem)] uppercase text-center text-red-600 drop-shadow-[2px_2px_0_#FFF] leading-tight">
            DIAGNOSTIC CRASHED
          </h2>

          <div className="border-4 border-black bg-[#FFF5F5] p-5 shadow-[4px_4px_0_#111]">
            <p className="font-bold text-lg mb-2 text-red-600">Failed to roast {user}:</p>
            <p className="font-space text-sm text-gray-800 break-words">{error}</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full">
            <button onClick={() => navigate("/")} className="brutal-button w-full py-3 flex items-center justify-center gap-2 bg-[#FF8FC4] font-bold cursor-pointer">
              Go Back Home
            </button>
            <button onClick={() => window.location.reload()} className="brutal-button w-full py-3 flex items-center justify-center gap-2 bg-[#EADCFB] font-bold cursor-pointer">
              Retry Scan
            </button>
          </div>
        </div>
      </div>
    );
  }

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
