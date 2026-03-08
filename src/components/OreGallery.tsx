import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { Info, Target, MapPin, Zap } from "lucide-react";

const ORES = [
  {
    id: "hematite",
    name: "Hematite",
    formula: "Fe_2O_3",
    metal: "Iron (Fe)",
    description: "The primary source of iron, known for its reddish-brown streak and high iron content.",
    color: "bg-red-900/40",
    accent: "text-red-400",
    image: "https://picsum.photos/seed/hematite/400/300"
  },
  {
    id: "bauxite",
    name: "Bauxite",
    formula: "Al_2O_3 \cdot nH_2O",
    metal: "Aluminum (Al)",
    description: "The world's main source of aluminum, formed from the weathering of rocks in tropical climates.",
    color: "bg-orange-900/40",
    accent: "text-orange-400",
    image: "https://picsum.photos/seed/bauxite/400/300"
  },
  {
    id: "chalcopyrite",
    name: "Chalcopyrite",
    formula: "CuFeS_2",
    metal: "Copper (Cu)",
    description: "A brassy yellow mineral that is the most important ore of copper.",
    color: "bg-yellow-900/40",
    accent: "text-yellow-400",
    image: "https://picsum.photos/seed/chalcopyrite/400/300"
  },
  {
    id: "sphalerite",
    name: "Sphalerite",
    formula: "ZnS",
    metal: "Zinc (Zn)",
    description: "The chief ore of zinc, often found with galena and other sulfide minerals.",
    color: "bg-zinc-800/40",
    accent: "text-zinc-400",
    image: "https://picsum.photos/seed/sphalerite/400/300"
  }
];

export default function OreGallery() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <section id="gallery" className="py-24 px-4 max-w-7xl mx-auto">
      <div className="mb-16 text-center">
        <h2 className="text-4xl font-bold mb-4">Interactive Ore Gallery</h2>
        <p className="text-slate-400 max-w-2xl mx-auto">
          Explore the raw minerals that hold the world's metals. Click an ore to reveal its secrets.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {ORES.map((ore) => (
          <motion.div
            key={ore.id}
            layoutId={ore.id}
            onClick={() => setSelected(ore.id)}
            whileHover={{ y: -10 }}
            className={`cursor-pointer glass-card p-6 transition-all hover:bg-white/10 ${ore.color}`}
          >
            <div className="aspect-video rounded-xl overflow-hidden mb-4">
              <img 
                src={ore.image} 
                alt={ore.name} 
                className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity"
                referrerPolicy="no-referrer"
              />
            </div>
            <h3 className="text-xl font-bold mb-1">{ore.name}</h3>
            <p className="text-sm font-mono text-primary/80 mb-4">{ore.formula}</p>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Target className="w-3 h-3" />
              Target: {ore.metal}
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selected && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
            <motion.div
              layoutId={selected}
              className="glass-card max-w-2xl w-full p-8 relative overflow-hidden"
            >
              <button 
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white"
              >
                ✕
              </button>
              
              {(() => {
                const ore = ORES.find(o => o.id === selected)!;
                return (
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="rounded-2xl overflow-hidden h-64 md:h-full">
                      <img 
                        src={ore.image} 
                        alt={ore.name} 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold mb-2">{ore.name}</h3>
                      <p className="text-primary font-mono text-lg mb-6">{ore.formula}</p>
                      
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <Info className={`w-5 h-5 mt-1 ${ore.accent}`} />
                          <div>
                            <p className="font-semibold text-sm uppercase tracking-wider text-slate-500">Description</p>
                            <p className="text-slate-300">{ore.description}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-3">
                          <Target className={`w-5 h-5 mt-1 ${ore.accent}`} />
                          <div>
                            <p className="font-semibold text-sm uppercase tracking-wider text-slate-500">Target Metal</p>
                            <p className="text-slate-300">{ore.metal}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-3">
                          <Zap className={`w-5 h-5 mt-1 ${ore.accent}`} />
                          <div>
                            <p className="font-semibold text-sm uppercase tracking-wider text-slate-500">Extraction Method</p>
                            <p className="text-slate-300">
                              {ore.id === 'hematite' ? 'Pyrometallurgy' : 
                               ore.id === 'bauxite' ? 'Electrometallurgy' : 
                               'Pyrometallurgy / Hydrometallurgy'}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
