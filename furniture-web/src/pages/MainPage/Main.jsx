import "./Main.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import SearchField from "../../components/SearchField/SearchField";
import Hero from "./sections/Hero";
import Benefits from "./sections/Benefits";
import OurProduct from "./sections/OurProduct";
import MainProduct from "./sections/MainProduct";

export default function Main() {
  return (
    <>
      <Header />
      <Hero />
      <Benefits />
      <OurProduct />
      <MainProduct />
      <Footer />
    </>
  );
}
