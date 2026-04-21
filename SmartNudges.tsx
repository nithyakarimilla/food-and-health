import { motion } from "motion/react";
import { Zap, Sun, Coffee, Moon } from "lucide-react";
import { UserGoal } from "../types";

interface SmartNudgesProps {
  goal: UserGoal;
  name: string;
}

export default function SmartNudges({ goal, name }: SmartNudgesProps) {
  const hour = new Date().getHours();
  
  return (
    <div className="glass p-5 flex flex-col h-full">
      <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">Smart Nudges</h3>
      <div className="space-y-4 flex-1">
        {hour >= 12 && (
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="p-3 bg-indigo-500/10 border-l-2 border-indigo-500 rounded-r-lg"
          >
            <p className="text-[10px] text-indigo-300 font-bold mb-1 uppercase tracking-widest">
              {hour < 18 ? "AFTERNOON NUDGE" : "EVENING NUDGE"}
            </p>
            <p className="text-xs leading-relaxed text-slate-200 font-medium">
              {hour < 18 
                ? "Avoid heavy carbs now to prevent a late afternoon energy crash."
                : "Choose a lighter dinner with lean protein for better sleep."}
            </p>
          </motion.div>
        )}
        
        <div className="p-3 bg-emerald-500/10 border-l-2 border-emerald-500 rounded-r-lg opacity-60">
          <p className="text-[10px] text-emerald-300 font-bold mb-1 uppercase tracking-widest">MORNING (DONE)</p>
          <p className="text-xs leading-relaxed text-slate-200 font-medium">
            Started your day with high protein + fiber breakfast.
          </p>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between text-[9px] font-bold text-slate-500 uppercase tracking-widest">
        <span>AI Decision Engine</span>
        <span>v2.0.4</span>
      </div>
    </div>
  );
}
