import React, { useState } from "react";
import "./CyberCard.css";

const CyberCard: React.FC = () => {
    // Stanje za pohranu rotacije (X i Y os)
    const [rotation, setRotation] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const card = e.currentTarget.getBoundingClientRect();

        // 1. Izračunaj poziciju miša unutar kartice (0 do width/height)
        const mouseX = e.clientX - card.left;
        const mouseY = e.clientY - card.top;

        // 2. Pretvori to u vrijednost od -0.5 do 0.5 (centar je 0)
        const centerX = mouseX / card.width - 0.5;
        const centerY = mouseY / card.height - 0.5;

        // 3. Pomnoži s maksimalnim kutom rotacije (npr. 20 stupnjeva)
        // Napomena: Pomicanje miša po X osi rotira karticu oko Y osi!
        setRotation({
            x: centerY * -20, // Negativno jer gore želimo rotaciju prema natrag
            y: centerX * 20,
        });
    };

    const handleMouseLeave = () => {
        setIsHovering(false);
        setRotation({ x: 0, y: 0 }); // Vrati na početno stanje
    };

    return (
        <div className='cyber-container noselect'>
            <div
                className='canvas'
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={handleMouseLeave}
                style={{
                    transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
                    willChange: "transform",
                    transition: isHovering ? "none" : "transform 0.5s ease", // Glatki povratak
                }}>
                <div id='card' className={isHovering ? "is-hovering" : ""}>
                    <div className='card-content'>
                        <div className='card-glare'></div>

                        <div className='cyber-lines'>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>

                        <p id='prompt' style={{ opacity: isHovering ? 0 : 1 }}>
                            hover me
                        </p>

                        <div
                            className='title'
                            style={{
                                opacity: isHovering ? 1 : 0,
                                transform: isHovering
                                    ? "translateY(-10px)"
                                    : "none",
                            }}>
                            CYBER
                            <br />
                            CARD
                        </div>

                        <div
                            className='glowing-elements'
                            style={{ opacity: isHovering ? 1 : 0 }}>
                            <div className='glow-1'></div>
                            <div className='glow-2'></div>
                            <div className='glow-3'></div>
                        </div>

                        <div className='subtitle'>
                            <span className='font-mono'>const role =</span>
                            <span className='highlight'> "Edu-Dev";</span>
                        </div>

                        <div className='corner-elements'>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>

                        <div className='scan-line'></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CyberCard;
