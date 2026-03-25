import { motion } from "framer-motion";

const BackgroundGlows = () => (
    <div className='fixed w-screen h-screen inset-0 overflow-x-hidden overflow-y-visible pointer-events-none z-0'>
        <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className='absolute top-[10%] left-[10%] w-[200px] h-[200px] bg-[radial-gradient(circle_at_center,rgba(147,51,234,0.4)_0%,transparent_60%)] rounded-full will-change-transform'
        />
        <motion.div
            animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2,
            }}
            className='absolute bottom-[20%] right-[5%] w-[200px] h-[200px] bg-[radial-gradient(circle_at_center,rgba(79,70,229,0.3)_0%,transparent_60%)] rounded-full will-change-transform'
        />
        <motion.div
            animate={{ x: [0, 50, 0], y: [0, -50, 0] }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className='absolute top-[10%] left-[75%] w-[300px] h-[300px] bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.25)_0%,transparent_60%)] rounded-full will-change-transform'
        />
    </div>
);

export default BackgroundGlows;
