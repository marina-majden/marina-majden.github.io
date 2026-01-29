// Define types for better type safety
interface NavItem {
    [key: string]: string;
    home: string;
    about: string;
    skills: string;
    services: string;
    projects: string;
    lab: string;
    litart: string;
    contact: string;
}

interface HeroSection {
    line1: string;
    line2: string;
    line3: string;
    subtitle: string;
    cta: string;
}

interface SoftSkill {
    title: string;
    desc: string;
}

interface ServiceItem {
    title: string;
    desc: string;
    imgUrl: string;
    imgClass: string;
}

interface ProjectItem {
    title: string;
    desc: string;
    stack: string[];
    full: string;
    url: string;
    urlShowcase: string;
}

interface ContentSection {
    nav: NavItem;
    hero: HeroSection;
    about: { title: string; p1: string; p2: string };
    skills: {
        title: string;
        hard: string;
        soft: string;
        softList: SoftSkill[];
    };
    services: { title: string; list: ServiceItem[] };
    projects: { title: string; viewProject: string; items: ProjectItem[] };
    contact: {
        title: string;
        instruction: string;
        text: string;
        cta: string;
        sender: string;
        email: string;
        message: string;
        agree: string;
    };
    footer: { copyright: string };
    litart: {
        title: string;
        subtitle: string;
        desc: string;
        back: string;
        contextTitle: string;
        contextDesc: string;
        visualTitle: string;
        visualDesc: string;
        nextBtn: string;
        nextVisualBtn: string;
    };
}
interface ContentData {
    hr: ContentSection;
    en: ContentSection;
}

interface ContextVariation {
    word: string;
    before: string;
    after: string;
    source: string;
    colorClass: string;
    btnClass: string;
    tone: string;
}

interface VisualVariation {
    motif: string;
    style: string;
    desc: string;
    img: string;
    colorClass: string;
    btnClass: string;
    tone: string;
}

const content: ContentData = {
    hr: {
        nav: {
            home: "Početna",
            about: "O meni",
            skills: "Vještine",
            services: "Usluge",
            projects: "Projekti",
            lab: "Lab",
            litart: "Art",
            contact: "Kontakt",
        },
        hero: {
            line1: "@marina.majdenic",
            line2: "umjetnost radi umjetnosti",
            line3: "a tehnologija da pretvori naše ideje u prava remek-djela!",
            subtitle: "",
            cta: "Stvorimo nešto posebno!",
        },
        about: {
            title: "",
            p1: "Prisutnost na mreži neophodna je ako želite da javnost ima povjerenja u Vaš posao, stoga gradimo čvrstu i stabilnu arhitekturu Vašeg digitalnog prostora.",
            p2: "Tamo ćemo izgraditi Vaš vizualni identitet, ispričati Vašu priču i oslikati viziju Vašeg brenda, temeljenu na promišljenoj i funkcionalnoj estetici koja nikoga neće ostaviti ravnodušnim. Kreiranje digitalnog sadržaja i autentičnih mrežnih iskustava koje svatko razumije, a nitko ne zaboravlja. ",
        },
        skills: {
            title: "Vještine",
            hard: "Hard Core (Tehnologije)",
            soft: "Human Core (Meke vještine)",
            softList: [
                {
                    title: "Dizajn & Estetika",
                    desc: "Primjena teorije dizajna i UX/UI principa",
                },
                {
                    title: "Komunikacija",
                    desc: "Jasna dokumentacija i artikulirana suradnja.",
                },
                {
                    title: "Crisis Management",
                    desc: "Brzo donošenje odluka pod pritiskom i rješavanje konflikata.",
                },
            ],
        },
        services: {
            title: "Usluge",
            list: [
                {
                    title: "Trebate ideju, ideju i izvedbu?",
                    desc: "Cijeli paket, od praznog platna do 'live' statusa. Dizajn, arhitektura, kodiranje i postavljanje na server.",
                    imgUrl: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1000&auto=format&fit=crop",
                    imgClass:
                        "w-full h-full object-cover transition-transform duration-500 group-hover:scale-110",
                },
                {
                    title: "Trebate sadržaj koji će biti popularan na tražilicama?",
                    desc: "Tekst i slike potrebno je optimizirati kako bi bili prepoznatljiv u nepreglednom svijetu digitalnog sadržaja.",
                    imgUrl: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1000&auto=format&fit=crop",
                    imgClass:
                        "w-full h-full object-cover transition-transform duration-500 group-hover:scale-110",
                },
                {
                    title: "Postavljanje stranice na mrežu i održavanje",
                    desc: "Kako bi izrađena stranica 'oživjela' i bila dostupna svima online, potrebno je postaviti ju na odgovarajući hosting servis. Nakon toga potrebno je održavati stranicu kako bi ostala ispravna i sigurna.",
                    imgUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop",
                    imgClass:
                        "w-full h-full object-cover opacity-50 transition-transform duration-500 group-hover:scale-110",
                },
            ],
        },
        projects: {
            title: "Projekti",
            viewProject: "Pogledaj projekt",
            items: [
                {
                    title: "Lit Art",
                    desc: "Digitalne lekcije povećat ćemo interes i produbiti znanje!",
                    stack: ["React", "Node.js", "MongoDB"],
                    full: "Interaktivna platforma za upoznavanje i učenje umjetnosti i književnosti.",
                    url: "showcase",
                    urlShowcase: "/showcase/lit-art",
                },
                {
                    title: "Need Help",
                    desc: "Platforma koja omogućuje anonimno postavljanje pitanja i stručan, topao, ljudski odgovor s empatijom.",
                    stack: ["Next.js", "Stripe", "Tailwind"],
                    full: "Kada nam AI daje odgovore na sva pitanja i pritom potrvđuje svaku našu pomisao Ovdje nastupa Need Help – digitalna platforma koja omogućuje anonimno postavljanje pitanja i stručan, topao, ljudski odgovor s empatijom.",
                    url: "https://need-help.netlify.app",
                    urlShowcase: "/showcase/need-help",
                },
                {
                    title: "Kako su Anđa i Roko spasili Božić",
                    desc: "Personalizirana i unikatna digitalna slikovnica za djecu izrađena prema dva prava djeteta",
                    stack: [
                        "React",
                        "Adobe Firefly",
                        "Vite",
                        "Gemini",
                        "TailwindCSS",
                        "Web Speech API",
                    ],
                    full: "Interaktivna digitalna slikovnica s generativnom umjetnošću i glasovnim pripovijedanjem. Glavni likovi i lokacije izrađeni su prema stvarnim osobama i mjestima, a radnja je temeljena na osobitostima likova i njihovih života kako bi bila personalizirana i unikatna baš kao i oni.",
                    url: "https://christmas-storybook.netlify.app",
                    urlShowcase: "/showcase/storybook",
                },
                {
                    title: "Unplugged App",
                    desc: "Društvena anti-mreža za one koji žele živjeti u stvarnom životu.",
                    stack: ["React", "react Router v7", "TailwindCSS"],
                    full: "Ovo nije samo platforma ili aplikacija, ovo je projekt koji nastoji promicati svjesno isključivanje iz digitalnog svijeta i ponovno povezivanje s realnošću.",
                    url: "https://unplugged.netlify.app",
                    urlShowcase: "/showcase/unplugged",
                },
                {
                    title: "SongFinder App",
                    desc: "Pretraživanje i otkrivanje pjesama tražilicom uz mogućnost preslušavanja glazbe.",
                    stack: ["HTML5", "CSS3", "Vanilla JavaScript", "iTunesAPI"],
                    full: "Jedan od mojih prvih projekata koji sam izradila samostalno kako bih uvježbala asinkrono dohvaćanje podataka iz vanjskog API-ja u JSON formatu i manipulaciju DOM-om bez korištenja frameworka. Aplikacija ima implementiranu logiku za reprodukciju glazbe (barem copyrightom dopuštenih 30 sekundi svake pjesme) te prikazuje i naslovnicu albuma, ime izvođača i naziv pjesme.",
                    url: "https://marina-majden.github.io/song-finder/",
                    urlShowcase: "/showcase/songfinder",
                },
            ],
        },
        contact: {
            title: "Kontakt",
            instruction: "Imate ideju? Prenesimo Vašu priču u stvarnost.",
            text: "Bilo da tražite pojačanje Vašeg tima ili trebate nekoga tko će vašu viziju pretvoriti u pomno osmišljeno web rješenje – tu sam. Radit ćemo dok ne pretvorimo sav kofein u kod.",
            cta: "Pošalji poruku",
            sender: "Ime i prezime",
            email: "E-mail adresa",
            message: "Tekst poruke",
            agree: "Pristajem da se moji podaci koriste u svrhe kontaktiranja.",
        },
        footer: {
            copyright: "Sva prava zadržana.",
        },
        litart: {
            title: "umjetnost riječi!",
            subtitle: "Tamo gdje se riječi susreću s kodom...",
            desc: "Ovo je eksperimentalni prostor gdje istražujem granice digitalne poezije i generativne umjetnosti.",
            back: "Povratak na portfolio",
            contextTitle: "Kontekst je sve!",
            contextDesc:
                "Istražite kako se značenje mijenja promjenom okruženja.",
            visualTitle: "Percepcija je stvarnost (slika)",
            visualDesc:
                "Isti motiv, različite vizije. Kako stil definira emociju.",
            nextBtn: "Promijeni kontekst",
            nextVisualBtn: "Promijeni stil",
        },
    },
    en: {
        nav: {
            home: "Home",
            about: "About",
            skills: "Skills",
            services: "Services",
            projects: "Projects",
            lab: "Lab",
            litart: "ARToteka",
            contact: "Contact",
        },
        hero: {
            line1: "The Art of Coding;",
            line2: "Sculpting your ideas",
            line3: "into masterpieces.",
            subtitle:
                "A full-stack developer with artistic tendencies and a background in education. Delivering flawless web solutions with general appeal, while stay true to your authentic story.",
            cta: "Let’s create something together",
        },
        about: {
            title: "From Straight A's to Zeros and Ones",
            p1: "You might wonder what a Literature and Art History professor is doing in a terminal. The answer is simple: creating structure and beauty. I’ve dedicated the last three years to translating abstract ideas into functional code.",
            p2: "My background in education taught me methodical thinking, team leadership, and how to navigate high-stress situations (believe me, a server crash is nothing compared to a classroom full of teenagers on a Friday afternoon). Today, I use those skills to build robust, scalable, and visually thoughtful web applications. I don’t just write code; I create unique experiences.",
        },
        skills: {
            title: "You need Breadth to reach Depth",
            hard: "Hard Core (Tech)",
            soft: "Human Core (Soft Skills)",
            softList: [
                {
                    title: "Design & Aesthetics",
                    desc: "Applied Design Theory and UX/UI principles (Thanks to Art History!)",
                },
                {
                    title: "Communication",
                    desc: "Clear documentation and articulate collaboration.",
                },
                {
                    title: "Crisis Management",
                    desc: "Rapid decision-making under pressure and conflict resolution.",
                },
            ],
        },
        services: {
            title: "Smooth communication, refined design, and sound logic!",
            list: [
                {
                    title: "End-to-End Development",
                    desc: "From a blank canvas to live status. Design, architecture, coding, and deployment.",
                    imgUrl: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1000&auto=format&fit=crop",
                    imgClass:
                        "w-full h-full object-cover transition-transform duration-500 group-hover:scale-110",
                },
                {
                    title: "Project Rescue",
                    desc: "Have code that isn't working as it should? My didactic patience comes into play here – bug detection and performance optimization.",
                    imgUrl: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1000&auto=format&fit=crop",
                    imgClass:
                        "w-full h-full object-cover transition-transform duration-500 group-hover:scale-110",
                },
                {
                    title: "Methodical Design Approach",
                    desc: "Web experiences that are intuitive for users, pleasing to the eye, and logical in the background.",
                    imgUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop",
                    imgClass:
                        "w-full h-full object-cover opacity-50 transition-transform duration-500 group-hover:scale-110",
                },
            ],
        },
        projects: {
            title: "Projects",
            viewProject: "View Project",
            items: [
                {
                    title: "Lit Art",
                    desc: "Increased user engagement by 40% through intuitive UI.",
                    stack: ["React", "Node.js", "MongoDB"],
                    full: "Interactive language learning platform.",
                    url: "https://marina-majden.github.io/litart",
                    urlShowcase: "/showcase/lit-art",
                },
                {
                    title: "Need Help",
                    desc: "A platform enabling anonymous question-asking and receiving warm, empathetic, human responses from experts.",
                    stack: ["Next.js", "Stripe", "Tailwind"],
                    full: "When AI provides answers to all questions while affirming every thought and applauding every statement, we must question how good its advice really is and how useful it is when we have real-life problems, not mathematical equations. This is where Need Help comes in – a digital platform that enables anonymous question-asking and receiving warm, empathetic, human responses from experts.",
                    url: "https://need-help.netlify.app",
                    urlShowcase: "/showcase/need-help",
                },
                {
                    title: "Anđa and Roko Save Christmas",
                    desc: "Personalized and unique digital storybook for children created based on two real kids",
                    stack: [
                        "React",
                        "Adobe Firefly",
                        "Vite",
                        "Gemini",
                        "TailwindCSS",
                        "Web Speech API",
                    ],
                    full: "Interactive digital storybook with generative art and voice narration. The main characters and locations are created based on real people and places, and the plot is based on the characteristics of the characters and their lives to make it as personalized and unique as they are. A great and emotional gift that leaves no one indifferent! The storybook can be printed, and in digital form, it is available online and locally. Responsiveness allows reading on all devices. Check out the storybook and see more details on the page, where you can also order your own storybook!",
                    url: "https://christmas-storybook.netlify.app",
                    urlShowcase: "/showcase/storybook",
                },
                {
                    title: "Unplugged App",
                    desc: "Social anti-network for those who want to live in real life.",
                    stack: ["React", "React Router v7", "TailwindCSS"],
                    full: "This is not just a platform or application; it is a project that aims to promote conscious disconnection from the digital world and reconnection with reality.",
                    url: "https://unplugged.netlify.app",
                    urlShowcase: "/showcase/unplugged",
                },
                {
                    title: "SongFinder App",
                    desc: "App for browsing and discovering songs by lyrics snippets.",
                    stack: ["HTML5", "CSS3", "Vanilla JavaScript", "iTunesAPI"],
                    full: "One of my first solo projects to practice asynchronous data fetching from an external API in JSON format and DOM manipulation without a framework. The app includes music playback logic (at least the copyright-permitted 30 seconds of each song) and displays album cover art, artist name, and song title.",
                    url: "https://marina-majden.github.io/song-finder/",
                    urlShowcase: "/showcase/songfinder",
                },
            ],
        },
        contact: {
            title: "Contact",
            instruction: "Have an idea? Let's turn the story into reality.",
            text: "Whether you are looking for reinforcements for your dev team or need someone to turn your vision into digital reality – I am here. Get in touch, and let's turn caffeine into code.",
            sender: "First and Last Name",
            email: "E-mail Address",
            message: "Your Message",
            cta: "Send Message",

            agree: "I agree to have my data used for contact purposes.",
        },
        footer: {
            copyright: "All rights reserved.",
        },
        litart: {
            title: "Lit Art Project",
            subtitle: "Where words meet pixels.",
            desc: "This is an experimental space where I explore the boundaries of digital poetry and generative art.",
            back: "Back to Portfolio",
            contextTitle: "Context is King (Word)",
            contextDesc:
                "Explore how meaning shifts by changing the environment.",
            visualTitle: "Perception is Reality (Image)",
            visualDesc:
                "Same motif, different visions. How style defines emotion.",
            nextBtn: "Shift Context",
            nextVisualBtn: "Shift Style",
        },
    },
};

const contextVariations: Record<string, ContextVariation[]> = {
    hr: [
        {
            word: "Ruka",
            before: "Boli me desna",
            after: "cijeli dan!",
            source: "Doslovno značenje",
            colorClass: "bg-gray-900/30 border-gray-800 text-gray-200",
            btnClass: "hover:bg-gray-500/50 border-gray-500 text-gray-900",
            tone: "Neutralno",
        },
        {
            word: "Ruka",
            before: "Njegova je",
            after: "bila topla i sigurna, utočište u oluji.",
            source: "Ljubavna lirika",
            colorClass: "bg-pink-900/30 border-pink-500 text-pink-200",
            btnClass: "hover:bg-pink-500 border-pink-500 text-pink-400",
            tone: "Nježnost",
        },
        {
            word: "Ruka",
            before: "Hladna",
            after: "pravde stići će svakoga tko se ogriješio.",
            source: "Epska poezija",
            colorClass: "bg-blue-900/30 border-blue-500 text-blue-200",
            btnClass: "hover:bg-blue-500 border-blue-500 text-blue-400",
            tone: "Pravda",
        },
        {
            word: "Ruka",
            before: "Drhtava",
            after: "starca posegnula je za korom suhog kruha.",
            source: "Socijalni realizam",
            colorClass: "bg-amber-900/30 border-amber-500 text-amber-200",
            btnClass: "hover:bg-amber-500 border-amber-500 text-amber-400",
            tone: "Patnja",
        },
        {
            word: "Ruka",
            before: "Blijeda",
            after: "je beživotno pala niz rub kreveta.",
            source: "Naturalizam",
            colorClass: "bg-slate-800 border-slate-500 text-slate-300",
            btnClass: "hover:bg-slate-500 border-slate-500 text-slate-400",
            tone: "Kraj",
        },
    ],
    en: [
        {
            word: "Hlad",
            before: "My right",
            after: "hurts all day!",
            source: "Literal meaning",
            colorClass: "bg-gray-900/30 border-gray-800 text-gray-200",
            btnClass: "hover:bg-gray-500/50 border-gray-500 text-gray-900",
            tone: "Neutral",
        },
        {
            word: "Hand",
            before: "His",
            after: "was warm and safe, a shelter in the storm.",
            source: "Romantic Lyric",
            colorClass: "bg-pink-900/30 border-pink-500 text-pink-200",
            btnClass: "hover:bg-pink-500 border-pink-500 text-pink-400",
            tone: "Tenderness",
        },
        {
            word: "Hand",
            before: "The cold",
            after: "of justice will reach anyone who has sinned.",
            source: "Epic Poetry",
            colorClass: "bg-blue-900/30 border-blue-500 text-blue-200",
            btnClass: "hover:bg-blue-500 border-blue-500 text-blue-400",
            tone: "Justice",
        },
        {
            word: "Hand",
            before: "The trembling",
            after: "of the old man reached for the dry crust of bread.",
            source: "Social Realism",
            colorClass: "bg-amber-900/30 border-amber-500 text-amber-200",
            btnClass: "hover:bg-amber-500 border-amber-500 text-amber-400",
            tone: "Suffering",
        },
        {
            word: "Hand",
            before: "The pale",
            after: "dropped lifelessly down the side of the bed.",
            source: "Naturalism",
            colorClass: "bg-slate-800 border-slate-500 text-slate-300",
            btnClass: "hover:bg-slate-500 border-slate-500 text-slate-400",
            tone: "The End",
        },
    ],
};

const visualContextVariations: Record<string, VisualVariation[]> = {
    hr: [
        {
            motif: "Motiv",
            style: "Klasični Realizam",
            desc: "Vjerna reprezentacija stvarnosti. Svjetlo i sjena (chiaroscuro) grade volumen. Emocija je suzdržana, fokus je na vještini i promatranju.",
            img: "/api/placeholder/500/500",
            colorClass: "bg-stone-900/40 border-amber-600/50 text-amber-100",
            btnClass: "hover:bg-amber-700 border-amber-600 text-amber-500",
            tone: "Objektivnost",
        },
        {
            motif: "Motiv",
            style: "Ekspresionizam",
            desc: "Stvarnost je iskrivljena kako bi se izrazila unutarnja emocija. Boje su jarke, potezi kista agresivni. Nije bitno što vidimo, već što osjećamo.",
            img: "/api/placeholder/500/500",
            colorClass: "bg-orange-900/30 border-orange-500 text-orange-200",
            btnClass: "hover:bg-orange-600 border-orange-500 text-orange-500",
            tone: "Krik",
        },
        {
            motif: "Motiv",
            style: "Cyber / Glitch Art",
            desc: "Digitalna dekonstrukcija. Pikseli, šum i neonske boje. Tradicionalni motiv postaje podatak izgubljen u prijenosu. Ljepota je u grešci.",
            img: "/api/placeholder/500/500",
            colorClass: "bg-cyan-900/30 border-cyan-400 text-cyan-200",
            btnClass: "hover:bg-cyan-500 border-cyan-400 text-cyan-400",
            tone: "Sintetičko",
        },
    ],
    en: [
        {
            motif: "Motif",
            style: "Classical Realism",
            desc: "Faithful representation of reality. Light and shadow (chiaroscuro) build volume. Emotion is restrained, focus is on skill and observation.",
            img: "/api/placeholder/500/500",
            colorClass: "bg-stone-900/40 border-amber-600/50 text-amber-100",
            btnClass: "hover:bg-amber-700 border-amber-600 text-amber-500",
            tone: "Objectivity",
        },
        {
            motif: "Motif",
            style: "Expressionism",
            desc: "Reality distorted to express inner emotion. Colors are vivid, brushstrokes aggressive. It matters not what we see, but what we feel.",
            img: "/api/placeholder/500/500",
            colorClass: "bg-orange-900/30 border-orange-500 text-orange-200",
            btnClass: "hover:bg-orange-600 border-orange-500 text-orange-500",
            tone: "The Scream",
        },
        {
            motif: "Motif",
            style: "Cyber / Glitch Art",
            desc: "Digital deconstruction. Pixels, noise, and neon colors. The traditional motif becomes data lost in transmission. Beauty is found in the error.",
            img: "/api/placeholder/500/500",
            colorClass: "bg-cyan-900/30 border-cyan-400 text-cyan-200",
            btnClass: "hover:bg-cyan-500 border-cyan-400 text-cyan-400",
            tone: "Synthetic",
        },
    ],
};

export { content, contextVariations, visualContextVariations };
export type { ContentData, ContentSection, ContextVariation, VisualVariation };
