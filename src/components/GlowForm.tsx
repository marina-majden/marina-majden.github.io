import React from "react";
import { SendIcon } from "lucide-react";

const GlowForm = () => {
    return (
        <div className='max-w-3xl mx-auto my-4 py-8 relative  z-10 bg-background/50 p-8 rounded-lg before:w-32 before:h-32 before:absolute before:bg-purple-600 before:rounded-full before:left-6 before:top-92 before:-z-10 before:blur-2xl before:animate-neon-glow after:w-46 after:h-46 after:absolute after:bg-sky-400 after:rounded-full after:-z-10 after:blur-xl after:top-28 after:-right-12 after:animate-cruising overflow-visible'>
            <h2 className='text-2xl font-heading mb-6 text-gradient'>
                Pošaljite upit ili poruku
            </h2>
            <form method='post' action='#'>
                <div className='flex col md:row gap-4'>
                    <div className='mb-4 w-full'>
                        <label
                            className='block text-sm text-left font-medium text-cyan-400 transition-colors uppercase tracking-widest '
                            htmlFor='name'>
                            Ime i prezime
                        </label>
                        <input
                            className='mt-1 p-2 w-full bg-background/50 border border-dynamic-cyan rounded-md text-gray-300'
                            type='text'
                            placeholder='Ivo Ivić'
                            required
                        />
                    </div>
                    <div className='mb-4 w-full'>
                        <label
                            className='block text-sm text-left font-medium text-cyan-400 transition-colors uppercase tracking-widest '
                            htmlFor='email'>
                            E-mail adresa
                        </label>
                        <input
                            className='mt-1 p-2 w-full bg-background/50 border border-dynamic-cyan rounded-md text-gray-300'
                            name='email'
                            id='email'
                            type='email'
                            placeholder='ivo.ivic@domena.hr'
                            required
                        />
                    </div>
                </div>
                <div className='mb-4'>
                    <label
                        className='block text-sm text-left font-medium text-cyan-400  uppercase tracking-widest '
                        htmlFor='bio'>
                        Tekst poruke
                    </label>
                    <textarea
                        className='mt-1 p-2 w-full text-left bg-background/50 border border-dynamic-cyan rounded-md text-gray-300'
                        rows={4}
                        name='bio'
                        id='bio'
                        placeholder='Ovdje upišite svoju poruku.'
                        required
                    />
                </div>
                <div className='mb-4'>
                    <label
                        htmlFor='hr'
                        className='flex flex-row items-center gap-2.5 font-light text-sm text-left text-gray-300'>
                        <input
                            id='hr'
                            type='checkbox'
                            className='peer hidden'
                        />
                        <div className='h-4 w-4 flex rounded-xs border border-dynamic-cyan bg-gray-900 peer-checked:bg-[#9052f3] transition-colors duration-200'>
                            <div className='h-3 w-3 m-auto rounded-full peer-checked:bg-[#9052f3] '></div>
                        </div>
                        Slažem se s uvjetima.
                    </label>
                </div>
                <div className='flex items-center justify-end'>
                    <button
                        className='w-fit text-sm text-center bg-linear-to-r from-purple-600 via-purple-400 to-cyan-600 text-white px-4 py-2 font-bold rounded-md opacity-50 hover:opacity-80 transition-opacity duration-300 mx-auto'
                        type='submit'>
                        <SendIcon className='inline mr-2' />
                        Pošalji poruku
                    </button>
                </div>
            </form>
        </div>
    );
};

export default GlowForm;
