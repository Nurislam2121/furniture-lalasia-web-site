import "./Hero.css";
import SearchField from "../../../components/SearchField/SearchField";
import MainPicture from "../../../assets/main-picture.jpg";
import Arrow from "../../../assets/sketch-arrow.png";
import Section from "../../../components/SectionContainer/SectionContainer";

export default function Hero() {
  return (
    <Section className="hero">
      <img src={Arrow} alt="" className="hero-arrow" />

      <div className="hero-content">
        <h1 className="hero-title">
          Discover Furniture With <br /> High Quality Wood
          <span className="hero-sparkle">✨</span>
        </h1>
        <p className="hero-description">
          Pellentesque etiam blandit in tincidunt at donec. Eget ipsum dignissim
          placerat nisi, adipiscing mauris non. Purus parturient viverra nunc,
          tortor sit laoreet. Quam tincidunt aliquam adipiscing tempor.
        </p>

        <div className="hero-search-wrapper">
          <SearchField />
        </div>
      </div>

      <div className="hero-image-container">
        <img
          src={MainPicture}
          alt="Interior Design"
          className="hero-main-img"
        />
      </div>
    </Section>
  );
}
