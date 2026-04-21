import React from "react";
import { motion } from "motion/react";
import { Search, Flame, Target, TrendingUp, Sparkles } from "lucide-react";
import { MealAnalysis } from "../types";

interface MealAnalyzerProps {
  onAnalyze: (name: string) => void;
  lastAnalysis?: MealAnalysis;
}

export default function MealAnalyzer({ onAnalyze, lastAnalysis }: MealAnalyzerProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onAnalyze((e.target as HTMLInputElement).value);
      (e.target as HTMLInputElement).value = "";
    }
  };

  return (
    <div className="glass p-5 flex flex-col gap-4">
      <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Meal Analyzer</h3>
      
      <div className="bg-slate-900/40 border border-dashed border-slate-700 rounded-xl p-4 text-center group cursor-text relative">
        <input
          type="text"
          placeholder="Type food name or drop photo"
          onKeyDown={handleKeyDown}
          className="absolute inset-0 w-full h-full opacity-0 cursor-text"
        />
        <p className="text-[10px] text-slate-500 font-medium uppercase tracking-tight group-hover:text-slate-400 transition-colors">
          {lastAnalysis ? "Analyze another item" : "Drop photo or type food name"}
        </p>
        {lastAnalysis && (
           <div className="mt-2 font-bold text-sm text-white bg-indigo-500/20 inline-block px-3 py-1 rounded-lg border border-indigo-500/30">
              {lastAnalysis.name}
           </div>
        )}
      </div>

      {lastAnalysis ? (
        <motion.div
          key={lastAnalysis.name}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="space-y-3">
             <div className="flex justify-between items-end">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Decision Profile</span>
                <span className={`text-sm font-bold ${lastAnalysis.tag === 'Healthy' ? 'text-emerald-400' : lastAnalysis.tag === 'Moderate' ? 'text-yellow-400' : 'text-rose-400'}`}>
                   {lastAnalysis.healthScore}/100
                </span>
             </div>
             <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <motion.div 
                   className={`h-full ${lastAnalysis.tag === 'Healthy' ? 'bg-emerald-500' : lastAnalysis.tag === 'Moderate' ? 'bg-yellow-500' : 'bg-rose-500'}`}
                   initial={{ width: 0 }}
                   animate={{ width: `${lastAnalysis.healthScore}%` }}
                />
             </div>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-4">
            <div className="bg-slate-800/50 p-2 rounded-lg border border-white/5">
              <p className="text-[9px] text-slate-500 uppercase font-black tracking-tighter">Calories</p>
              <p className="text-sm font-bold text-white">{lastAnalysis.calories} kcal</p>
            </div>
            <div className="bg-slate-800/50 p-2 rounded-lg border border-white/5">
              <p className="text-[9px] text-slate-500 uppercase font-black tracking-tighter">Rating</p>
              <p className={`text-[11px] font-bold ${lastAnalysis.tag === 'Healthy' ? 'text-emerald-400' : lastAnalysis.tag === 'Moderate' ? 'text-yellow-400' : 'text-rose-400'}`}>
                 {lastAnalysis.tag}
              </p>
            </div>
          </div>
          
          <div className="bg-indigo-500/5 border border-indigo-500/10 p-3 rounded-xl italic">
             <p className="text-[10px] text-slate-400 leading-relaxed">
                “{lastAnalysis.betterSwap}”
             </p>
          </div>
        </motion.div>
      ) : (
        <div className="py-6 flex flex-col items-center justify-center text-center opacity-30">
          <Target className="w-10 h-10 mb-2 text-indigo-400" />
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-relaxed">
            Awaiting input for evaluation.
          </p>
        </div>
      )}
    </div>
  );
}
