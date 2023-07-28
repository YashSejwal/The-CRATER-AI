import styles from "./style";
import react from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom/dist";
import { Billing, Business, CardDeal, Clients, CTA, Footer, Navbar, Stats, Testimonials, Hero } from "./components";
import Location from "./components/Location";
import CallButton from "./components/CallButton";
import PaymentForm from './components/PaymentForm';
const App = () => (
  <div className="bg-primary w-full overflow-hidden">
    <div className={`${styles.paddingX} ${styles.flexCenter}`}>
      <div className={`${styles.boxWidth}`}>
        <Navbar />
      </div>
    </div>

    <div className={`bg-primary ${styles.flexStart}`}>
      <div className={`${styles.boxWidth}`}>
        <Hero />
      </div>
    </div>
    
    <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
      <div className={`${styles.boxWidth}`}>
        {/* <CallButton/> */}
        <Stats />
        {/* <PaymentForm /> */}
        <Business />
        <Billing />
        <CardDeal />
        <Testimonials />
        <Clients />
        <Location/>
        <CTA />
        <Footer />
      </div>
    </div>
  </div>
);

export default App;
