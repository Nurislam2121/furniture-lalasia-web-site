import './SectionContainer.css'

export default function SectionContainer({className,children}) {
    return (
        <section className={`content-width ${className}`}>
            {children}
        </section>
    )
}