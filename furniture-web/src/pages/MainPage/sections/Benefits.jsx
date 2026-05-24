import "./Benefits.css";
import Square from "../../../assets/3square.svg";
import Calendar from "../../../assets/calendar.svg";
import Money from "../../../assets/money.svg";
import InfoCard from "../../../components/InfoCard/InfoCard";
import Section from "../../../components/SectionContainer/SectionContainer";

const cardList = [
  {
    id: 1,
    img: Square,
    title: "Many Choices",
    description:
      "Pellentesque etiam blandit in tincidunt at donec. Eget ipsum dignissim placerat nisi, adipiscing mauris non.",
  },
  {
    id: 2,
    img: Calendar,
    title: "Fast and On Time",
    description:
      "Pellentesque etiam blandit in tincidunt at donec. Eget ipsum dignissim placerat nisi, adipiscing mauris non.",
  },
  {
    id: 3,
    img: Money,
    title: "Affordable Price",
    description:
      "Pellentesque etiam blandit in tincidunt at donec. Eget ipsum dignissim placerat nisi, adipiscing mauris non.",
  },
];

export default function Benefits() {
  return (
    <Section className="benefits">
      <div className="benefits-container">
        <div className="benefits-info">
          <div className="benefits-title-container">
            <h5>Benefits</h5>
            <h2>Benefits when using our services</h2>
          </div>
          <p className="benefits-description">
            Pellentesque etiam blandit in tincidunt at donec. Eget ipsum
            dignissim placerat nisi, adipiscing mauris non purus parturient.
          </p>
        </div>

        <div className="info-container">
          {cardList.map((item) => (
            <InfoCard
              key={item.id}
              image={item.img}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      </div>
    </Section>
  );
}
