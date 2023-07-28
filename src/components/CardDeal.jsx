import { card } from "../assets";
import styles, { layout } from "../style";
import Button from "./Button";

const CardDeal = () => (
  <section className={layout.section}>
    <div className={layout.sectionInfo}>
      <h2 className={styles.heading2}>
        Why ? What ? Features ?  <br className="sm:block hidden" /> CRATER AI ???
      </h2>
      <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
       Choose from numerous options, best technology & affordable, Cyber Threat mitigation, AI-powered Social Media Management & much more.
      </p>

      <Button styles={`mt-10`} />
    </div>

    <div className={layout.sectionImg}>
      <img src={card} alt="billing" className="w-[100%] h-[100%]" />
    </div>
  </section>
);

export default CardDeal;
