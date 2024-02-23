import { Col, Container, Row } from "react-bootstrap";
import "./footer.scss";
import logo from "../../Assets/logo.webp";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer>
      <div className="top-footer">
        <Container>
          <Row>
            <Col xs="12" md="6" lg="3" className="mb-5 mb-lg-0">
              <div className="content">
                <div className="logo-container mb-3">
                  <img src={logo} alt="Booking" width="200" height="35" />
                </div>
                <p className="text">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. At
                  est nobis voluptas maxime ducimus quasi quo omnis ea.
                </p>
                <ul className="social d-flex align-items-center ">
                  <li>
                    <a href="/" aria-label="facebook">
                      <FaFacebookF size="20" className="icon" />
                    </a>
                  </li>
                  <li>
                    <a href="/" aria-label="twitter">
                      <FaTwitter size="20" className="icon" />
                    </a>
                  </li>
                  <li>
                    <a href="/" aria-label="instgram">
                      <FaInstagram size="20" className="icon" />
                    </a>
                  </li>
                  <li>
                    <a href="/" aria-label="linkedin">
                      <FaLinkedinIn size="20" className="icon" />
                    </a>
                  </li>
                </ul>
              </div>
            </Col>
            <Col xs="12" md="6" lg="3" className="mb-5 mb-lg-0">
              <h3 className="footer-heading text-uppercase mb-4">services</h3>
              <ul className="footer-links">
                <li>
                  <a href="/">delicious food</a>
                </li>
                <li>
                  <a href="/">parking area</a>
                </li>
                <li>
                  <a href="/">swimming pool</a>
                </li>
                <li>
                  <a href="/">spa salon</a>
                </li>
                <li>
                  <a href="/">exercise space</a>
                </li>
              </ul>
            </Col>
            <Col xs="12" md="6" lg="3" className="mb-5 mb-lg-0">
              <h3 className="footer-heading text-uppercase mb-4">
                important link
              </h3>
              <ul className="footer-links">
                <li>
                  <a href="/">about us</a>
                </li>
                <li>
                  <a href="/">populer destinition</a>
                </li>
                <li>
                  <a href="/">awesome rooms</a>
                </li>
                <li>
                  <a href="/">our services</a>
                </li>
                <li>
                  <a href="/">pricing plan</a>
                </li>
              </ul>
            </Col>
            <Col xs="12" md="6" lg="3">
              <h3 className="footer-heading text-uppercase mb-4">support</h3>
              <ul className="footer-links">
                <li>
                  <a href="/">help center</a>
                </li>
                <li>
                  <a href="/">our COVID-19 response</a>
                </li>
                <li>
                  <a href="/">cancellation options</a>
                </li>
                <li>
                  <a href="/">safety information</a>
                </li>
                <li>
                  <a href="/">exercise space</a>
                </li>
              </ul>
            </Col>
          </Row>
        </Container>
      </div>

      <div className="bottom-footer py-4 text-center">
        Copyright &copy; 2022 by <Link to="/">Booking</Link>. All Rights
        Reserved.
      </div>
    </footer>
  );
};
export default Footer;
