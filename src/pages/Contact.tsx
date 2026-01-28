import React, { FormEvent, ChangeEvent } from "react";
import Reveal from "../components/Reveal";
import SectionTitle from "../components/SectionTitle";
import ReflectionIcons from "../components/ReflectionIcons";
import { SendIcon } from "lucide-react";

interface ContactContent {
    title: string;
    text: string;
    instruction: string;
    sender: string;
    email: string;
    message: string;
    agree: string;
    cta: string;
}

interface ContactProps {
    t: {
        contact: ContactContent;
    };
}

const Contact: React.FC<ContactProps> = ({ t }) => {
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Handle form submission logic here
    };

    const handleInputChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        // Handle input changes here
    };

    return (
        <section id='contact' className='py-24 relative overflow-hidden'>
            <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-linear-to-b-to-r from-purple-900/20 to-cyan-900/20 rounded-full blur-[120px] -z-10 before:animate-pulse after:animate-pulse'></div>

            <div className='container w-full px-1 md:px-6 mx-auto text-center'>
                <Reveal>
                    <SectionTitle>{t.contact.title}</SectionTitle>
                    <p className='text-xl text-slate-300 mb-12'>
                        {t.contact.text}
                    </p>
                    <div className='max-w-3xl mx-auto my-4 py-8 relative z-10 bg-background/50 p-8 rounded-lg before:w-32 before:h-32 before:absolute before:bg-purple-600 before:rounded-full before:left-6 before:top-92 before:-z-10 before:blur-2xl before:animate-neon-glow after:w-46 after:h-46 after:absolute after:bg-sky-400 after:rounded-full after:-z-10 after:blur-xl after:top-28 after:-right-12 after:animate-cruising overflow-visible'>
                        <h2 className='text-2xl font-heading mb-6 text-gradient'>
                            {t.contact.instruction}
                        </h2>
                        <form method='post' action='#' onSubmit={handleSubmit}>
                            <div className='flex col md:row gap-4'>
                                <div className='mb-4 w-full'>
                                    <label
                                        className='block text-sm text-left font-medium text-cyan-400 transition-colors uppercase tracking-widest'
                                        htmlFor='name'>
                                        {t.contact.sender}
                                    </label>
                                    <input
                                        className='mt-1 p-2 w-full bg-background/50 border border-dynamic-cyan rounded-md text-gray-300'
                                        type='text'
                                        id='name'
                                        placeholder='Person Personic'
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className='mb-4 w-full'>
                                    <label
                                        className='block text-sm text-left font-medium text-cyan-400 transition-colors uppercase tracking-widest'
                                        htmlFor='email'>
                                        {t.contact.email}
                                    </label>
                                    <input
                                        className='mt-1 p-2 w-full bg-background/50 border border-dynamic-cyan rounded-md text-gray-300'
                                        name='email'
                                        id='email'
                                        type='email'
                                        placeholder='person.personic@something.com'
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className='mb-4'>
                                <label
                                    className='block text-sm text-left font-medium text-cyan-400 uppercase tracking-widest'
                                    htmlFor='message'>
                                    {t.contact.message}
                                </label>
                                <textarea
                                    className='mt-1 p-2 w-full text-left bg-background/50 border border-dynamic-cyan rounded-md text-gray-300'
                                    rows={4}
                                    name='message'
                                    id='message'
                                    placeholder='Ovdje upišite svoju poruku.'
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className='mb-4'>
                                <label
                                    htmlFor='agree'
                                    className='flex flex-row items-center gap-2.5 font-light text-sm text-left text-gray-300'>
                                    <input
                                        id='agree'
                                        type='checkbox'
                                        className='peer hidden'
                                        onChange={handleInputChange}
                                    />
                                    <div className='h-4 w-4 flex rounded-xs border border-dynamic-cyan bg-gray-900 peer-checked:bg-[#9052f3] transition-colors duration-200'>
                                        <div className='h-3 w-3 m-auto rounded-full peer-checked:bg-[#9052f3]'></div>
                                    </div>
                                    {t.contact.agree}
                                </label>
                            </div>
                            <div className='flex items-center justify-end'>
                                <button
                                    className='w-fit text-sm text-center bg-linear-to-r from-purple-600 via-purple-400 to-cyan-600 text-white px-4 py-2 font-bold rounded-md opacity-50 hover:opacity-80 transition-opacity duration-300 mx-auto'
                                    type='submit'>
                                    <SendIcon className='inline mr-2' size={16} />
                                    {t.contact.cta}
                                </button>
                            </div>
                        </form>
                    </div>
                </Reveal>

                <Reveal delay={400}>
                    <ReflectionIcons />
                </Reveal>
            </div>
        </section>
    );
};

export default Contact;