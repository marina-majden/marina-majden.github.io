import { motion } from "framer-motion";

const BackgroundGlows = () => (
    <div className='fixed w-screen h-screen inset-0 overflow-x-hidden overflow-y-visible pointer-events-none z-0'>
        <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className='absolute top-[10%] left-[10%] w-[200px] h-[200px] bg-purple-600/20 rounded-full blur-3xl will-change-transform'
        />
        <motion.div
            animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2,
            }}
            className='absolute bottom-[20%] right-[5%] w-[200px] h-[200px] bg-indigo-600/10 rounded-full blur-3xl will-change-transform'
        />
        <motion.div
            animate={{ x: [0, 50, 0], y: [0, -50, 0] }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className='absolute top-[10%] left-[75%] w-[300px] h-[300px] bg-indigo-500/10 rounded-full blur-3xl will-change-transform'
        />
    </div>
);

export default BackgroundGlows;
