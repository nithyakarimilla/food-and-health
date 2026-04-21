import { motion } from "motion/react";
import { Activity, Award, ChevronUp } from "lucide-react";

interface HealthScoreProps {
  score: number;
}

export default function HealthScore({ score }: HealthScoreProps) {
  const radius = 25;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="glass p-5 flex flex-col items-center justify-center text-center gap-3 relative overflow-hidden group">
      <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider relative z-10">Daily Health Score</h3>
      
      <div className="relative w-28 h-28 z-10">
        <svg className="w-28 h-28 -rotate-90">
          <circle
            className="text-slate-800"
            strokeWidth="6"
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx="56"
            cy="56"
          />
          <motion.circle
            className="text-indigo-500"
            strokeWidth="6"
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx="56"
            cy="56"
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            style={{ strokeDasharray: circumference }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span 
            className="text-2xl font-bold text-white block"
            key={score}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
          >
            {score}
          </motion.span>
          <span className="text-[10px] text-slate-400 uppercase font-bold tracking-tight">Points</span>
        </div>
      </div>

      <p className="text-xs text-slate-300 relative z-10 leading-relaxed font-medium">
        {score > 75 ? "You made better choices today 👏" : score > 50 ? "Balanced day so far. Keep it up." : "Let's pivot to some healthier nudges."}
      </p>
    </div>
  );
}
