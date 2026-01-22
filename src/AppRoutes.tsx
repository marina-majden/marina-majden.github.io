import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { motion } from "framer-motion";
import SpinnerLoader from "./components/SpinnerLoader";
import Home from "./pages/Home";

const NeedHelp = lazy(() => import("./showcase/NeedHelp"));
const LitArt = lazy(() => import("./showcase/Litart"));
const SongFinder = lazy(() => import("./showcase/SongFinder"));
const Storybook = lazy(() => import("./showcase/Storybook"));
const Unplugged = lazy(() => import("./showcase/Unplugged"));

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

export const AppRoutes = () => {
    return (
        <Suspense fallback={<SpinnerLoader />}>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/showcase/need-help' element={<NeedHelp />} />
                <Route path='/showcase/lit-art' element={<LitArt />} />
                <Route path='/showcase/song-finder' element={<SongFinder />} />
                <Route path='/showcase/storybook' element={<Storybook />} />
                <Route path='/showcase/unplugged' element={<Unplugged />} />
            </Routes>
        </Suspense>
    );
};
