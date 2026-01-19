// todo: add more content

const content = {
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
            line2: "umjetnost kodiranja",
            line3: "Pretvorimo vašu ideju u remek-djelo.",
            subtitle:
                "Front-end / web developerka & profesorica književnosti i umjetnosti. Izrađujem besprijekorne web-stranice, estetski univerzalno privlačne, a istovremeno autentične i vjerne brandu. Želite zasjati u novom digitalnom izdanju?",
            cta: "Stvorimo nešto posebno!",
        },
        about: {
            title: "Od petica do nula i jedinica",
            p1: "Profesorica književnosti sada piše kod i pretvara apstraktne ideje u funkcionalnu digitalnu stvarnost... Je li to Breaking good? No kako god, ako tražite besprijekorna web rješenja koja su visokofunkcionalna, estetski izvanredna, a pritom ostaju vjerna vašoj autentičnoj priči.",
            p2: "Moja pozadina u edukaciji naučila me metodičnosti, vođenju timova i snalaženju u stresnim situacijama (vjerujte, server koji padne nije ništa naspram razreda tinejdžera petkom poslijepodne). Danas te vještine koristim kako bih gradila robusne, skalabilne i vizualno promišljene web aplikacije. Ne pišem samo kod; kreiram jedinstvena iskustva.",
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
                    url: "https://marina-majden.github.io/litart",
                },
                {
                    title: "Art Gallery E-commerce",
                    desc: "Digitalna galerija s integriranim plaćanjem.",
                    stack: ["Next.js", "Stripe", "Tailwind"],
                    full: "Web shop za prodaju digitalnih umjetnina.",
                    url: "https://oldschool-chatroom.netlify.app",
                },
                {
                    title: "Naslov",
                    desc: "Optimizacija timskog rada.",
                    stack: ["Vue.js", "Firebase", "Pinia"],
                    full: "Alat za praćenje zadataka u realnom vremenu.",
                    url: "https://need-advice.netlify.app",
                },
                {
                    title: "Portfolio za Arhitekte",
                    desc: "Minimalistički dizajn s fokusom na vizuale.",
                    stack: ["React", "GSAP", "Sass"],
                    full: "Visoko estetski portfolio.",
                    url: "https://bozicna.netlify.app",
                },
                {
                    title: "Crisis Response Dashboard",
                    desc: "Vizualizacija podataka u realnom vremenu.",
                    stack: ["D3.js", "Python", "React"],
                    full: "Dashboard za praćenje hitnih intervencija.",
                    url: "https://majden.com",
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
                },
                {
                    title: "Project Rescue",
                    desc: "Have code that isn't working as it should? My didactic patience comes into play here – bug detection and performance optimization.",
                },
                {
                    title: "Methodical Design Approach",
                    desc: "Web experiences that are intuitive for users, pleasing to the eye, and logical in the background.",
                },
            ],
        },
        projects: {
            title: "Projects",
            viewProject: "View Project",
            items: [
                {
                    title: "E-Learning Platform",
                    desc: "Increased user engagement by 40% through intuitive UI.",
                    stack: ["React", "Node.js", "MongoDB"],
                    full: "Interactive language learning platform.",
                    url: "https://marina-majden.github.io/litart",
                },
                {
                    title: "Art Gallery E-commerce",
                    desc: "Digital gallery with payment integration.",
                    stack: ["Next.js", "Stripe", "Tailwind"],
                    full: "Web shop for digital art sales.",
                    url: "https://oldschool-chatroom.netlify.app",
                },
                {
                    title: "Task Manager App",
                    desc: "Team workflow optimization.",
                    stack: ["Vue.js", "Firebase", "Pinia"],
                    full: "Real-time task tracking tool.",
                    url: "https://need-advice.netlify.app",
                },
                {
                    title: "Architect Portfolio",
                    desc: "Minimalist design focused on visuals.",
                    stack: ["React", "GSAP", "Sass"],
                    full: "High-aesthetic portfolio.",
                    url: "https://bozicna.netlify.app",
                },
                {
                    title: "Crisis Response Dashboard",
                    desc: "Real-time data visualization.",
                    stack: ["D3.js", "Python", "React"],
                    full: "Emergency intervention tracking dashboard.",
                    url: "https://majden.com",
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

const contextVariations = {
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

const visualContextVariations = {
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
