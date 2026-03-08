import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, X, Send, User, Bot, Loader2, Minimize2, Maximize2 } from "lucide-react";
import { askProfessorMetallurgy } from "../services/gemini";
import ReactMarkdown from "react-markdown";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ role: "user" | "model", parts: string }[]>([
    { role: "model", parts: "Greetings, student! I am Professor Metallurgy. How can I assist you in your journey of metal liberation today?" }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen, isMinimized]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: "user", parts: userMsg }]);
    setIsLoading(true);

    try {
      const response = await askProfessorMetallurgy(userMsg, messages);
      setMessages(prev => [...prev, { role: "model", parts: response || "I apologize, my chemical sensors are slightly misaligned. Could you rephrase that?" }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: "model", parts: "An error occurred in my metallurgical database. Please try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              y: 0,
              height: isMinimized ? '64px' : '500px',
              width: '380px'
            }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="glass-card flex flex-col shadow-2xl overflow-hidden mb-4 border-primary/30"
          >
            {/* Header */}
            <div className="p-4 bg-primary/10 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center border border-primary/40">
                  <Bot className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Professor Metallurgy</h4>
                  <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[10px] text-slate-400 uppercase tracking-widest">Expert AI Tutor</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-1.5 hover:bg-white/10 rounded-lg text-slate-400 transition-colors"
                >
                  {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 hover:bg-white/10 rounded-lg text-slate-400 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            {!isMinimized && (
              <>
                <div 
                  ref={scrollRef}
                  className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-white/10"
                >
                  {messages.map((msg, i) => (
                    <div 
                      key={i} 
                      className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${
                        msg.role === 'user' 
                          ? 'bg-primary text-slate-950 font-medium rounded-tr-none' 
                          : 'bg-white/5 border border-white/10 text-slate-200 rounded-tl-none'
                      }`}>
                        <div className="markdown-body">
                          <ReactMarkdown>{msg.parts}</ReactMarkdown>
                        </div>
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-white/5 border border-white/10 p-3 rounded-2xl rounded-tl-none">
                        <Loader2 className="w-4 h-4 text-primary animate-spin" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Input Area */}
                <div className="p-4 border-t border-white/10 bg-slate-900/50">
                  <div className="relative">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                      placeholder="Ask about pyrometallurgy, ores..."
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-4 pr-12 text-sm focus:outline-none focus:border-primary/50 transition-colors"
                    />
                    <button
                      onClick={handleSend}
                      disabled={!input.trim() || isLoading}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-primary hover:bg-primary/10 rounded-lg transition-all disabled:opacity-50"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => {
          setIsOpen(true);
          setIsMinimized(false);
        }}
        className={`w-14 h-14 rounded-full bg-primary text-slate-950 shadow-2xl flex items-center justify-center transition-all ${isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      >
        <MessageSquare className="w-6 h-6" />
      </motion.button>
    </div>
  );
}
