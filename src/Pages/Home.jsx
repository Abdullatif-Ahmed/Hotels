import { Container, Row, Col } from "react-bootstrap";
import "../Sass/Pages/home.scss";
import { MdOutlineSocialDistance, MdCleanHands } from "react-icons/md";
import { HiShieldCheck } from "react-icons/hi";
import { RiHandCoinFill } from "react-icons/ri";
import { TbMap2 } from "react-icons/tb";
import { BsChatLeftDots, BsPatchCheck } from "react-icons/bs";
import CountUp from "react-countup";
import SearchForm from "../ComPonents/Search Form/Search Form";

const Home = () => {
  document.title = "Home - Booking";

  return (
    <main>
      <section className="landing-widget position-relative">
        <Container>
          <div className="landing-content position-relative text-center">
            <h1 className="landing-heading">find your next stay</h1>
            <p className="text">
              Get the best prices on 2,000,000+ properties, worldwide
            </p>
          </div>
        </Container>
      </section>
      <section className="position-relative seacrch-widget">
        <Container>
          <SearchForm />
        </Container>
      </section>
      <section className="analytics-widget text-center">
        <Container>
          <Row>
            <Col xs="6" md="3" className="mb-5 mb-md-0 analytics-box">
              <h3 className="analytics-heading">
                <CountUp end={400} duration={2} />+
              </h3>
              <p className="text">Room & Suites</p>
            </Col>
            <Col xs="6" md="3" className="mb-5 mb-md-0 analytics-box">
              <h3 className="analytics-heading">
                <CountUp end={90} duration={2} />+
              </h3>
              <p className="text">Restaurant</p>
            </Col>
            <Col xs="6" md="3" className="mb-5 mb-md-0 analytics-box">
              <h3 className="analytics-heading">
                <CountUp end={160} duration={2} />+
              </h3>
              <p className="text">Exceptional Food</p>
            </Col>
            <Col xs="6" md="3" className="mb-5 mb-md-0 analytics-box">
              <h3 className="analytics-heading">
                <CountUp end={40} duration={2} />+
              </h3>
              <p className="text">Destination</p>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="boxes-widget text-center">
        <Container>
          <div>
            <h3 className="sec-heading">Plan The Vacation of Your Dreams</h3>
            <p className="sec-info mx-auto">
              Explore some of the best tips from around the world from our
              partners and friends. Discover some of the most popular listings!
            </p>
          </div>
          <Row>
            <Col xs="12" md="4" className="mb-5">
              <div className="box">
                <i className="icon-container rounded-circle mb-3 d-inline-block">
                  <TbMap2 size="40" className="icon" />
                </i>
                <h3 className="box-heading">Find Interesting Place</h3>
                <p className="text">
                  You can search for areas of interest, local events, trendy
                  restaurants or just things to do.
                </p>
              </div>
            </Col>
            <Col xs="12" md="4" className="mb-5">
              <div className="box">
                <i className="icon-container rounded-circle mb-3 d-inline-block">
                  <BsChatLeftDots size="40" className="icon" />
                </i>
                <h3 className="box-heading">Check Reviews</h3>
                <p className="text">
                  Determine the quality of goods and services from local shops
                  and choose the best place.
                </p>
              </div>
            </Col>
            <Col xs="12" md="4" className="mb-5">
              <div className="box">
                <i className="icon-container rounded-circle mb-3 d-inline-block">
                  <BsPatchCheck size="40" className="icon" />
                </i>
                <h3 className="box-heading">Make a Reservation</h3>
                <p className="text">
                  Contact listing owner and reserve a table online for lunch or
                  dinner or rent an apartment.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="icons-widget">
        <Container>
          <Row>
            <Col xs="12" sm="6" lg="3" className="mb-4 mb-lg-0">
              <div className="text-center">
                <i className="icon-container rounded-circle mb-3 d-inline-block">
                  <HiShieldCheck size="30" className="icon" />
                </i>
                <h4 className="heading">Official health standards</h4>
                <p className="text">
                  Properties adhering to corporate/organisational sanitisation
                  guidelines.
                </p>
              </div>
            </Col>
            <Col xs="12" sm="6" lg="3" className="mb-4 mb-lg-0">
              <div className="text-center">
                <i className="icon-container rounded-circle mb-3 d-inline-block">
                  <MdOutlineSocialDistance size="30" className="icon" />
                </i>
                <h4 className="heading">Social distancing</h4>
                <p className="text">
                  Contactless check-in and check-out along with other social
                  distancing measures.
                </p>
              </div>
            </Col>
            <Col xs="12" sm="6" lg="3" className="mb-4 mb-lg-0">
              <div className="text-center">
                <i className="icon-container rounded-circle mb-3 d-inline-block">
                  <MdCleanHands size="30" className="icon" />
                </i>
                <h4 className="heading">Hygiene and sanitisation</h4>
                <p className="text">
                  The use of disinfectant and whether properties enforce a gap
                  period between stays.
                </p>
              </div>
            </Col>
            <Col xs="12" sm="6" lg="3">
              <div className="text-center">
                <i className="icon-container rounded-circle mb-3 d-inline-block">
                  <RiHandCoinFill size="30" className="icon" />
                </i>
                <h4 className="heading">Essentials at the property</h4>
                <p className="text">
                  Free hand sanitiser for guests and individually wrapped food
                  options.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  );
};
export default Home;
