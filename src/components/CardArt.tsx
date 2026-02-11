import React from "react";
import styles from "./CardArt.module.css";

const CardArt: React.FC = () => {
    return (
        <div className='p-10 flex gap-4'>
            {/* You simply combine the base 'card' class 
        with the specific 'style7' class.
      */}
            <div className={`${styles.card} ${styles.style7}`} />

            {/* Another one using style 12 */}
            <div className={`${styles.card} ${styles.style12}`} />
        </div>
    );
};

export default CardArt;
