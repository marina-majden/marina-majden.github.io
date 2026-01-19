import React from "react";

const ServiceCard: React.FC = () => {
    return (
        <div className='flex min-h-screen items-center justify-center bg-gray-900 p-6 font-sans'>
            <div className='relative h-auto w-80 overflow-hidden rounded-2xl bg-[#07182E] transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,183,255,0.5)]'>
                <div className='relative z-10 p-4'>
                    {/* Header Section */}
                    <div className='mb-4 flex items-center'>
                        <div className='mr-3 flex h-12 w-12 items-center justify-center rounded-xl border-2 border-white/20 bg-blue-500 text-[0.6rem] font-bold leading-tight text-white shadow-lg'>
                            <div className='text-center'>
                                UI
                                <br />
                                VERSE
                            </div>
                        </div>
                        <div>
                            <h2
                                title='SuperApp'
                                className='truncate text-lg font-bold text-white/90'>
                                SuperApp
                            </h2>
                            <span className='mt-1 inline-block rounded-full bg-green-500/20 px-2 py-0.5 text-xs font-medium text-green-300/90'>
                                Available
                            </span>
                        </div>
                    </div>

                    {/* Core Features Section */}
                    <div className='mb-4'>
                        <h3 className='mb-2 text-xs font-semibold text-white/80'>
                            Core Features
                        </h3>
                        <div className='-mx-1 flex flex-wrap'>
                            {[
                                "Real-time Sync",
                                "Cloud Backup",
                                "Multi-device Support",
                                "Offline Mode",
                            ].map((feature, index) => (
                                <div
                                    key={index}
                                    className='m-0.5 rounded-full border border-white/20 bg-white/10 px-2 py-1 text-xs font-medium text-white/70 shadow-sm transition-all duration-300 hover:bg-white/20'>
                                    {feature}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Other Features List */}
                    <div className='mb-4'>
                        <h3 className='mb-2 text-xs font-semibold text-white/80'>
                            Other Features
                        </h3>
                        <ul className='grid grid-cols-1 gap-1 text-xs text-white/60'>
                            {[
                                "Dark Mode",
                                "Custom Themes",
                                "Password Protection",
                                "Data Export",
                                "Widgets",
                            ].map((item, index) => (
                                <li key={index} className='flex items-center'>
                                    <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        viewBox='0 0 24 24'
                                        stroke='currentColor'
                                        fill='none'
                                        className='mr-1 h-3 w-3 text-white/70'>
                                        <path
                                            d='M5 13l4 4L19 7'
                                            strokeWidth='2'
                                            strokeLinejoin='round'
                                            strokeLinecap='round'></path>
                                    </svg>
                                    <span title={item} className='truncate'>
                                        {item}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Action Buttons */}
                    <div className='flex items-center justify-between space-x-2'>
                        <button className='flex flex-1 items-center justify-center rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-xs font-medium text-white/90 transition duration-300 ease-in-out hover:bg-white/20'>
                            <svg
                                stroke='currentColor'
                                viewBox='0 0 24 24'
                                fill='none'
                                className='mr-1 h-4 w-4'
                                xmlns='http://www.w3.org/2000/svg'>
                                <path
                                    d='M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                                    strokeWidth='2'
                                    strokeLinejoin='round'
                                    strokeLinecap='round'></path>
                            </svg>
                            Help
                        </button>
                        <button className='flex flex-1 items-center justify-center rounded-lg bg-white/20 px-3 py-2 text-xs font-medium text-white transition duration-300 ease-in-out hover:bg-white/30'>
                            <svg
                                stroke='currentColor'
                                viewBox='0 0 24 24'
                                fill='none'
                                className='mr-1 h-4 w-4'
                                xmlns='http://www.w3.org/2000/svg'>
                                <path
                                    d='M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4'
                                    strokeWidth='2'
                                    strokeLinejoin='round'
                                    strokeLinecap='round'></path>
                            </svg>
                            Download
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServiceCard;
