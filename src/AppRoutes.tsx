import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./sections/Home";
import WebShop from "./webshop/Webshop";
import Lab from "./lab/Lab.tsx";
const ChromaLab = lazy(() => import("./pages/ChromaLab"));
const NeuralNetwork = lazy(() => import("./pages/NeuralNetwork"));

export default function AppRoutes() {
    return (
        <Suspense fallback={<div className='min-h-screen bg-slate-950' />}>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/webshop' element={<WebShop />} />
                <Route path='/lab' element={<Lab />} />
                <Route path='/pages/ChromaLab' element={<ChromaLab />} />
                <Route
                    path='/pages/elementos'
                    element={
                        <iframe
                            src='/pages/elementos/index.html'
                            className='w-full min-h-screen border-0'
                            title='Elementos'
                        />
                    }
                />
                <Route
                    path='/pages/dreamlike'
                    element={
                        <iframe
                            src='/pages/dreamlike/index.html'
                            className='w-full min-h-screen border-0'
                            title='Dreamlike'
                        />
                    }
                />
                <Route
                    path='/pages/NeuralNetwork'
                    element={<NeuralNetwork />}
                />

                <Route
                    path='/pages/flowchart'
                    element={
                        <iframe
                            src='/pages/2d_flowchart_labirint.html'
                            className='w-full min-h-screen border-0'
                            title='Flowchart'
                        />
                    }
                />
                <Route
                    path='/pages/liquid'
                    element={
                        <iframe
                            src='/pages/liquid/liquid-cube.html'
                            className='w-full min-h-screen border-0'
                            title='Liquid Cube'
                        />
                    }
                />
                <Route
                    path='/pages/color-chemist'
                    element={
                        <iframe
                            src='/pages/ColorChemist.html'
                            className='w-full min-h-screen border-0'
                            title='Color Chemist'
                        />
                    }
                />
                <Route
                    path='/pages/countdown'
                    element={
                        <iframe
                            src='/pages/Countdown.html'
                            className='w-full min-h-screen border-0'
                            title='Countdown'
                        />
                    }
                />

                <Route path='*' element={<Home />} />
            </Routes>
        </Suspense>
    );
}
