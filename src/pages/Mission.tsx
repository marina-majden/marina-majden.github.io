import CardScanner from "@/components/CardScanner";
import Reveal from "@/components/Reveal";
import SectionTitle from "@/components/SectionTitle";

const Mission = () => {
    return (
        <div className='min-h-screen w-screen'>
            <Reveal className='animate-fadeIn'>
                <SectionTitle>Mission</SectionTitle>
            </Reveal>
            <CardScanner />
        </div>
    );
};

export default Mission;
