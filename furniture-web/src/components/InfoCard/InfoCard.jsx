import './InfoCard.css'

export default function InfoCard({image, title, description}) {
    return (
        <div className="info-card">
            <img src={image} alt={title} />
            <h3>{title}</h3>
            <p>{description}</p>
        </div>
    )
}