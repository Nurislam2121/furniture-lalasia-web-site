import "./InfoContent.css";
import Section from "../../../components/SectionContainer/SectionContainer";
import ServiceCard from "../../../components/ServiceCard/ServiceCard";

const InfoList = [
  {
    id: 1,
    title: "Furniture",
    desc: "At the ultimate smart home, you're met with technology before you even step through the front door.",
  },
  {
    id: 2,
    title: "Home Decoration",
    desc: "Create A Calming Summer Escape With Our Luxurious Home Accessories For The Balmy Evenings.",
  },
  {
    id: 3,
    title: "Kitchen Cabinet",
    desc: "Introducing the modular kitchen cabinet system. Start with our huge selection of base and wall cabinets.",
  },
  {
    id: 4,
    title: "Interior Design",
    desc: "Innovative products often feature innovative designs that play with the patterns we are familiar..",
  },
  {
    id: 5,
    title: "Exterior Design",
    desc: "These stylish and resilient products provide up-to-date options for roofing, siding, decking, and outdoor spaces.",
  },
  {
    id: 6,
    title: "Custom Furniture",
    desc: "With Quality Materials and Modern Designs, we have Designs for all Tastes. we bring you World Class Designs.",
  },
];

export default function InfoContent() {
  return (
    <Section className="info-content-section">
      <div className="info-content-container">
        {InfoList.map((item) => (
          <ServiceCard
            key={item.id}
            number={item.id}
            title={item.title}
            description={item.desc}
          />
        ))}
      </div>
    </Section>
  );
}
