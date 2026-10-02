import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";

// Lazy-loaded main views
const Home = lazy(() => import("./sections/Home.tsx"));
const WebShop = lazy(() => import("./webshop/Webshop.tsx"));
const Lab = lazy(() => import("./lab/Lab.tsx"));

// Lazy-loaded interactive experiments
const ChromaLab = lazy(() => import("./pages/ChromaLab.tsx"));
const NeuralNetwork = lazy(() => import("./pages/NeuralNetwork.tsx"));
const AppViewer = lazy(() => import("./components/AppViewer.tsx"));
const NotFound = lazy(() => import("./components/NotFound.tsx"));

// Lazy-loaded project showcase deep dives
const Litart = lazy(() => import("./showcase/Litart.tsx"));
const NeedHelp = lazy(() => import("./showcase/NeedHelp.tsx"));
const SongFinder = lazy(() => import("./showcase/SongFinder.tsx"));
const Storybook = lazy(() => import("./showcase/Storybook.tsx"));
const Unplugged = lazy(() => import("./showcase/Unplugged.tsx"));

export default function AppRoutes() {
    return (
        <Suspense
            fallback={
                <div className='min-h-screen bg-slate-950 flex items-center justify-center'>
                    <div className='w-8 h-8 rounded-full border-2 border-cyan-500/30 border-t-cyan-400 animate-spin' />
                </div>
            }>
            <Routes>
                {/* Core Pages */}
                <Route path='/' element={<Home />} />
                <Route path='/webshop' element={<WebShop />} />
                <Route path='/lab' element={<Lab />} />

                {/* Experimental Code Pages */}
                <Route path='/pages/ChromaLab' element={<ChromaLab />} />
                <Route path='/pages/NeuralNetwork' element={<NeuralNetwork />} />

                {/* Dynamic App & Mini-Website Viewer */}
                <Route path='/apps/:appId' element={<AppViewer />} />
                <Route path='/pages/:appId' element={<AppViewer />} />

                {/* Project Showcase Deep Dives */}
                <Route path='/showcase/litart' element={<Litart />} />
                <Route path='/litart' element={<Litart />} />
                <Route path='/showcase/needhelp' element={<NeedHelp />} />
                <Route path='/needhelp' element={<NeedHelp />} />
                <Route path='/showcase/songfinder' element={<SongFinder />} />
                <Route path='/songfinder' element={<SongFinder />} />
                <Route path='/showcase/storybook' element={<Storybook />} />
                <Route path='/storybook' element={<Storybook />} />
                <Route path='/showcase/unplugged' element={<Unplugged />} />
                <Route path='/unplugged' element={<Unplugged />} />

                {/* 404 Fallback */}
                <Route path='*' element={<NotFound />} />
            </Routes>
        </Suspense>
    );
}

