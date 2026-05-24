import FooterColumn from "./FooterColumn";
import logo from '../../assets/logo.svg';
import './Footer.css'

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-info">
                <img src={logo} alt="Logo" />
                <p className="footer-description">Lalasia is digital agency that help you make better experience iaculis cras in.</p>
            </div>
            <div className="footer-navigation">
                <FooterColumn title='Product' links={['New Arrivals', 'Best Selling', 'Home Decor', 'Kitchen Set']} />
                <FooterColumn title='Services' links={['Catalog', 'Blog', 'FAQ']} />
                <FooterColumn title='Follow us' links={['Facebook', 'Instagram', 'Twitter']} />
            </div>
        </footer>
    )
}