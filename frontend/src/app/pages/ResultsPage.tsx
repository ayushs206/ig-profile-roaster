import { useEffect, useState } from "react";
import { useSearchParams, useNavigate, useLocation } from "react-router";
import { motion } from "motion/react";
// @ts-ignore
import confetti from "canvas-confetti";
import { Share2, Download, RotateCcw } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { toast } from "sonner";

function formatNumber(num: number): string {
  if (!num && num !== 0) return "0";
  if (num >= 1000000) return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
  if (num >= 1000) return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
  return num.toLocaleString();
}

function getAchievements(data: any): string[] {
  const list: string[] = [];
  const roast = data.roast || {};
  const profile = data.profile || {};
  
  // Map archetypes
  roast.archetypes?.forEach((arch: any) => {
    const type = arch.type;
    if (type === "developer") list.push("💻 Certified Code Monkey");
    else if (type === "student") list.push("🎓 Professional Debt Accumulator");
    else if (type === "photographer") list.push("📸 Shutter Button Spammer");
    else if (type === "gamer") list.push("🎮 Discord Moderator");
    else if (type === "gymbro") list.push("💪 Protein Powder Addict");
    else if (type === "trader") list.push("📈 Buy High Sell Low Expert");
    else if (type === "influencer") list.push("🤳 DM For Collab");
    else if (type === "traveller") list.push("✈️ Wanderlust Delusional");
    else if (type === "foodie") list.push("☕ Aesthetic Cafe Spammer");
    else if (type === "anime") list.push("🍥 Sub over Dub Elitist");
    else if (type === "sigma") list.push("🗿 Patrick Bateman Impersonator");
  });

  // Map personality
  roast.personality?.forEach((p: string) => {
    if (p === "chronically online") list.push("💀 Chronically Online");
    else if (p === "mysterious") list.push("👻 Ghost Protocol");
    else if (p === "popular") list.push("🔥 Local Celebrity");
    else if (p === "showoff") list.push("💅 Link-In-Bio Attention Seeker");
  });

  // Map vibe
  roast.vibe?.forEach((v: string) => {
    if (v === "edgy") list.push("🖤 Edgelord");
    else if (v === "gen-z") list.push("🤡 Skull Emoji Spammer");
    else if (v === "aesthetic") list.push("✨ Pinterest Wannabe");
  });

  // Map roast targets
  roast.roastTargets?.forEach((t: string) => {
    if (t === "ratioDisaster") list.push("🚩 Ratio Disaster");
    else if (t === "followingEveryone") list.push("👀 Desperate Follower");
    else if (t === "simp") list.push("🥺 Certified Simp");
    else if (t === "cringeUsername") list.push("🤢 Cringe Username");
  });

  // Fallbacks if list is empty
  if (list.length === 0) {
    list.push("🏆 Certified NPC");
  }
  
  // Return unique achievements, up to 5
  return [...new Set(list)].slice(0, 5);
}

function getStats(data: any) {
  const cringeVal = data.roast?.cringe ?? 50;
  const ratingVal = data.roast?.rating ?? 50;
  const postsCount = data.profile?.posts ?? 0;
  const followersCount = data.profile?.followers ?? 0;
  const followingCount = data.profile?.following ?? 0;
  const bioLen = data.profile?.bioLength ?? 0;
  const isVerified = data.profile?.verified ?? false;

  const ratio = followingCount > 0 ? followersCount / followingCount : followersCount;

  // Compute custom metrics based on profile attributes
  const cringeMeter = cringeVal;
  const touchGrassScore = Math.max(5, Math.min(100, 100 - cringeMeter - Math.min(30, postsCount / 10)));
  const mainCharacter = Math.max(5, Math.min(100, Math.round(Math.min(50, ratio) * 1.5) + ((data.profile?.highlights ?? 0) * 4) + (isVerified ? 30 : 0)));
  const npcEnergy = Math.max(5, Math.min(100, 100 - Math.round(cringeMeter * 0.4) - Math.round(ratingVal * 0.4)));
  const delusionIndex = Math.max(5, Math.min(100, (followingCount > followersCount * 2 ? 75 : 30) + Math.min(25, bioLen / 5)));
  const influencerProb = followersCount > 5000 ? Math.min(100, Math.round(followersCount / 1500)) : Math.min(100, Math.round(followersCount / 150));

  return [
    { label: "Cringe Meter", value: cringeMeter, color: "#FF8FC4" },
    { label: "Touch Grass Score", value: touchGrassScore, color: "#74A9FF" },
    { label: "Main Character Syndrome", value: mainCharacter, color: "#F8B4D9" },
    { label: "NPC Energy", value: npcEnergy, color: "#EADCFB" },
    { label: "Delusion Index", value: delusionIndex, color: "#FF8FC4" },
    { label: "Influencer Probability", value: influencerProb, color: "#F7D7E8" },
  ];
}

export function ResultsPage() {
  const [searchParams] = useSearchParams();
  const user = searchParams.get("user") || "@unknown";
  const navigate = useNavigate();
  const location = useLocation();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [imageSrc, setImageSrc] = useState<string>("");

  useEffect(() => {
    const profilePicUrl = data?.profile?.profilePic?.url;
    if (profilePicUrl) {
      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";
      setImageSrc(`${apiBaseUrl}/api/proxy-image?url=${encodeURIComponent(profilePicUrl)}`);
    } else {
      setImageSrc(`https://api.dicebear.com/7.x/avataaars/svg?seed=${user}`);
    }
  }, [data, user]);

  useEffect(() => {
    // Load from location state first, then sessionStorage
    const stateData = location.state?.data;
    if (stateData) {
      setData(stateData);
      setLoading(false);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#F8B4D9", "#FF8FC4", "#111111", "#74A9FF", "#FFFFFF"]
      });
    } else {
      const cached = sessionStorage.getItem(`roast_${user}`);
      if (cached) {
        try {
          const parsed = JSON.parse(cached);
          setData(parsed);
          setLoading(false);
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ["#F8B4D9", "#FF8FC4", "#111111", "#74A9FF", "#FFFFFF"]
          });
        } catch (e) {
          console.error("Failed to parse cached roast data", e);
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    }
  }, [location.state, user]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8 bg-[#FFFDF8]">
        <div className="text-center font-bebas text-4xl animate-pulse">Loading Diagnostic Report...</div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center p-[clamp(1rem,4vw,2rem)] relative">
        <div className="brutal-card p-[clamp(1.5rem,4vw,3rem)] w-[90%] md:w-full max-w-xl bg-white flex flex-col gap-6 relative z-10 border-black">
          <div className="absolute -top-4 -right-2 md:-right-4 sticker bg-[#FF8FC4] text-white text-[clamp(0.6rem,2vw,0.8rem)]">404</div>
          
          <h2 className="font-bebas text-[clamp(2.5rem,6vw,3.5rem)] uppercase text-center drop-shadow-[2px_2px_0_#F8B4D9] leading-tight">
            NO RECORD FOUND
          </h2>

          <div className="border-4 border-black bg-[#FFFDF8] p-5 shadow-[4px_4px_0_#111] text-center font-bold">
            We couldn't find any cooked roast for {user}. You need to start a diagnostic scan first!
          </div>

          <button onClick={() => navigate("/")} className="brutal-button w-full py-3 flex items-center justify-center gap-2 bg-[#FF8FC4] font-bold cursor-pointer">
            <RotateCcw size={18} /> Run New Diagnostic
          </button>
        </div>
      </div>
    );
  }

  const profile = data.profile || {};
  const roast = data.roast || {};
  const stats = getStats(data);
  const achievements = getAchievements(data);

  const handleShare = () => {
    // Copy current URL to clipboard
    navigator.clipboard.writeText(window.location.href);
    toast("Link copied! Go copy-paste this emotional damage to your group chat. 😈", {
      style: {
        background: "#F8B4D9",
        border: "4px solid black",
        color: "black",
        borderRadius: "0px",
        boxShadow: "4px 4px 0px #111"
      }
    });
  };

  const handleSave = () => {
    toast("Evidence archived! Storing this cringe for future blackmail, are we? 📂💀", {
      style: {
        background: "#EADCFB",
        border: "4px solid black",
        color: "black",
        borderRadius: "0px",
        boxShadow: "4px 4px 0px #111"
      }
    });
  };

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
            <div className="absolute -top-3 -left-3 sticker bg-[#FF8FC4] text-white text-[clamp(0.6rem,2vw,0.75rem)]">
              {roast.title || "THE VICTIM"}
            </div>
            
            <div className="flex flex-col items-center text-center mt-4">
              <div className="w-[clamp(6rem,20vw,8rem)] h-[clamp(6rem,20vw,8rem)] border-4 border-black rounded-full overflow-hidden shadow-[4px_4px_0_#111] mb-4 bg-[#F5F5F5] shrink-0">
                <ImageWithFallback 
                  src={imageSrc} 
                  alt="Profile" 
                  className="w-full h-full object-cover" 
                  onError={() => {
                    const fallbackUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${user}`;
                    if (imageSrc !== fallbackUrl) {
                      setImageSrc(fallbackUrl);
                    }
                  }}
                />
              </div>
              <h2 className="font-bebas text-[clamp(1.5rem,5vw,2.5rem)] mb-1 break-all px-2 w-full">{profile.fullName || user}</h2>
              <p className="text-[clamp(0.75rem,2vw,0.875rem)] font-bold bg-[#F7D7E8] px-2 py-1 border-2 border-black mb-4">
                @{profile.username || user}
              </p>
              
              <div className="flex justify-center gap-[clamp(0.5rem,2vw,1rem)] w-full mb-6 border-y-4 border-black py-4">
                <div className="text-center flex-1">
                  <div className="font-bebas text-[clamp(1.25rem,4vw,1.75rem)]">{formatNumber(profile.posts)}</div>
                  <div className="text-[clamp(0.6rem,1.5vw,0.75rem)] font-bold uppercase truncate">Posts</div>
                </div>
                <div className="text-center flex-1">
                  <div className="font-bebas text-[clamp(1.25rem,4vw,1.75rem)]">{formatNumber(profile.followers)}</div>
                  <div className="text-[clamp(0.6rem,1.5vw,0.75rem)] font-bold uppercase truncate">Followers</div>
                </div>
                <div className="text-center flex-1">
                  <div className="font-bebas text-[clamp(1.25rem,4vw,1.75rem)]">{formatNumber(profile.following)}</div>
                  <div className="text-[clamp(0.6rem,1.5vw,0.75rem)] font-bold uppercase truncate">Following</div>
                </div>
              </div>

              <div className="text-left w-full border-2 border-black p-3 bg-[#FFFDF8] relative shadow-[4px_4px_0_#F8B4D9]">
                <div className="absolute -top-2 -right-2 text-[10px] font-bold bg-black text-white px-1">BIO</div>
                <p className="text-[clamp(0.75rem,2vw,0.875rem)] break-words whitespace-pre-wrap">{profile.bio || "No bio. Probably too cool for words (or just boring)."}</p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col gap-3 w-full">
             <button onClick={() => navigate("/")} className="brutal-button w-full py-3 flex items-center justify-center gap-2 bg-[#F8B4D9] text-[clamp(0.875rem,2vw,1rem)] cursor-pointer">
               <RotateCcw size={18} /> Roast Another
             </button>
             <div className="flex flex-col sm:flex-row gap-3 w-full">
                <button onClick={handleShare} className="brutal-button flex-1 py-3 flex items-center justify-center gap-2 text-[clamp(0.875rem,2vw,1rem)] cursor-pointer">
                  <Share2 size={16} /> Share
                </button>
                <button onClick={handleSave} className="brutal-button flex-1 py-3 flex items-center justify-center gap-2 text-[clamp(0.875rem,2vw,1rem)] cursor-pointer">
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
              {roast.verdict || "No verdict available. Apparently, you're so bland even the hater algorithm is speechless."}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-[clamp(1rem,4vw,2rem)] gap-y-[clamp(1rem,3vw,1.5rem)] mb-[clamp(1.5rem,4vw,2rem)]">
            {stats.map((stat, i) => (
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
              {achievements.map((achieve, i) => (
                <div key={i} className="sticker text-[clamp(0.65rem,2vw,0.875rem)] bg-[#FFFDF8]" style={{ transform: `rotate(${((i % 3) - 1) * 3}deg)` }}>
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
