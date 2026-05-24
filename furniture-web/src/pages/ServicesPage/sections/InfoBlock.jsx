import "./InfoBlock.css";
import Section from "../../../components/SectionContainer/SectionContainer";
import ServiceImg from "../../../assets/services-img.jpg"

export default function InfoBlock() {
  return (
    <Section className="info-block-section">
      <div className="services-header">
        <h1 className="services-title">Services</h1>
        <p className="services-desc">
          The product crafted by talented crafter and using high quality
          material with love inside
        </p>
        <img src={ServiceImg} alt="Services" />
      </div>
    </Section>
  );
}
