import { motion, Reorder } from "motion/react";
import { useState, useEffect } from "react";
import { CheckCircle2, XCircle, RefreshCcw, HelpCircle } from "lucide-react";

const METALS = [
  { id: 'na', name: 'Sodium (Na)', category: 'electro', hint: 'Extremely reactive, found in common salt.' },
  { id: 'fe', name: 'Iron (Fe)', category: 'pyro', hint: 'The backbone of the industrial revolution.' },
  { id: 'au', name: 'Gold (Au)', category: 'hydro', hint: 'Often found in its native state, but refined via leaching.' },
  { id: 'al', name: 'Aluminum (Al)', category: 'electro', hint: 'The most abundant metal in Earth\'s crust, requires massive electricity.' },
  { id: 'cu', name: 'Copper (Cu)', category: 'pyro', hint: 'Extracted from sulfide ores through smelting.' }
];

const CATEGORIES = [
  { id: 'pyro', name: 'Pyrometallurgy', color: 'bg-orange-500/20 text-orange-400 border-orange-500/30' },
  { id: 'hydro', name: 'Hydrometallurgy', color: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
  { id: 'electro', name: 'Electrometallurgy', color: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30' }
];

export default function VirtualLab() {
  const [items, setItems] = useState(METALS.sort(() => Math.random() - 0.5));
  const [results, setResults] = useState<Record<string, boolean | null>>({});
  const [score, setScore] = useState(0);
  const [showHints, setShowHints] = useState(false);

  const checkResult = (metalId: string, categoryId: string) => {
    const metal = METALS.find(m => m.id === metalId)!;
    const isCorrect = metal.category === categoryId;
    
    setResults(prev => ({ ...prev, [metalId]: isCorrect }));
    if (isCorrect) setScore(s => s + 1);
  };

  const reset = () => {
    setItems(METALS.sort(() => Math.random() - 0.5));
    setResults({});
    setScore(0);
  };

  return (
    <section className="py-24 px-4 bg-slate-900/50">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Virtual Lab Simulation</h2>
          <p className="text-slate-400">Drag each metal into its correct extraction category. Test your knowledge!</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <RefreshCcw className="w-5 h-5 text-primary" />
                Metals to Classify
              </h3>
              <button 
                onClick={() => setShowHints(!showHints)}
                className="text-xs text-primary/60 hover:text-primary flex items-center gap-1"
              >
                <HelpCircle className="w-3 h-3" />
                {showHints ? 'Hide Hints' : 'Show Hints'}
              </button>
            </div>
            
            <div className="space-y-3">
              {items.map((metal) => (
                <motion.div
                  key={metal.id}
                  layout
                  className={`glass-card p-4 flex items-center justify-between group ${
                    results[metal.id] === true ? 'border-green-500/40 bg-green-500/5' : 
                    results[metal.id] === false ? 'border-red-500/40 bg-red-500/5' : ''
                  }`}
                >
                  <div>
                    <span className="font-bold text-lg">{metal.name}</span>
                    {showHints && !results[metal.id] && (
                      <p className="text-xs text-slate-500 mt-1 italic">{metal.hint}</p>
                    )}
                  </div>
                  
                  <div className="flex gap-2">
                    {results[metal.id] === null || results[metal.id] === undefined ? (
                      CATEGORIES.map(cat => (
                        <button
                          key={cat.id}
                          onClick={() => checkResult(metal.id, cat.id)}
                          className="px-2 py-1 text-[10px] uppercase font-bold border border-white/10 rounded hover:bg-white/10 transition-colors"
                        >
                          {cat.id.slice(0, 5)}
                        </button>
                      ))
                    ) : (
                      results[metal.id] ? (
                        <CheckCircle2 className="w-6 h-6 text-green-500" />
                      ) : (
                        <div className="flex items-center gap-2">
                          <XCircle className="w-6 h-6 text-red-500" />
                          <button onClick={() => setResults(prev => ({ ...prev, [metal.id]: null }))} className="text-[10px] underline text-slate-500">Retry</button>
                        </div>
                      )
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            <div className="glass-card p-8 text-center bg-primary/5 border-primary/20">
              <h4 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-2">Current Score</h4>
              <div className="text-6xl font-bold text-primary mb-4">{score} / {METALS.length}</div>
              <p className="text-slate-400 text-sm">
                {score === METALS.length ? "Master Metallurgist! You've classified all metals correctly." : "Keep going to unlock your certification."}
              </p>
              {score === METALS.length && (
                <motion.button
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  onClick={reset}
                  className="mt-6 px-6 py-2 bg-primary text-slate-950 font-bold rounded-full hover:bg-primary/80 transition-all"
                >
                  Play Again
                </motion.button>
              )}
            </div>

            <div className="grid grid-cols-1 gap-4">
              {CATEGORIES.map(cat => (
                <div key={cat.id} className={`p-6 rounded-2xl border-2 border-dashed ${cat.color} flex flex-col items-center justify-center gap-2`}>
                  <span className="font-bold text-lg">{cat.name}</span>
                  <p className="text-[10px] uppercase tracking-widest opacity-60">Drop target zone</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
