import { motion } from 'motion/react';
import { ShoppingBag, User, Sparkles } from 'lucide-react';

export default function SplashScreen({ onComplete }: { onComplete: () => void }) {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center bg-background-dark overflow-hidden p-6">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px]"></div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative flex flex-col items-center gap-8 w-full max-w-xs"
      >
        <div className="w-full aspect-square relative group">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-3xl"></div>
          <div className="w-full h-full rounded-3xl overflow-hidden border border-primary/20 bg-background-dark shadow-2xl shadow-primary/10">
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCzcdHnSiWJMdaRapY0MrwB73NcT-D9j-8V-gPkxQpH5rEHeeO8_NOJ5U64exZglo3LyCmt-Y4QmnfrkHs-37RTxfJyftgOlWpLOvHPExyQ-6z7ZEJW0Lb_9sb067joE2_vxoAa4n4lNA3_yHcQj-qTx7g08KqIWBxmws7_st3I3xvfV95pGyBC-x7TmXMqVJhDr0sK5dQjYbIbzHnFL6x60_Q7Ody-sK_oqN-5QGRZRx0pbyR00A3-lFqEAH5yGgCpjV-w6SIDXFRG" 
              alt="Fashion Model"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute -bottom-4 -right-4 p-4 bg-primary rounded-2xl shadow-lg shadow-primary/40">
            <Sparkles className="text-white size-8" />
          </div>
        </div>

        <div className="text-center space-y-2">
          <h1 className="text-white tracking-tighter text-[48px] font-bold leading-none">
            ifza<span className="text-primary">.</span>
          </h1>
          <p className="text-slate-400 text-lg font-medium tracking-wide">
            Wear Your Style
          </p>
        </div>

        <div className="w-full space-y-4 pt-12">
          <div className="flex justify-between items-end">
            <p className="text-slate-500 text-xs font-semibold uppercase tracking-widest">Initialising Try-On</p>
            <p className="text-primary text-xs font-bold">75%</p>
          </div>
          <div className="w-full h-1.5 rounded-full bg-primary/10 overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: '75%' }}
              transition={{ duration: 2, ease: "easeInOut" }}
              onAnimationComplete={() => setTimeout(onComplete, 500)}
              className="h-full bg-primary rounded-full shadow-[0_0_8px_rgba(242,127,13,0.6)]"
            />
          </div>
        </div>
      </motion.div>

      <div className="absolute bottom-12 left-0 right-0 flex justify-center gap-8 text-slate-500">
        <div className="flex flex-col items-center gap-1">
          <ShoppingBag className="size-5" />
          <span className="text-[10px] font-bold uppercase tracking-tighter">Shop</span>
        </div>
        <div className="flex flex-col items-center gap-1 text-primary">
          <Sparkles className="size-5" />
          <span className="text-[10px] font-bold uppercase tracking-tighter">Try-On</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <User className="size-5" />
          <span className="text-[10px] font-bold uppercase tracking-tighter">Style</span>
        </div>
      </div>
    </div>
  );
}
