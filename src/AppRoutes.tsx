import { Suspense, lazy } from "react";
import { Routes, Route, useLocation, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Home from "./pages/Home";
const NeedHelp = lazy(() => import("./showcase/NeedHelp"));
const LitArt = lazy(() => import("./showcase/Litart"));
const SongFinder = lazy(() => import("./showcase/SongFinder"));
const Storybook = lazy(() => import("./showcase/Storybook"));
const Unplugged = lazy(() => import("./showcase/Unplugged"));
const Lab = lazy(() => import("./lab/Lab"));

// Loading Screen Component
const LoadingScreen = () => (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-slate-950'>
        <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className='flex flex-col items-center gap-4'>
            <div className='relative w-16 h-16'>
                <div className='absolute inset-0 border-4 border-slate-800 rounded-full' />
                <div className='absolute inset-0 border-4 border-t-emerald-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin' />
            </div>
            <span className='text-slate-400 font-mono text-sm animate-pulse'>
                Loading Project...
            </span>
        </motion.div>
    </div>
);

const PageTransition = ({ children }: { children: React.ReactNode }) => (
    <motion.div
        initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className='w-full h-full'>
        {children}
    </motion.div>
);

const NotFound = () => (
    <div className='min-h-screen flex flex-col items-center justify-center bg-slate-950 text-white p-4 text-center'>
        <h1 className='text-9xl font-bold text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-pink-600 mb-4'>
            404
        </h1>
        <p className='text-xl text-slate-400 mb-8'>
            Izgubili ste se u svemiru koda?
        </p>
        <Link
            to='/'
            className='px-8 py-3 bg-slate-800 hover:bg-slate-700 rounded-full transition-all border border-slate-700 hover:border-purple-500'>
            Povratak u bazu
        </Link>
    </div>
);

export const AppRoutes = () => {
    const location = useLocation();

    return (
        <Suspense fallback={<LoadingScreen />}>
            <AnimatePresence
                mode='wait'
                onExitComplete={() => window.scrollTo(0, 0)}>
                <Routes location={location} key={location.pathname}>
                    <Route
                        path='/'
                        element={
                            <PageTransition>
                                <Home />
                            </PageTransition>
                        }
                    />
                    <Route
                        path='/showcase/need-help'
                        element={
                            <PageTransition>
                                <NeedHelp />
                            </PageTransition>
                        }
                    />
                    <Route
                        path='/showcase/lit-art'
                        element={
                            <PageTransition>
                                <LitArt />
                            </PageTransition>
                        }
                    />
                    <Route
                        path='/showcase/song-finder'
                        element={
                            <PageTransition>
                                <SongFinder />
                            </PageTransition>
                        }
                    />
                    <Route
                        path='/showcase/storybook'
                        element={
                            <PageTransition>
                                <Storybook />
                            </PageTransition>
                        }
                    />
                    <Route
                        path='/showcase/unplugged'
                        element={
                            <PageTransition>
                                <Unplugged />
                            </PageTransition>
                        }
                    />
                    <Route
                        path='/lab'
                        element={
                            <PageTransition>
                                <Lab />
                            </PageTransition>
                        }
                    />
                    <Route
                        path='*'
                        element={
                            <PageTransition>
                                <NotFound />
                            </PageTransition>
                        }
                    />
                </Routes>
            </AnimatePresence>
        </Suspense>
    );
};
