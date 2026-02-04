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
            lab: "Laboratorij",
            litart: "LitArt",
            contact: "Kontakt",
        },
        hero: {
            line1: "kod sa stilom",
            line2: "dizajn s pričom",
            line3: "vizualni jezik koji svatko razumije",
            subtitle:
                "Svatko treba imati svoj digitalni prostor u kojemu će predstaviti sebe, svoj rad i svoju viziju. Moj je zadatak izraditi taj prostor tako da autentično prenese Vašu priču do željene publike. Trebate li novi dizajn za web-stranicu ili razvoj prema postojećem dizajnu, obratite mi se s povjerenjem.",
            cta: "Stvorimo nešto posebno!",
        },
        about: {
            title: "Misija",
            p1: "U vremenu u kojemu se neprestano vodi bitka za našu pažnju moramo mudro djelovati na mreži. Vaša web-stranica jedinstveni je prostor koji možete ustrojiti i ispuniti u potpunosti slobodno, gotovo bez ograničenja. Taj potencijal mudro je iskoristiti za ostvarenje kvalitetne, intimnije i preciznije komunikacije s postojećim i novim klijentima.  ",
            p2: "Bez obzira na to imate li već razvijenu ideju i vizualni identite ili još o tome niste razmišljali, moj je cilj izraditi web-stranicu koja će dostojno predstaviti Vaš posao i dosljedno ispričati Vašu priču, a pritom i impresionirati posjetitelje estetski promišljenim dizajnom i besprijekornom funkcionalnošću.",
        },
        skills: {
            title: "Vještine",
            hard: "Tehnologije",
            soft: "Šire vještine",
            softList: [
                {
                    title: "Stvaranje sadržaja",
                    desc: "Profesorica sam hrvatskog jezika i književnosti te umjetnosti i rado ću pomoći s izradom tekstualnog i vizualnog sadržaja za Vašu stranicu.",
                },
                {
                    title: "Marketinška strategija",
                    desc: "Iskustvo u digitalnom marketingu i SEO optimizaciji za tražilice važno je kako bi Vaša stranica bila vidljivija i privlačnija ciljanoj publici.",
                },
                {
                    title: "Personalizirani pristup",
                    desc: "Posebno me raduju projekti koji se odmiču od šablonskih rješenja; možemo potpuno osloboditi kreativnost i stvoriti jedinstven dizajn skrojen samo po Vašoj mjeri!",
                },
            ],
        },
        services: {
            title: "Usluge",
            list: [
                {
                    title: "Razvoj web-stranice",
                    desc: "Ako već imate dizajn i potrebno je pretvoriti ga u funkcionalan kod, ovo je usluga koja vam treba. Uz razvoj, optimizirat ću vašu stranicu kako bi bila brza, responzivna i prilagođena tražilicama.",
                    imgUrl: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1000&auto=format&fit=crop",
                    imgClass:
                        "w-full h-full object-cover transition-transform duration-500 group-hover:scale-110",
                },
                {
                    title: "Dizajn i razvoj web-stranice",
                    desc: "Krećemo od praznog platna? Odlično, ovo je usluga koju trebate. Cijeli paket, od praznog platna do 'live' statusa. Dizajn, arhitektura, kodiranje i postavljanje na server. Ako ste novi u poslu ili želite promijeniti imidž, možemo se upustiti u najkreativniji dio posla; kreiranje unikatnog vizualnog identiteta Vašeg brenda.",
                    imgUrl: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1000&auto=format&fit=crop",
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
                    desc: "Interaktivna digitalna platforma koja približava gradivo književnosti i umjetnosti učenicima, studentima i drugim znatiželjnicima.",
                    stack: [
                        "React",
                        "React Router v7",
                        "Adobe Photoshop",
                        "Wiki Art API",
                    ],
                    full: "Eksperimentalni projekt koji istražuje nove metode online učenja književnosti, umjetnosti i drugih područja. Umjesto pasivnog primanja znanja i linearnog pristupa, interaktivne lekcije potiču korisnika na aktivno sudjelovanje i zahtijevaju kognitivan napor kako bi se naučeno zadržalo, a interdisciplinaran pristup osigurava spontano usvajanje šireg konteksta od same lekcije i razvoj kritičkog mišljenja.",
                    url: "https://lit-art.netlify.app",
                    urlShowcase: "/showcase/lit-art",
                },
                {
                    title: "Need Advice",
                    desc: "Digitalno rješenje fokusirano na osnaživanje zajednice i izravno društveno angažirano djelovanje",
                    stack: [
                        "React",
                        "Router v7",
                        "TailwindCSS",
                        "Netlify",
                        "Firebase",
                    ],
                    full: "Razvoj platforme koja potiče ljudsku interakciju i omogućuje posjetiteljima da anonimno postave pitanje, zatraže savjet i podijele problem bez straha od osuđivanja, a dobronamjerna online zajednica osigurat će promišljeni, empatičan i koristan odgovor na upit.",
                    url: "https://need-advice.netlify.app",
                    urlShowcase: "/showcase/need-advice",
                },

                {
                    title: "Kako su Anđa i Roko spasili Božić",
                    desc: "Personalizirana i unikatna digitalna slikovnica za djecu izrađena prema dva prava djeteta",
                    stack: [
                        "React",
                        "Adobe Firefly",
                        "Vite",
                        "Gemini AI",
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
                    stack: ["React", "React Router v7", "TailwindCSS"],
                    full: "Konceptualni projekt koji nastoji postati mjesto za uspsotavu i osnaživanje malih zajednica koje će potom djelovati u stvarnom svijetu i pomoći nam povezati se uživo i smanjiti štetno suvišno izlaganje društvenim mrežama.",
                    url: "https://unplugged.netlify.app",
                    urlShowcase: "/showcase/unplugged",
                },
                {
                    title: "SongFinder App",
                    desc: "Pretraživanje i otkrivanje pjesama tražilicom uz mogućnost preslušavanja glazbe.",
                    stack: ["HTML5", "CSS3", "Vanilla JavaScript", "iTunesAPI"],
                    full: "Jedan od mojih prvih projekata koji sam izradila kako bih uvježbala asinkrono dohvaćanje podataka iz vanjskog API-ja u JSON formatu i manipulaciju DOM-om bez korištenja frameworka. Aplikacija ima implementiranu logiku za reprodukciju glazbe (onoliko koliko dopušta copyright) te prikazuje i naslovnicu albuma, ime izvođača i naziv pjesme.",
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
            about: "Mission",
            skills: "Skills",
            services: "Services",
            projects: "Projects",
            lab: "Lab",
            litart: "LitArt",
            contact: "Contact",
        },
        hero: {
            line1: "The Art of Coding",
            line2: "Turning thoughts and ideas",
            line3: "into digital masterpieces.",
            subtitle:
                "Everyone needs a digital space to present themselves, their work, and their vision. My job is to create that space to authentically convey your story to your desired audience.",
            cta: "Let's do it",
        },
        about: {
            title: "Mission",
            p1: "In an age where the battle for our attention is constant, we must act wisely online. Your website is a unique space that you can structure and fill completely freely, with almost no limitations. It is important to use that potential wisely to achieve quality, more intimate, and precise communication with existing and new clients.",
            p2: "Regardless of whether you already have a developed idea and visual identity or have not yet thought about it, my goal is to create a website that will worthily represent your business and consistently tell your story, while impressing visitors with aesthetically thoughtful design and flawless functionality.",
        },
        skills: {
            title: "Skills",
            hard: "Hard Core (Tech)",
            soft: "Human Core (Soft Skills)",
            softList: [
                {
                    title: "Content Creation",
                    desc: "As a professor of Croatian language and literature and also Art Historian, I will gladly assist in creating textual and visual content for your website.",
                },
                {
                    title: "Digital Marketing Guidance",
                    desc: "Experience in digital marketing and SEO optimization is crucial to make your website more visible and attractive to your target audience.",
                },
                {
                    title: "Personalized Approach",
                    desc: "I especially enjoy projects that move away from template solutions; we can completely unleash creativity and create a unique design tailored just for you!",
                },
            ],
        },
        services: {
            title: "Services",
            list: [
                {
                    title: "Web Development",
                    desc: "If you already have a design and need to turn it into functional code, this is the service you need. In addition to development, I will optimize your site to be fast, responsive, and search engine friendly.",
                    imgUrl: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1000&auto=format&fit=crop",
                    imgClass:
                        "w-full h-full object-cover transition-transform duration-500 group-hover:scale-110",
                },
                {
                    title: "Web Design & Development",
                    desc: "Starting from a blank canvas? Great, this is the service you need. The whole package, from blank canvas to 'live' status. Design, architecture, coding, and deployment. If you are new to business or want to change your image, we can embark on the most creative part of the job; creating a unique visual identity for your brand.",
                    imgUrl: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1000&auto=format&fit=crop",
                    imgClass:
                        "w-full h-full object-cover transition-transform duration-500 group-hover:scale-110",
                },
                {
                    title: "Website Deployment, Hosting & Maintenance",
                    desc: "I will handle the deployment of your website to a reliable hosting platform, ensuring it is live and accessible. I also provide ongoing maintenance to keep your site secure, up-to-date, and performing optimally.",
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
