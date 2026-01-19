import {
    motion,
    useMotionValue,
    useTransform,
    useSpring,
    AnimatePresence,
    Reorder,
} from "framer-motion";
import { Cloud } from "lucide-react";

// --- KOMPONENTA: OBLAK PLACEHOLDER ---
const CloudPlaceholder = ({
    className,
    delay = 0,
}: {
    className?: string;
    delay?: number;
}) => (
    <motion.div
        animate={{ y: [0, -15, 0] }}
        transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: delay,
        }}
        className={`absolute text-white/80 filter blur-sm ${className}`}>
        <Cloud size={120} fill='currentColor' className='opacity-80' />
    </motion.div>
);

// --- KOMPONENTA: ZLATNA PRAŠINA ---
const GoldParticle = ({ delay }: { delay: number }) => {
    const randomTop = Math.random() * 100;
    const randomLeft = Math.random() * 100;
    const size = Math.random() * 4 + 2;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5] }}
            transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: delay,
            }}
            className='absolute rounded-full bg-yellow-200 shadow-[0_0_8px_rgba(253,224,71,0.8)]'
            style={{
                top: `${randomTop}%`,
                left: `${randomLeft}%`,
                width: size,
                height: size,
            }}
        />
    );
};
export { CloudPlaceholder, GoldParticle };
