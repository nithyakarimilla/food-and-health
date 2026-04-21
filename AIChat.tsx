import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, Bot, User, Loader2 } from "lucide-react";
import { ChatMessage } from "../types";
import { getFoodSuggestion } from "../services/geminiService";

interface AIChatProps {
  chatHistory: ChatMessage[];
  onSendMessage: (content: string) => void;
  isLoading: boolean;
  userGoal: string;
}

export default function AIChat({ chatHistory, onSendMessage, isLoading, userGoal }: AIChatProps) {
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatHistory, isLoading]);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;
    onSendMessage(input);
    setInput("");
  };

  return (
    <div className="flex flex-col h-[500px] md:h-full glass rounded-3xl overflow-hidden border-white/10 shadow-2xl relative">
      {/* Header */}
      <div className="p-4 border-b border-white/5 bg-white/5 backdrop-blur-md flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/20">
          <Bot className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="font-bold text-white leading-none">Nudge Coach</h2>
          <span className="text-[10px] text-purple-400 font-bold uppercase tracking-widest mt-1 inline-block">Active Decision Intelligence</span>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
        {chatHistory.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center opacity-50 p-6">
            <Bot className="w-12 h-12 mb-4 text-purple-400" />
            <p className="text-gray-400">“I’m hungry, what should I eat?”<br />or “I’m craving pizza...”</p>
          </div>
        )}
        
        <AnimatePresence>
          {chatHistory.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] p-4 ${
                  msg.role === "user"
                    ? "chat-bubble-user text-slate-100"
                    : "chat-bubble-ai text-slate-200"
                }`}
              >
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="bg-white/5 border border-white/10 p-4 rounded-2xl rounded-tl-none flex items-center gap-2">
              <Loader2 className="w-4 h-4 text-purple-500 animate-spin" />
              <span className="text-xs text-gray-400 font-medium">Nudge is thinking...</span>
            </div>
          </motion.div>
        )}
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-4 border-t border-white/5 bg-black/20">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask your coach anything..."
            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-600/50 text-white placeholder:text-gray-600 transition-all"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="w-12 h-12 bg-purple-600 hover:bg-purple-500 disabled:opacity-50 disabled:hover:bg-purple-600 text-white rounded-xl flex items-center justify-center transition-all active:scale-95 shadow-lg shadow-purple-900/20"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
}
