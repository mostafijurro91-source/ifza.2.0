import { motion } from 'motion/react';
import { ShoppingBag, User, Sparkles } from 'lucide-react';

export default function SplashScreen({ onComplete }: { onComplete: () => void }) {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center bg-white overflow-hidden p-6">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative flex flex-col items-center gap-12 w-full max-w-xs"
      >
        <div className="text-center space-y-2 relative z-10">
          <h1 className="text-slate-900 tracking-tighter text-[56px] font-black leading-none">
            Cokmoke<span className="text-primary">.</span>
          </h1>
          <p className="text-primary text-lg font-bold tracking-widest mt-1 text-center">চকমকে</p>
          <p className="text-slate-500 text-xs font-semibold tracking-[0.2em] uppercase mt-6">
            Wear Your Style
          </p>
        </div>

        <div className="w-full space-y-4 pt-16 max-w-[200px]">
          <div className="w-full h-1 rounded-full bg-slate-100 overflow-hidden relative">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 2.0, ease: "easeInOut" }}
              onAnimationComplete={() => setTimeout(onComplete, 300)}
              className="h-full bg-primary rounded-full"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
