import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router";
import { motion } from "motion/react";
// @ts-ignore
import confetti from "canvas-confetti";
import { Share2, Download, RotateCcw } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

const MOCK_PROFILE = {
  bio: "Just a small town girl living in a lonely world 🌍✨ | Coffee addict ☕ | CEO of overthinking | 📍 NY/LA/Miami",
  followers: "12.4K",
  following: "1,205",
  posts: "452",
};

const STATS = [
  { label: "Cringe Meter", value: 85, color: "#FF8FC4" },
  { label: "Touch Grass Score", value: 12, color: "#74A9FF" },
  { label: "Main Character Syndrome", value: 95, color: "#F8B4D9" },
  { label: "NPC Energy", value: 40, color: "#EADCFB" },
  { label: "Delusion Index", value: 100, color: "#FF8FC4" },
  { label: "Influencer Probability", value: 5, color: "#F7D7E8" },
];

const ACHIEVEMENTS = [
  "🏆 CEO of Overthinking",
  "📸 Selfie Collector",
  "🚩 Walking Red Flag",
  "💀 Certified Delulu",
  "🌍 Future Travel Influencer"
];

export function ResultsPage() {
  const [searchParams] = useSearchParams();
  const user = searchParams.get("user") || "@unknown";
  const navigate = useNavigate();

  useEffect(() => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#F8B4D9", "#FF8FC4", "#111111", "#74A9FF", "#FFFFFF"]
    });
  }, []);

  return (
    <div className="min-h-screen p-[clamp(1rem,3vw,3rem)] relative w-full overflow-x-hidden">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-[clamp(1.5rem,4vw,2rem)] relative z-10">
        
        {/* Left Side - Profile Card */}
        <motion.div 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="md:col-span-5 lg:col-span-4 flex flex-col gap-[clamp(1rem,3vw,1.5rem)]"
        >
          <div className="brutal-card p-[clamp(1rem,3vw,1.5rem)] rotate-1 w-full box-border">
            <div className="absolute -top-3 -left-3 sticker bg-[#FF8FC4] text-white text-[clamp(0.6rem,2vw,0.75rem)]">THE VICTIM</div>
            
            <div className="flex flex-col items-center text-center mt-4">
              <div className="w-[clamp(6rem,20vw,8rem)] h-[clamp(6rem,20vw,8rem)] border-4 border-black rounded-full overflow-hidden shadow-[4px_4px_0_#111] mb-4 bg-[#F5F5F5] shrink-0">
                <ImageWithFallback src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user}`} alt="Profile" className="w-full h-full object-cover" />
              </div>
              <h2 className="font-bebas text-[clamp(1.5rem,5vw,2.5rem)] mb-1 break-all px-2 w-full">{user}</h2>
              <p className="text-[clamp(0.75rem,2vw,0.875rem)] font-bold bg-[#F7D7E8] px-2 py-1 border-2 border-black mb-4">
                Public Profile
              </p>
              
              <div className="flex justify-center gap-[clamp(0.5rem,2vw,1rem)] w-full mb-6 border-y-4 border-black py-4">
                <div className="text-center flex-1">
                  <div className="font-bebas text-[clamp(1.25rem,4vw,1.75rem)]">{MOCK_PROFILE.posts}</div>
                  <div className="text-[clamp(0.6rem,1.5vw,0.75rem)] font-bold uppercase truncate">Posts</div>
                </div>
                <div className="text-center flex-1">
                  <div className="font-bebas text-[clamp(1.25rem,4vw,1.75rem)]">{MOCK_PROFILE.followers}</div>
                  <div className="text-[clamp(0.6rem,1.5vw,0.75rem)] font-bold uppercase truncate">Followers</div>
                </div>
                <div className="text-center flex-1">
                  <div className="font-bebas text-[clamp(1.25rem,4vw,1.75rem)]">{MOCK_PROFILE.following}</div>
                  <div className="text-[clamp(0.6rem,1.5vw,0.75rem)] font-bold uppercase truncate">Following</div>
                </div>
              </div>

              <div className="text-left w-full border-2 border-black p-3 bg-[#FFFDF8] relative shadow-[4px_4px_0_#F8B4D9]">
                <div className="absolute -top-2 -right-2 text-[10px] font-bold bg-black text-white px-1">BIO</div>
                <p className="text-[clamp(0.75rem,2vw,0.875rem)] break-words">{MOCK_PROFILE.bio}</p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col gap-3 w-full">
             <button onClick={() => navigate("/")} className="brutal-button w-full py-3 flex items-center justify-center gap-2 bg-[#F8B4D9] text-[clamp(0.875rem,2vw,1rem)]">
               <RotateCcw size={18} /> Roast Another
             </button>
             <div className="flex flex-col sm:flex-row gap-3 w-full">
                <button className="brutal-button flex-1 py-3 flex items-center justify-center gap-2 text-[clamp(0.875rem,2vw,1rem)]">
                  <Share2 size={16} /> Share
                </button>
                <button className="brutal-button flex-1 py-3 flex items-center justify-center gap-2 text-[clamp(0.875rem,2vw,1rem)]">
                  <Download size={16} /> Save
                </button>
             </div>
          </div>
        </motion.div>

        {/* Right Side - Roast Report */}
        <motion.div 
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="md:col-span-7 lg:col-span-8 brutal-card p-[clamp(1.25rem,4vw,2rem)] bg-white -rotate-1 w-full box-border"
        >
          <div className="absolute -top-3 md:-top-4 right-2 md:right-10 sticker bg-[#111] text-[#FF8FC4] border-[#FF8FC4] text-[clamp(0.6rem,2vw,0.8rem)]">OFFICIAL REPORT</div>
          
          <h1 className="font-bebas text-[clamp(2.5rem,7vw,4.5rem)] uppercase mb-[clamp(1rem,3vw,1.5rem)] drop-shadow-[4px_4px_0_#EADCFB] border-b-4 border-black pb-[clamp(0.5rem,2vw,1rem)] leading-[0.9]">
            FINAL VERDICT
          </h1>

          <div className="bg-[#FFF7FA] border-4 border-black p-[clamp(1rem,4vw,1.5rem)] mb-[clamp(1.5rem,4vw,2rem)] relative shadow-[clamp(4px,2vw,6px)_clamp(4px,2vw,6px)_0_#111]">
            <p className="text-[clamp(0.875rem,2.5vw,1.125rem)] font-bold leading-relaxed break-words">
              Your profile is a textbook example of someone who curates their life for an audience that doesn't exist. The sheer amount of emojis in your bio suggests you're trying to hide the fact that your personality peaked in high school. "CEO of overthinking"? More like CEO of posting blurry stories and hoping your crush views them. 
              <br/><br/>
              Please, for the love of all that is holy, take a break from the internet.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-[clamp(1rem,4vw,2rem)] gap-y-[clamp(1rem,3vw,1.5rem)] mb-[clamp(1.5rem,4vw,2rem)]">
            {STATS.map((stat, i) => (
              <div key={i} className="flex flex-col gap-1">
                <div className="flex justify-between font-bold text-[clamp(0.75rem,2vw,0.875rem)]">
                  <span>{stat.label}</span>
                  <span>{stat.value}%</span>
                </div>
                <div className="h-[clamp(1.25rem,3vw,1.5rem)] border-2 border-black w-full bg-[#F5F5F5] relative shadow-[2px_2px_0_#111]">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${stat.value}%` }}
                    transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                    className="h-full border-r-2 border-black"
                    style={{ backgroundColor: stat.color }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div>
            <h3 className="font-bebas text-[clamp(1.5rem,4vw,2rem)] mb-3 uppercase">Unlocked Achievements</h3>
            <div className="flex flex-wrap gap-[clamp(0.5rem,2vw,0.75rem)]">
              {ACHIEVEMENTS.map((achieve, i) => (
                <div key={i} className="sticker text-[clamp(0.65rem,2vw,0.875rem)]" style={{ transform: `rotate(${Math.random() * 6 - 3}deg)` }}>
                  {achieve}
                </div>
              ))}
            </div>
          </div>

        </motion.div>
      </div>

      {/* Decorative background stuff */}
      <div className="absolute top-1/4 left-5 text-[#FF8FC4] hidden xl:block">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
      </div>
      <div className="absolute bottom-1/4 right-5 text-[#F8B4D9] hidden xl:block animate-bounce">
        <svg width="50" height="50" viewBox="0 0 24 24" fill="currentColor" stroke="black" strokeWidth="1"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
      </div>
    </div>
  );
}
