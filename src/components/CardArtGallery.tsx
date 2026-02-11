import React from 'react';
import styles from './CardArt.module.css';

const CardGallery: React.FC = () => {
  // Create an array of 20 items
  const cards = Array.from({ length: 20 });

  return (
    <div className="min-h-screen bg-[#333] p-4 grid gap-2 grid-cols-[repeat(auto-fit,min(100%,13em))] place-content-center">
      {cards.map((_, index) => {
        // We dynamically construct the class name: style1, style2, style3...
        // Note: The index is 0-based, but our CSS styles are 1-based (style1...style20)
        // So we use index + 1, unless it's the first card (index 0) which is just base styles 
        // or we can make a style1 class.
        
        // Let's assume we want style1 to match index 0 + 1
        const styleKey = `style${index + 1}` as keyof typeof styles;
        const specificStyleClass = styles[styleKey];

        return (
          <div 
            key={index} 
            className={`${styles.card} ${specificStyleClass || ''}`}
          />
        );
      })}
    </div>
  );
};

export default CardGallery;