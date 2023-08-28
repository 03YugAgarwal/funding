import Image from "next/image";
import React from "react";

import styles from "./Hero.module.css";

const Hero = () => {
  return (
    <header className={styles.hero}>
      <div className={styles.imgDiv}>
        <img src="/hero.jpg" alt="hero" className={styles.img} />
      </div>
      <section className={styles.heroText}>
        <h1>Fund Raising Website</h1>
        {/* <button>Donate</button> */}
      </section>
    </header>
  );
};

export default Hero;
