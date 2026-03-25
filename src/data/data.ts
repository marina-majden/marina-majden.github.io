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

export interface TemplateItem {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    highlights: {
        purpose: string;
        style: string;
        features: string;
        special?: string;
    };
    videoUrl?: string;
    screenshotHome?: string;
    screenshotDesktop?: string;
    screenshotMobile?: string;
    tags?: string[];
}
interface ServiceModalItem {
    id: string;
    title: string;
    desc: string;
    img: string;
}

interface ContentSection {
    nav: NavItem;
    hero: HeroSection;
    about: { title: string; p1: string; p2: string; p3: string };
    skills: {
        title: string;
        hard: string;
        soft: string;
        softList: SoftSkill[];
    };
    templates: {
        title: string;
        subtitle: string;
        standard: string;
        items: TemplateItem[];
    };
    services: {
        title: string;
        subtitle: string;
        list: ServiceItem[];
        modal: {
            items: ServiceModalItem[];
            btn: string;
            total: string;
        };
    };
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
            line1: "Umjetnost kodiranja",
            line2: "",
            line3: "izrada web-stranica s karakterom i stilom.",
            subtitle:
                "Svatko treba imati svoj digitalni prostor u kojemu će predstaviti sebe, svoj rad i svoju viziju. Moj je zadatak izraditi taj prostor tako da autentično prenese Vašu priču do željene publike. Trebate li novi dizajn za web-stranicu ili razvoj prema postojećem dizajnu, obratite mi se s povjerenjem.",
            cta: "Stvorimo nešto posebno!",
        },
        about: {
            title: "Misija",
            p1: "1. stvarati jedinstven i autentičan digitalni sadržaj",
            p2: "2. prenijeti tisuće vaših priča tekstom i dizajnom",
            p3: "3. promijeniti svijet (stranicu po stranicu!)",
        },
        skills: {
            title: "Vještine",
            hard: "Tehnologije",
            soft: "Ostale vještine",
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
        templates: {
            title: "Web Web-Shop",
            subtitle:
                "Originalni, jedinstveni i gotovi predlošci koje ne možete pronaći nigdje drugdje; čim se jedan kupi, više nije dostupan. Međutim, ako ne želite kupiti predložak, već želite custom web-stranicu inspiriranu nekim od ovih dizajna, slobodno se javite.",
            standard:
                "Može biti web stranica s jednom ili više podstranica, ovisno o potrebama klijenta. Potpuno prilagodljiva za sve uređaje i pristupačna prema WCAG standardima.",
            items: [
                {
                    id: "zen",
                    title: "Zen Dental",
                    subtitle:
                        "Holistička stranica za wellnes dentalnu polikliniku",
                    description:
                        "Duboko umirujući, sofisticirani predložak savršen za stomatološke ordinacije, wellness centre, toplice ili bilo koju premium medicinsku praksu čiji je cilj smanjiti anksioznost klijenata. Dizajn se oslanja na nordijsku wellness estetiku, zamjenjujući kliničku bijelu i plavu toplim tonovima lana, meke kadulje i duboke maslinasto zelene. Odmah uspostavlja povjerenje i spokoj. Vrhunac ovog predloška je interaktivni 3D WebGL element koji suptilno rotira i 'diše' dok korisnik skrola, okupan virtualnim svjetlom. U kombinaciji s taktilnim slojevima šuma i matiranim efektima kartica, stranica djeluje fizički i umirujuće.",
                    highlights: {
                        purpose:
                            "Stomatološke ordinacije, Wellness centri, Toplice, Medicinske prakse",
                        style: "Nordijski Wellness, Taktilni UI, Zemljana paleta",
                        features:
                            "Kartice s mat finišem, Taktilni slojevi šuma, Nježni organski hover efekti",
                        special:
                            "Interaktivni 3D WebGL element koji 'diše' i rotira pri skrolanju",
                    },

                    tags: ["3D", "Minimalizam", "Zen", "Organički"],
                },
                {
                    id: "oasis",
                    title: "Domaći svježi pikseli",
                    subtitle:
                        "Moderno web iskustvo za kafiće, restorane ili juice barove",
                    description:
                        "Izuzetno prozračan i vibrantan predložak dizajniran da uhvati suštinu modernog kafića, artisan kavane ili organskog juice bara. Ovaj predložak uvelike koristi glassmorphic panele (efekt matiranog stakla) koji lebde preko animiranih akvarelnih pozadina. Vizualno iskustvo je osvježavajuće, koristeći meke prirodne zelene, žute i narančaste tonove kako bi evociralo osjećaj proljetne energije. Odličan je izbor za svako poslovanje u ugostiteljskoj industriji koje želi predstaviti čist, organski i moderan imidž.",
                    highlights: {
                        purpose:
                            "Kafići, Artisan kavane, Organski juice barovi, Restorani",
                        style: "Glassmorphism, Prozračno i moderno, Pastelna paleta",
                        features:
                            "Sučelje od matiranog stakla, Ambijentalne tekuće animacije pozadine, Dinamični efekti nagiba slika",
                    },
                    videoUrl: "Oasis.webm",
                    screenshotHome: "VerySpecialConvo-home.png",
                    screenshotDesktop: "oasis-trebaodrezat.png",
                    screenshotMobile: "oasis.png",
                    tags: ["Glassmorphism", "Svijetlo", "Zen", "Organički"],
                },
                {
                    id: "rhythm",
                    title: "U ritmu srca",
                    subtitle:
                        "Spokojna landing stranica za događaje, retreate ili life coacheve",
                    description:
                        "Krojen po mjeri za wellness seminare, yoga retreate, life coacheve ili stručnjake za mentalno zdravlje, ovaj je predložak digitalni ekvivalent dubokog udaha. Utjelovljuje holističke principe koji se prilagođavaju ljudskoj biologiji umjesto algoritamskoj hitnosti. Stranica se odlikuje visoko elegantnom, uredničkom serifnom tipografijom pomiješanom s fluidnim tranzicijama i organskim pozadinskim elementima. Putovanje niz stranicu djeluje kao vođena meditacija, upotpunjena interaktivnim vremenskim okvirom i nježnim biometrijskim vizualnim signalima.",
                    highlights: {
                        purpose:
                            "Wellness seminari, Yoga retreati, Life coachevi, Stručnjaci za mentalno zdravlje",
                        style: "Urednički, Prirodni papir, Fluidni gradijenti",
                        features:
                            "Organske animacije koje 'dišu', Viskozna otkrivanja pri skrolanju, Interaktivna 'bento box' mreža",
                    },
                    videoUrl: "TheRythm.webm",
                    screenshotHome: "VerySpecialConvo-home.png",
                    screenshotDesktop: "sillage.webp",
                    screenshotMobile: "sillage2.webp",
                    tags: ["Svijetlo", "Zen", "Organički"],
                },
                {
                    id: "sillage",
                    title: "Elegancija u Bočici",
                    subtitle:
                        "Vrhunski urednički predložak za luksuzne brendove, kozmetiku i agencije",
                    description:
                        "Ovaj predložak odiše čistim luksuzom. Izgrađen je tako da oponaša fizički osjećaj listanja vrhunskog modnog časopisa ili muzejskog kataloga. Savršen za boutique parfumerije, modne brendove, dizajnere nakita ili ekskluzivne kreativne agencije. Estetika se oslanja na prekrasan prazan prostor, monumentalnu serifnu tipografiju i asimetrične galerijske mreže. Pozadina ima suptilnu teksturu papira, dajući digitalnom prostoru taktilnu, fizičku težinu. Svaki element se pojavljuje s teškim 'uredničkim otkrivanjem', osiguravajući da vaš proizvod bude uokviren kao premium ponuda.",
                    highlights: {
                        purpose:
                            "E-commerce, Parfumerije, Modni brendovi, Dizajneri nakita, Agencije",
                        style: "Magazinski layout, Asimetrično, Inicijali (Drop Caps)",
                        features:
                            "Avangardni urednički layout, Otkrivanja u stilu okretanja stranice, Geometrijsko maskiranje slika",
                    },
                    videoUrl: "Sillage.webm",
                    screenshotHome: "VerySpecialConvo-home.png",
                    screenshotDesktop: "sillage.webp",
                    screenshotMobile: "sillage2.webp",
                    tags: [
                        "E-commerce",
                        "Web-shop",
                        "Svijetlo",
                        "Zen",
                        "Geometrijski",
                    ],
                },
                {
                    id: "skysalon",
                    title: "Betonska Poezija",
                    subtitle:
                        "Atmosferični brutalistički portfolio za arhitektonske i dizajnerske studije",
                    description:
                        "Hrabar, atmosferičan i visoko strukturiran predložak idealan za arhitektonske tvrtke, dizajnere interijera ili vrhunske kreativne studije. Ovaj dizajn spaja 'atmosferični brutalizam' s modernom elegancijom, koristeći sirove boje škriljevca, akcente terakote i prepoznatljivi sloj šuma u stilu filmskog zrna. Izaziva tradicionalne layoute masivnom galerijom za vodoravno skrolanje, predimenzioniranom serifnom tipografijom i brutalističkim hover stanjima kartica. Izgrađen da prekrasno prikaže vizualni rad na jednoj landing stranici, ali dovoljno robustan da se proširi u masivan portfolio.",
                    highlights: {
                        purpose:
                            "Arhitektonske tvrtke, Dizajneri interijera, Kreativni studiji, Portfelji",
                        style: "Atmosferični brutalizam, Filmsko zrno, Prigušeni tonovi",
                        features:
                            "Galerija s vodoravnim skrolanjem, Nativni CSS sloj filmskog zrna, Brutalistički drop-shadow hoveri",
                    },
                    videoUrl: "SkyArchitecture.webm",
                    screenshotHome: "VerySpecialConvo-home.png",
                    screenshotDesktop: "sky-desk.png",
                    screenshotMobile: "sky-mob.webp",
                    tags: [
                        "Portfolio",
                        "Zen",
                        "Minimalizam",
                        "Brutalizam",
                        "Geometrijski",
                    ],
                },
                {
                    id: "polar",
                    title: "Nalet dopamina",
                    subtitle:
                        "Visokoenergetska promo stranica za proizvode i e-commerce",
                    description:
                        "Glasan, beskompromisan, vrlo energičan - ovaj dizajn će sigurno privući pažnju. Moćan alat dizajniran za disruptivne brendove hrane i pića, streetwear izdanja ili visokoenergetske e-commerce proizvode. Sadrži tamnu, brutalističku temu sa šokantnim neonskim akcentima. Dizajn je prepun mikro-interakcija koje zadržavaju pažnju, uključujući vodoravni prikaz proizvoda, kontinuirani pomični tekst, tekstualne glitch efekte i interaktivnu 3D holografsku 'srećku' za promocije.",
                    highlights: {
                        purpose:
                            "Web-shopovi, Disruptivni brendovi, Streetwear izdanja, E-commerce",
                        style: "Šareni brutalizam, Neonski akcenti, 3D teksture",
                        features:
                            "CSS tekstualni glitch efekti, Galerije s drag-to-scroll funkcijom, Kontinuirani marqueei",
                        special:
                            "Interaktivna 3D holografska 'srećka' preslikana na pokrete miša",
                    },
                    videoUrl: "Polar.webm",
                    screenshotHome: "VerySpecialConvo-home.png",
                    screenshotDesktop: "polar-desktop.png",
                    screenshotMobile: "polar.png",
                    tags: [
                        "E-commerce",
                        "Web-shop",
                        "Brutalizam",
                        "3D",
                        "Inovativno",
                        "Geometrijski",
                    ],
                },
                {
                    id: "book",
                    title: "Knjige su uvijek u modi",
                    subtitle:
                        "Avangardna promotivna stranica za autore, knjige ili izložbe",
                    description:
                        "Nevjerojatno jedinstven, konceptualan predložak dizajniran za autora koji predstavlja knjigu, a koji također može biti od velike koristi umjetnicima koji promoviraju izložbu ili thought-leaderima koji nude ekskluzivni sadržaj. Dizajn premošćuje jaz između klasičnog književnog izdavaštva i tamnih, digitalnih sučelja koja podsjećaju na terminale. Sadrži angažirajuće elemente vođene narativom poput interaktivnog kviza 'dijagnostičkog dijagrama toka' za korisnike, visoko stiliziranog autorskog dosjea s ASCII umjetnošću i očaravajuće SVG animacije rukom pisanog potpisa.",
                    highlights: {
                        purpose:
                            "Umjetnici, Autori, Predstavljanje knjiga, Umjetničke izložbe",
                        style: "Hibridni urednički & Terminal UI",
                        features:
                            "Brza mehanička opružna otkrivanja, Kontinuirano iscrtavanje SVG putanja, Stilizirani ASCII dosje",
                        special:
                            "Interaktivni višestepeni dijagnostički kviz u obliku dijagrama toka",
                    },
                    videoUrl: "VerySpecialConvo.webm",
                    screenshotHome: "VerySpecialConvo-home.png",
                    screenshotDesktop: "convo-desktop.webp",
                    screenshotMobile: "convo.webp",
                    tags: [
                        "Portfolio",
                        "Elegantno",
                        "Web-shop",
                        "Geometrijski",
                    ],
                },
                {
                    id: "neonvinyl",
                    title: "Cyberpunk Nostalgija",
                    subtitle:
                        "Retro-futuristička landing stranica za tech proizvode, digitalne platforme ili glazbena izdanja",
                    description:
                        "Zakoračite u neonom okupanu budućnost. Ovaj je predložak vizualna gozba za vrhunske tech proizvode, digitalne platforme, indie studije za igre ili glazbenike koji izdaju nove albume. Estetika je uvelike inspirirana cyberpunkom i retro-futurizmom 80-ih, sa svemirsko-crnom pozadinom, svijetlećim magenta i cijan akcentima te stalnim preklapanjima CRT monitora (scanlines). Predložak se može pohvaliti bogatim narativnim klizačem koji podržava i slike i automatski reproducirane videozapise, uz očaravajuće, rotirajuće 'neonske vinilne' CSS animacije koje se ubrzavaju pri interakciji.",
                    highlights: {
                        purpose:
                            "Tech proizvodi, Digitalne platforme, Indie studiji za igre, Glazbena izdanja",
                        style: "Cyberpunk, Retro-futurizam, CRT scanlines",
                        features:
                            "Bogati narativni multimedijski klizač, Stalni CRT scanlines, Animirani laserski skenovi",
                        special:
                            "Interaktivne rotirajuće 'neonske vinilne' CSS animacije koje reagiraju na korisnikovu interakciju",
                    },
                    videoUrl: "Vinyl.webm",
                    screenshotHome: "VerySpecialConvo-home.png",
                    screenshotDesktop: "vinyl-desktop.png",
                    screenshotMobile: "chronos-mobile.webp",
                    tags: [
                        "3D",
                        "Retro-futurizam",
                        "Inovativno",
                        "Geometrijski",
                    ],
                },
                {
                    id: "tektonika",
                    title: "Interaktivni 3D nacrt za studio",
                    subtitle:
                        "3D interaktivna izložbena stranica za galerije, arhitekte ili tech demoe",
                    description:
                        "Radikalni hommage ranom konstruktivizmu 20. stoljeća i Bauhaus pokretu, uzdignut vrhunskom web tehnologijom. Ovaj predložak savršen je za umjetničke galerije, arhitektonske portfelje ili tech startupove koji žele pokazati visoko sofisticiran intelektualni imidž brenda. Pozadina je potpuno interaktivna 3D WebGL scena s besprijekornim geometrijskim oblicima u klasičnim primarnim bojama. Ovi 3D elementi matematički su povezani s korisnikovim skrolanjem, rotirajući se i pomičući s mehaničkom gracioznošću dok se krećete po stranici.",
                    highlights: {
                        purpose:
                            "Umjetničke galerije, Arhitektonski portfelji, Tech startupovi, Digitalne izložbe",
                        style: "Bauhaus, Konstruktivizam, Minimalizam",
                        features:
                            "Hardverski ubrzano renderiranje, Strogi konstruktivistički raspored, Mehaničke tranzicije",
                        special:
                            "Potpuno interaktivna 3D WebGL geometrijska scena sinkronizirana sa skrolanjem",
                    },
                    videoUrl: "Tektonika.webm",
                    screenshotHome: "VerySpecialConvo-home.png",
                    screenshotDesktop: "convo-desktop.webp",
                    screenshotMobile: "convo.webp",
                    tags: [
                        "Portfolio",
                        "3D",
                        "Minimalizam",
                        "Inovativno",
                        "Umjetnost",
                        "Geometrijski",
                    ],
                },
                {
                    id: "mondrianesque",
                    title: "Mondrianov Dnevnik",
                    subtitle:
                        "Živopisna geometrijska landing stranica za kreativne agencije i tech startupove",
                    description:
                        "Oštar, geometrijski i besprijekorno strukturiran. Inspiriran umjetničkim pokretom De Stijl i djelima Pieta Mondriana, ovaj predložak dizajniran je za kreativne agencije, avangardne dizajnerske studije i inovativne B2B tech tvrtke. Koristi odvažni dizajn temeljen na mreži: apsolutno crni i čisto bijeli temelji snažno su naglašeni visokonaponskim primarnim bojama. U potpunosti odbacuje 'mekani' moderni web dizajn u korist čvrstih linija mreže, brutalističkih okvira i brzih, krutih animacija. Dinamična upotreba živopisnih primarnih boja daje cjelokupnom dizajnu energičnu vibru.",
                    highlights: {
                        purpose:
                            "Kreativne agencije, Avangardni tech startupovi, Dizajnerski studiji",
                        style: "Inspirirano Mondrianom, Primarne boje, Debele mreže, Visoki kontrast",
                        features:
                            "De Stijl blokovi boja, Strukturne mreže, Geometrijske animacije",
                    },
                    videoUrl: "Mondrian.webm",
                    screenshotHome: "VerySpecialConvo-home.png",
                    screenshotDesktop: "convo-desktop.webp",
                    screenshotMobile: "convo.webp",
                    tags: [
                        "Portfolio",
                        "Inovativno",
                        "Umjetnost",
                        "Geometrijski",
                    ],
                },
                {
                    id: "bauhausic",
                    title: "Forma slijedi funkciju",
                    subtitle:
                        "Hrabar geometrijski predložak za kreativne agencije i umjetničke portfelje",
                    description:
                        "Beskompromisno slavlje radikalnog utilitarizma i etosa Bauhausa. Ovaj je predložak krojen po mjeri za avangardne dizajnerske agencije, umjetnike i digitalne izložbe koje će obožavati ljubitelji umjetnosti i arhitekture. Naglašava upotrebu osnovnih geometrijskih oblika i primarnih boja za stvaranje osjećaja kinetičke umjetnosti, prenoseći kako se čuda mogu izgraditi iz jednostavnih sredstava. Raspored je podijeljen debelim strukturnim linijama i koristi predimenzioniranu, tešku tipografiju za usmjeravanje korisnikovog oka.",
                    highlights: {
                        purpose:
                            "Avangardne dizajnerske agencije, Portfelji umjetnika, Digitalne izložbe",
                        style: "Digitalni Bauhaus, Geometrijski, Primarne boje",
                        features:
                            "Predimenzionirana kinetička tipografija, CSS geometrijski oblici, Otkrivanja pokrenuta skrolanjem",
                    },
                    videoUrl: "Kinetika.webm",
                    screenshotHome: "VerySpecialConvo-home.png",
                    screenshotDesktop: "kinetika-desktop.webp",
                    screenshotMobile: "kinetika.png",
                    tags: [
                        "Portfolio",
                        "Inovativno",
                        "Umjetnost",
                        "Zen",
                        "Geometrijski",
                    ],
                },
            ],
        },
        services: {
            title: "Usluge",
            subtitle: "Interdisciplinarni studio",
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
            modal: {
                items: [
                    {
                        id: "branding",
                        title: "Vizualni identitet i brending",
                        desc: "Dizajn logotipa, palete boja i tipografije koji pričaju vašu priču.",
                        img: "https://cdn-icons-png.flaticon.com/512/1256/1256650.png",
                    },
                    {
                        id: "design",
                        title: "Web dizajn",
                        desc: "Moderno i intuitivno sučelje prilagođeno vašim korisnicima.",
                        img: "https://cdn-icons-png.flaticon.com/512/1055/1055666.png",
                    },
                    {
                        id: "dev",
                        title: "Web razvoj",
                        desc: "Brz, siguran i skalabilan kod za besprijekorno iskustvo.",
                        img: "https://cdn-icons-png.flaticon.com/512/1005/1005141.png",
                    },
                    {
                        id: "deploy",
                        title: "Postavljanje na server",
                        desc: "Konfiguracija servera, domene i SSL certifikata.",
                        img: "https://cdn-icons-png.flaticon.com/512/8099/8099466.png",
                    },
                    {
                        id: "maint",
                        title: "Održavanje",
                        desc: "Redovita ažuriranja, sigurnosne kopije i tehnička podrška.",
                        img: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1000&auto=format&fit=crop",
                    },
                ],
                btn: "Rezerviraj usluge",
                total: "Odabrano:",
            },
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
            p1: "1. Create unique and authentic digital content",
            p2: "2. Convey thousands of your stories through text and design",
            p3: "3. Change the world (page by page!)",
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
        templates: {
            title: "Templates",
            subtitle:
                "Original, unique and ready-made templates you can't find anywhere else; as soon as one is bought, it is no longer available. However, if you do not want to buy the template, but want a custom website inspired by one of these designs, feel free to let us know.",
            standard:
                "Can be a single-page or multi-page layout depending on the client's needs. Fully responsive for all devices and accessible according to WCAG standards.",
            items: [
                {
                    id: "zen",
                    title: "Zen Dental",
                    subtitle:
                        "Holistic Medical, Dental & Wellness Clinic Landing Page",
                    description:
                        "A deeply calming, sophisticated template perfect for dental clinics, wellness centers, spas, or any premium medical practice aiming to reduce client anxiety. The design leans into a Nordic wellness aesthetic, substituting clinical whites and blues for warm linens, soft sages, and deep olive greens. It immediately establishes trust and serenity. The highlight of this template is a highly customized, interactive 3D WebGL element that gently rotates and breathes as the user scrolls, bathed in dappled virtual light. Combined with tactile noise overlays and matte card effects, the page feels physical and comforting.",
                    highlights: {
                        purpose:
                            "Dental Clinics, Wellness Centers, Spas, Premium Medical Practices",
                        style: "Nordic Wellness, Tactile UI, Earthy Palette",
                        features:
                            "Matte-finish content cards, Tactile noise overlays, Gentle organic hovers",
                        special:
                            "Interactive 3D WebGL element that breathes and rotates on scroll",
                    },
                    tags: ["3D", "Minimalism", "Zen", "Organic"],
                },
                {
                    id: "oasis",
                    title: "Homegrown Fresh Pixels",
                    subtitle:
                        "Modern Cafe, Restaurant, or Juice Bar Web Experience",
                    description:
                        "An effortlessly airy and vibrant template designed to capture the essence of a modern cafe, artisan coffee shop, or organic juice bar. This template heavily utilizes the glassmorphic, frosted glass panels that float over animated watercolor backgrounds. The visual experience is refreshing, using soft natural greens, yellows, and oranges to evoke a sense of freshness and spring-time energy. It is an excellent choice for any business in the hospitality or food industry wanting to present a clean, organic, and highly modern image.",
                    highlights: {
                        purpose:
                            "Cafes, Artisan Coffee Shops, Organic Juice Bars, Restaurants",
                        style: "Glassmorphism, Airy & Modern, Pastel Palette",
                        features:
                            "Frosted glass UI (Glassmorphism), Ambient liquid background animations, Dynamic image tilt effects",
                    },
                    videoUrl: "Oasis.webm",
                    screenshotHome: "VerySpecialConvo-home.png",
                    screenshotDesktop: "oasis-trebaodrezat.png",
                    screenshotMobile: "oasis.png",
                    tags: ["Glassmorphism", "Light", "Zen", "Organic"],
                },
                {
                    id: "rhythm",
                    title: "In the Rhythm of the Heart",
                    subtitle:
                        "Serene Landing Page for Events, Retreats, or Life Coaches",
                    description:
                        "Tailor-made for wellness seminars, yoga retreats, life coaches, or mental health professionals, this template is the digital equivalent of a deep breath. It embodies holistic principles that adapt to human biology rather than algorithmic urgency. The page features highly elegant, editorial serif typography mixed with viscous transitions and organic background elements. The journey down the page feels like a guided meditation, complete with an interactive timeline and gentle biometric visual cues.",
                    highlights: {
                        purpose:
                            "Wellness Seminars, Yoga Retreats, Life Coaches, Mental Health Professionals",
                        style: "Editorial, Natural Paper, Fluid Gradients",
                        features:
                            "Organic 'breathing' node animations, Viscous scroll reveals, Interactive 'bento box' grid",
                    },
                    videoUrl: "TheRhythm.webm",
                    screenshotHome: "VerySpecialConvo-home.png",
                    screenshotDesktop: "sillage.webp",
                    screenshotMobile: "sillage2.webp",
                    tags: ["Light", "Zen", "Organic"],
                },
                {
                    id: "sillage",
                    title: "Elegance in a Bottle",
                    subtitle:
                        "High-End Editorial Template for Luxury Brands, Cosmetics & Agencies",
                    description:
                        "This template exudes pure luxury. It is built to mimic the physical sensation of flipping through a high-end fashion magazine or a museum catalog. Perfect for boutique perfumeries, high-fashion brands, jewelry designers, or exclusive creative agencies. The aesthetic relies on beautiful 'White Cube' empty space, monumental serif typography, and asymmetrical gallery grids. The background features a subtle, high-quality paper texture, giving the digital space a tactile, physical weight. Every element appears with a sequential, heavy 'editorial reveal', ensuring that your product or service is framed as a premium, exclusive offering.",
                    highlights: {
                        purpose:
                            "E-commerce, Boutique Perfumeries, High-Fashion Brands, Jewelry Designers, Agencies",
                        style: "Magazine Layout, Asymmetrical, Drop Caps",
                        features:
                            "Avant-garde editorial layout, Heavy 'turn-the-page' scroll reveals, Geometric image masking",
                    },
                    videoUrl: "Sillage.webm",
                    screenshotHome: "VerySpecialConvo-home.png",
                    screenshotDesktop: "sillage.webp",
                    screenshotMobile: "sillage2.webp",
                    tags: [
                        "E-commerce",
                        "Web-shop",
                        "Light",
                        "Zen",
                        "Geometric",
                    ],
                },
                {
                    id: "skysalon",
                    title: "Concrete Poetry",
                    subtitle:
                        "Atmospheric Brutalist Portfolio for Architectural & Design Studios",
                    description:
                        "A bold, atmospheric, and highly structured template ideal for architectural firms, interior designers, or high-end creative studios. This design blends 'Atmospheric Brutalism' with modern elegance, utilizing raw slate colors, terra cotta accents, and a distinct film-grain noise overlay. It challenges traditional layouts with a sweeping horizontal scroll gallery for project archives, oversized serif typography, and brutalist card hover states. It communicates precision, spatial integrity, and a strong point of view. Built to showcase visual work beautifully on a single landing page, but robust enough to be expanded into a massive, multipage portfolio.",
                    highlights: {
                        purpose:
                            "Architectural Firms, Interior Designers, High-end Creative Studios, Portfolios",
                        style: "Atmospheric Brutalism, Film Grain, Muted Tones",
                        features:
                            "Sweeping horizontal scroll gallery, Native CSS film grain overlay, Brutalist drop-shadow hovers",
                    },
                    videoUrl: "SkyArchitecture.webm",
                    screenshotHome: "VerySpecialConvo-home.png",
                    screenshotDesktop: "sky-desk.png",
                    screenshotMobile: "sky-mob.webp",
                    tags: [
                        "Portfolio",
                        "Zen",
                        "Minimalism",
                        "Brutalism",
                        "Geometric",
                    ],
                },
                {
                    id: "polar",
                    title: "Dopamine Rush",
                    subtitle: "High-Energy Product & E-Commerce Promo Page",
                    description:
                        "Loud, unapologetic, very energetic - this design will certainly grab attention. This template is a powerhouse designed for disruptive food/beverage brands, streetwear drops, or high-energy e-commerce products. It features a dark, brutalist theme with shocking neon accents (berry red, mango orange, electric blue). The design is packed with micro-interactions that keep the user engaged, including a horizontal draggable product showcase, continuous marquee text, text-glitch effects, and an interactive 3D holographic 'scratch ticket' for promotions.",
                    highlights: {
                        purpose:
                            "Web-shops, Disruptive Food/Beverage Brands, Streetwear Drops, High-Energy E-commerce",
                        style: "Colorful Brutalism, Neon Accents, 3D Textures",
                        features:
                            "CSS text glitch effects, Drag-to-scroll galleries, Continuous marquees",
                        special:
                            "Interactive 3D holographic 'scratch ticket' mapped to mouse movement",
                    },
                    videoUrl: "Polar.webm",
                    screenshotHome: "VerySpecialConvo-home.png",
                    screenshotDesktop: "polar-desktop.png",
                    screenshotMobile: "polar.png",
                    tags: [
                        "E-commerce",
                        "Web-shop",
                        "Brutalism",
                        "3D",
                        "Innovative",
                        "Geometric",
                    ],
                },
                {
                    id: "book",
                    title: "Books Are Always in Style",
                    subtitle:
                        "Avant-Garde Promotional Page for Authors, Books, or Exhibitions",
                    description:
                        "An incredibly unique, conceptual template designed for author launching a book, which can also be of great use for artists promoting an exhibition, or thought-leaders offering exclusive content. The design bridges the gap between classic literary publishing (with elegant old-world serif fonts and 'unbleached paper' background) and dark, digital, terminal-like interfaces. It features engaging, narrative-driven elements like an interactive 'Diagnostic Flowchart' quiz for users, a highly stylized Author Dossier complete with ASCII art, and a mesmerizing SVG animation of a handwritten signature. It is a storytelling tool in itself.",
                    highlights: {
                        purpose:
                            "Artists, Authors, Book Launches, Art Exhibitions, Thought-Leader Portfolios",
                        style: "Hybrid Editorial & Terminal UI",
                        features:
                            "Snappy mechanical spring reveals, Continuous SVG path-drawing, Stylized ASCII art dossier",
                        special:
                            "Interactive multi-step diagnostic flowchart quiz",
                    },
                    videoUrl: "VerySpecialConvo.webm",
                    screenshotHome: "VerySpecialConvo-home.png",
                    screenshotDesktop: "convo-desktop.webp",
                    screenshotMobile: "convo.webp",
                    tags: ["Portfolio", "Elegant", "Web-shop", "Geometric"],
                },
                {
                    id: "neonvinyl",
                    title: "Cyberpunk Nostalgia",
                    subtitle:
                        "Retro-Futuristic Landing Page for Tech Products, Digital Platforms or Music Releases",
                    description:
                        "Step into the neon-drenched future. This template is a visual feast for cutting-edge tech products, digital platforms, indie game studios, or music artists releasing new albums. The aesthetic is heavily inspired by Cyberpunk and 80s retro-futurism, featuring a deep space-black background, glowing magenta and cyan accents, and persistent CRT monitor scanline overlays. The template boasts a rich narrative slider that supports both images and auto-playing videos, alongside mesmerizing, rotating 'Neon Vinyl' CSS animations that speed up on user interaction.",
                    highlights: {
                        purpose:
                            "Tech Products, Digital Platforms, Indie Game Studios, Music Releases",
                        style: "Cyberpunk, Retro-Futurism, CRT Scanlines",
                        features:
                            "Rich narrative multimedia slider, Persistent CRT monitor scanlines, Animated laser scans",
                        special:
                            "Interactive rotating 'Neon Vinyl' CSS animations responding to user interaction",
                    },
                    videoUrl: "Vinyl.webm",
                    screenshotHome: "VerySpecialConvo-home.png",
                    screenshotDesktop: "vinyl-desktop.png",
                    screenshotMobile: "chronos-mobile.webp",
                    tags: ["3D", "Retro-futurism", "Innovative", "Geometric"],
                },
                {
                    id: "tektonika",
                    title: "Interactive 3D Blueprint for Studio",
                    subtitle:
                        "3D Interactive Exhibition Page for Galleries, Architects, or Tech Demos",
                    description:
                        "A radical homage to early 20th-century constructivism and the Bauhaus movement, elevated by cutting-edge web technology. This template is perfect for art galleries, architectural portfolios, or tech startups wanting to show off a highly sophisticated, intellectual brand image. The backdrop is a fully interactive 3D WebGL scene (built with Three.js) featuring pristine geometric primitives (cubes, spheres, cylinders) in classic primary colors. These 3D elements are mathematically linked to the user's scroll, rotating and shifting with mechanical grace as you navigate the page. A masterclass in minimalism and geometric design that feels natural.",
                    highlights: {
                        purpose:
                            "Art Galleries, Architectural Portfolios, Tech Startups, Digital Exhibitions",
                        style: "Bauhaus, Constructivism, Minimalism",
                        features:
                            "Hardware-accelerated rendering, Strict constructivist layout, Mechanical scroll transitions",
                        special:
                            "Fully interactive, scroll-synced 3D WebGL geometric scene",
                    },
                    videoUrl: "Tektonika.webm",
                    screenshotHome: "VerySpecialConvo-home.png",
                    screenshotDesktop: "convo-desktop.webp",
                    screenshotMobile: "convo.webp",
                    tags: [
                        "Portfolio",
                        "3D",
                        "Minimalism",
                        "Innovative",
                        "Art",
                        "Geometric",
                    ],
                },
                {
                    id: "mondrianesque",
                    title: "Mondrian's Diary",
                    subtitle:
                        "Vibrant Geometric Landing Page for Creative Agencies & Tech Startups",
                    description:
                        "Sharp, geometric, and impeccably structured. Inspired by the De Stijl art movement and the works of Piet Mondrian, this template is designed for creative agencies, avant-garde design studios, and innovative B2B tech companies. It leverages a bold, grid-based design style: absolute black and stark white foundations heavily accented with high-voltage primary colors (red, blue, and yellow). It completely rejects 'mushy' modern web design in favor of hard grid lines, brutalist borders, and snappy, rigid animations that feel like a high-tech machine snapping into place. The dynamic use of vibrant primary colors gives the whole design an energetic, youthful, and highly individualistic vibe.",
                    highlights: {
                        purpose:
                            "Creative Agencies, Avant-Garde Tech Startups, Design Studios, Innovative B2B Firms",
                        style: "Mondrian-Inspired, Primary Colors, Bold Grids, High Contrast",
                        features:
                            "De Stijl color blocking, Rigid structural grids, High-stiffness snappy spring animations",
                    },
                    videoUrl: "Mondrian.webm",
                    screenshotHome: "VerySpecialConvo-home.png",
                    screenshotDesktop: "convo-desktop.webp",
                    screenshotMobile: "convo.webp",
                    tags: ["Portfolio", "Innovative", "Art", "Geometric"],
                },
                {
                    id: "bauhausic",
                    title: "Form Follows Function",
                    subtitle:
                        "Bold Geometric Template for Creative Agencies and Art Portfolios",
                    description:
                        "An unapologetic celebration of radical utilitarianism and the Bauhaus ethos. This template is tailor-made for avant-garde design agencies, artists, and digital exhibitions that will be loved by art and architecture fans. It emphasizes the use of basic geometric shapes and primary colors to create the sense of kinetic art, conveying how wonders can be built out of simple and limited assets.The layout is divided by thick, structural lines and utilizes versized, heavy typography to guide the user's eye. As the user scrolls, content blocks slide and snap into place with staggered precision.",
                    highlights: {
                        purpose:
                            "Avant-garde Design Agencies, Artist Portfolios, Digital Exhibitions, Creative Studios",
                        style: "Digital Bauhaus, Geometric, Primary Colors",
                        features:
                            "Oversized kinetic typography, CSS-drawn geometric shapes, Staggered scroll-triggered fade-ins",
                    },
                    videoUrl: "Kinetika.webm",
                    screenshotHome: "VerySpecialConvo-home.png",
                    screenshotDesktop: "kinetika-desktop.webp",
                    screenshotMobile: "kinetika.png",
                    tags: [
                        "Portfolio",
                        "Innovative",
                        "Art",
                        "Zen",
                        "Geometric",
                    ],
                },
            ],
        },
        services: {
            title: "Services",
            subtitle: "Interdisciplinary Studio",
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
            modal: {
                items: [
                    {
                        id: "branding",
                        title: "Visual Identity & Branding",
                        desc: "Logo design, color palettes, and typography that tell your story.",
                        img: "https://cdn-icons-png.flaticon.com/512/1256/1256650.png",
                    },
                    {
                        id: "design",
                        title: "Web Design",
                        desc: "Modern and intuitive interfaces tailored to your users.",
                        img: "https://cdn-icons-png.flaticon.com/512/1055/1055666.png",
                    },
                    {
                        id: "dev",
                        title: "Web Development",
                        desc: "Fast, secure, and scalable code for a seamless experience.",
                        img: "https://cdn-icons-png.flaticon.com/512/1005/1005141.png",
                    },
                    {
                        id: "deploy",
                        title: "Website Deployment",
                        desc: "Server configuration, domain setup, and SSL certificates.",
                        img: "https://cdn-icons-png.flaticon.com/512/8099/8099466.png",
                    },
                    {
                        id: "maint",
                        title: "Website Maintenance",
                        desc: "Regular updates, backups, and technical support.",
                        img: "https://cdn-icons-png.flaticon.com/512/1006/1006517.png",
                    },
                ],
                btn: "Book the services",
                total: "Selected:",
            },
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
