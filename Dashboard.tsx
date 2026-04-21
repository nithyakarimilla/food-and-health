import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  BarChart3, 
  MessageSquare, 
  Zap, 
  Settings, 
  LogOut, 
  Coffee, 
  Flame, 
  Apple, 
  Infinity 
} from "lucide-react";
import { UserState, ChatMessage, MealAnalysis } from "../types";
import AIChat from "./AIChat";
import MealAnalyzer from "./MealAnalyzer";
import HealthScore from "./HealthScore";
import SmartNudges from "./SmartNudges";
import { getFoodSuggestion, analyzeMeal } from "../services/geminiService";

interface DashboardProps {
  onLogout: () => void;
}

export default function Dashboard({ onLogout }: DashboardProps) {
  const [state, setState] = useState<UserState>({
    name: "Alex Johnson",
    goal: "healthy-eating",
    healthScore: 72,
    chatHistory: [],
  });

  const [isLoading, setIsLoading] = useState(false);
  const [cravingMode, setCravingMode] = useState(false);

  const handleSendMessage = useCallback(async (content: string) => {
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content,
      timestamp: Date.now(),
    };

    setState(prev => ({
      ...prev,
      chatHistory: [...prev.chatHistory, userMsg]
    }));

    setIsLoading(true);
    
    // Simple logic update for score
    const scoreImpact = content.toLowerCase().includes('salad') || content.toLowerCase().includes('healthy') ? 5 : 
                         content.toLowerCase().includes('pizza') || content.toLowerCase().includes('burger') ? -5 : 0;

    const responseText = await getFoodSuggestion(content, state.goal);
    
    const aiMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: "ai",
      content: responseText,
      timestamp: Date.now(),
    };

    setState(prev => ({
      ...prev,
      chatHistory: [...prev.chatHistory, aiMsg],
      healthScore: Math.min(100, Math.max(0, prev.healthScore + scoreImpact))
    }));
    
    setIsLoading(false);
  }, [state.goal]);

  const handleAnalyze = useCallback((foodName: string) => {
    const analysis = analyzeMeal(foodName);
    
    setState(prev => {
      const scoreImpact = analysis.tag === 'Healthy' ? 8 : analysis.tag === 'Moderate' ? 2 : -10;
      return {
        ...prev,
        lastAnalysis: analysis,
        healthScore: Math.min(100, Math.max(0, prev.healthScore + scoreImpact))
      };
    });
  }, []);

  const triggerQuickAction = (text: string) => {
    handleSendMessage(text);
  };


  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 flex flex-col font-sans relative overflow-hidden">
      {/* Background Glows */}
      <div className="bg-glow purple-glow -top-[100px] -left-[100px]" />
      <div className="bg-glow blue-glow -bottom-[100px] -right-[100px]" />

      <div className="p-6 h-screen flex flex-col gap-6 relative z-10">
        {/* Header */}
        <header className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-white">NudgeAI</h1>
              <p className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold italic">Smart Food Coach</p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-slate-900/50 border border-slate-800 rounded-full py-2 px-4 shadow-sm">
            <div className="flex flex-col items-end">
              <span className="text-xs font-medium text-slate-300">{state.name}</span>
              <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-tight">Goal: {state.goal === 'healthy-eating' ? 'Healthy Eating' : 'Weight Loss'}</span>
            </div>
            <div className="w-9 h-9 rounded-full bg-slate-700 border border-slate-600 flex items-center justify-center overflow-hidden">
               <div className="w-full h-full bg-slate-600"></div>
            </div>
            <button onClick={onLogout} className="p-1.5 hover:bg-white/5 rounded-lg transition-colors">
              <LogOut className="w-4 h-4 text-slate-500" />
            </button>
          </div>
        </header>

        {/* Main Grid */}
        <main className="flex-1 grid grid-cols-12 gap-6 overflow-hidden">
          {/* Left Column: Stats & Nudges */}
          <section className="col-span-12 lg:col-span-3 flex flex-col gap-6 overflow-y-auto lg:overflow-hidden scrollbar-hide">
             <HealthScore score={state.healthScore} />
             <div className="flex-1 min-h-[300px]">
                <SmartNudges goal={state.goal} name={state.name.split(' ')[0]} />
             </div>
          </section>

          {/* Center Column: Chat Area */}
          <section className="col-span-12 lg:col-span-6 flex flex-col h-full overflow-hidden">
            <AIChat 
              chatHistory={state.chatHistory} 
              onSendMessage={handleSendMessage} 
              isLoading={isLoading} 
              userGoal={state.goal} 
            />
          </section>

          {/* Right Column: Analyzer & Actions */}
          <section className="col-span-12 lg:col-span-3 flex flex-col gap-6 overflow-y-auto lg:overflow-hidden scrollbar-hide">
            <MealAnalyzer onAnalyze={handleAnalyze} lastAnalysis={state.lastAnalysis} />
            
            <div className="glass p-5 flex-1 flex flex-col min-h-[250px]">
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-3 flex-1">
                <button 
                  onClick={() => triggerQuickAction("Analyze this meal: Salad with chicken.")}
                  className="bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700 rounded-xl p-3 flex flex-col items-center justify-center text-center gap-2 transition-all active:scale-95"
                >
                  <span className="text-xl">🥗</span>
                  <span className="text-[10px] font-medium text-slate-300">Analyze Food</span>
                </button>
                <button 
                  onClick={() => triggerQuickAction("I need a healthy suggestion for lunch.")}
                  className="bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700 rounded-xl p-3 flex flex-col items-center justify-center text-center gap-2 transition-all active:scale-95"
                >
                  <span className="text-xl">💡</span>
                  <span className="text-[10px] font-medium text-slate-300">Suggestion</span>
                </button>
                <button 
                  onClick={() => triggerQuickAction("What are some good high protein sources?")}
                  className="bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700 rounded-xl p-3 flex flex-col items-center justify-center text-center gap-2 transition-all active:scale-95"
                >
                  <span className="text-xl">🍖</span>
                  <span className="text-[10px] font-medium text-slate-300">Protein Check</span>
                </button>
                <button 
                  onClick={() => setCravingMode(!cravingMode)}
                  className={`${cravingMode ? 'craving-btn' : 'bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700'} rounded-xl p-3 flex flex-col items-center justify-center text-center gap-2 transition-all active:scale-95`}
                >
                  <span className="text-xl">🔥</span>
                  <span className={`text-[10px] ${cravingMode ? 'font-bold text-white' : 'font-medium text-slate-300'}`}>Craving Mode</span>
                </button>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
