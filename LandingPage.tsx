import { motion } from "motion/react";
import { ArrowRight, Sparkles, Brain, CheckCircle } from "lucide-react";

interface LandingPageProps {
  onStart: () => void;
}

export default function LandingPage({ onStart }: LandingPageProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-[#020617]">
      {/* Background Glows */}
      <div className="bg-glow purple-glow -top-[10%] -left-[10%]" />
      <div className="bg-glow blue-glow -bottom-[10%] -right-[10%]" />

      <main className="relative z-10 text-center px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-white/10 mb-8 text-purple-300 text-sm font-medium"
        >
          <Sparkles className="w-4 h-4" />
          <span>New: AI Decision Intelligence 2.0</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-6xl md:text-8xl font-bold tracking-tight mb-6 bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent"
        >
          NudgeAI
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed"
        >
          Don’t track food. <span className="text-white italic">Change decisions.</span> AI-powered nudges for smarter eating.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={onStart}
            className="px-8 py-4 bg-purple-600 hover:bg-purple-500 text-white rounded-2xl font-bold text-lg transition-all flex items-center gap-2 active:scale-95 shadow-xl shadow-purple-900/20 group"
          >
            Start Now
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="px-8 py-4 glass text-white rounded-2xl font-bold text-lg hover:bg-white/5 transition-all">
            See How It Works
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 text-left border-t border-white/5 pt-12"
        >
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-900/30 flex items-center justify-center text-purple-400">
              <Brain className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg">Behavioral AI</h3>
            <p className="text-gray-500 text-sm">Our neural engine understands psychology, not just nutrition.</p>
          </div>
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-900/30 flex items-center justify-center text-blue-400">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg">Smart Swaps</h3>
            <p className="text-gray-500 text-sm">Instant healthier alternatives tailored to your specific cravings.</p>
          </div>
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-green-900/30 flex items-center justify-center text-green-400">
              <CheckCircle className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg">Real Results</h3>
            <p className="text-gray-500 text-sm">Build lasting habits with small nudges that compound over time.</p>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
