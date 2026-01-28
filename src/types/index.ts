export interface Translation {
    nav: {
        home: string;
        about: string;
        skills: string;
        services: string;
        projects: string;
        lab: string;
        litart: string;
        contact: string;
    };
    hero: {
        line1: string;
        line2: string;
        line3: string;
        subtitle: string;
        cta: string;
    };
    about: {
        title: string;
        p1: string;
        p2: string;
    };
    skills: {
        title: string;
        hard: string;
        soft: string;
        softList: {
            title: string;
            desc: string;
        }[];
    };
    services: {
        title: string;
        list: {
            title: string;
            desc: string;
            imgUrl: string;
            imgClass: string;
        }[];
    };
    projects: {
        title: string;
        viewProject: string;
        items: {
            title: string;
            desc: string;
            stack: string[];
            full: string;
            url: string;
            urlShowcase: string;
        }[];
    };
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
    footer: {
        copyright: string;
    };
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
