import { ArrowRight, BookOpen } from "react-feather";
import Reveal from "../components/Reveal";
import ContextShifter from "./ContextShifter";
import VisualContextShifter from "./VisualContextShifter";

const Playground = ({ t, lang, setActiveTab }) => (
    <div className="min-h-screen bg-black text-white font-['Dosis'] selection:bg-pink-500 selection:text-white overflow-x-hidden relative">
        <div className='fixed top-0 left-0 w-full h-full overflow-hidden z-0'>
            <div className='absolute top-[-20%] left-[-20%] w-[140%] h-[140%] bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-purple-900/20 via-black to-black animate-pulse'></div>
            <div className='absolute top-1/4 left-1/4 w-2 h-2 bg-pink-500 rounded-full animate-ping'></div>
            <div className='absolute bottom-1/4 right-1/4 w-3 h-3 bg-cyan-500 rounded-full animate-bounce duration-3000'></div>
        </div>

        <div className='relative z-10 container mx-auto px-6 py-12 flex flex-col items-center'>
            <button
                onClick={() => setActiveTab("home")}
                className="absolute top-8 left-8 flex items-center gap-2 text-pink-400 hover:text-pink-300 transition-all hover:translate-x-[-5px] font-['Fira_Code'] z-50">
                <ArrowRight className='rotate-180' size={20} /> {t.litart.back}
            </button>

            <div className='animate-float mt-12 text-center'>
                <BookOpen
                    size={64}
                    className='text-pink-500 mb-6 drop-shadow-[0_0_15px_rgba(236,72,153,0.8)] mx-auto'
                />
                <h1 className='text-6xl md:text-8xl font-bold mb-4 bg-clip-text text-transparent bg-linear-to-r from-pink-500 via-purple-500 to-cyan-500 animate-gradient-x pb-2'>
                    {t.litart.title}
                </h1>
                <p className='text-2xl text-gray-300 mb-8 max-w-2xl font-light tracking-wide mx-auto'>
                    {t.litart.subtitle}
                </p>
            </div>

            <Reveal delay={300} className='w-full flex justify-center'>
                <div className='p-8 border border-pink-500/30 rounded-lg bg-pink-900/10 backdrop-blur-md max-w-xl text-center hover:bg-pink-900/20 transition-colors group mb-12'>
                    <p className="font-['Fira_Code'] text-pink-200 group-hover:text-white transition-colors">
                        {t.litart.desc}
                    </p>
                    <div className='mt-6 flex justify-center gap-3'>
                        <span className='w-2 h-2 bg-pink-500 rounded-full animate-pulse'></span>
                        <span className='w-2 h-2 bg-purple-500 rounded-full animate-pulse delay-100'></span>
                        <span className='w-2 h-2 bg-cyan-500 rounded-full animate-pulse delay-200'></span>
                    </div>
                </div>
            </Reveal>

            <Reveal delay={500} className='w-full'>
                <ContextShifter lang={lang} t={t} />
            </Reveal>

            <Reveal delay={700} className='w-full'>
                <VisualContextShifter lang={lang} t={t} />
            </Reveal>
        </div>
    </div>
);
export default Playground;
