import Section from "../../../components/SectionContainer/SectionContainer";
import "./OurProduct.css";
import Interrier from "../../../assets/interrier.jpg";
import Interrier2 from "../../../assets/interrier2.jpg";

export default function OurProduct() {
  return (
    <Section className="our-product">
      <div className="our-product-container">
        
        <div className="our-product-top">
          <div className="title-group">
            <h5 className="section-label">Our Product</h5>
            <h2 className="section-title">Crafted by talented and <br/> high quality material</h2>
          </div>
          
          <div className="stats-group">
            <div className="stats-item">
              <h2>20+</h2>
              <p>Years Experience</p>
            </div>
            <div className="stats-item">
              <h2>483</h2>
              <p>Happy Client</p>
            </div>
            <div className="stats-item">
              <h2>150+</h2>
              <p>Project Finished</p>
            </div>
          </div>
        </div>

        <div className="our-product-bottom">
          <div className="description-column">
            <p className="section-description">
              Pellentesque etiam blandit in tincidunt at donec. Eget ipsum dignissim 
              placerat nisi, adipiscing mauris non purus parturient.
              morbifermentum, vivamus et accumsan dui tincidunt pulvinar.
            </p>
            <button className="primary-button base-button">Learn More</button>
            <div className="image-small">
              <img src={Interrier} alt="Tools" />
            </div>
          </div>

          <div className="image-large-column">
            <img src={Interrier2} alt="Interior" />
          </div>
        </div>

      </div>
    </Section>
  );
}