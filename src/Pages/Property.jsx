import { Col, Container, Row, Tab, Tabs } from "react-bootstrap";
import { useLocation, useNavigate, useParams } from "react-router";
import ErrorTryAgain from "../ComPonents/Error try again";
import useFetch from "../Hooks/useFetch";
import { AiOutlineHeart, AiFillStar, AiFillHeart } from "react-icons/ai";
import Slider from "react-slick";
import { BiChevronRight, BiChevronLeft } from "react-icons/bi";
import icons from "react-icons/md";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../Sass/Pages/property.scss";
import { memo, useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { IconContext } from "react-icons";
import { useContext } from "react";
import { AuthContext } from "../firebaseContext";
const Property = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const [updateSlideCount, setUpdateSlideCount] = useState(0);
  const { id, name } = useParams();
  const { savedHotels, handleSave, user } = useContext(AuthContext);
  const existing = savedHotels.some((h) => h.id === id);
  const { data, loading, error, reFetch } = useFetch(
    "POST",
    "https://hotels4.p.rapidapi.com/properties/v2/detail",
    JSON.stringify({
      currency: "USD",
      eapid: 1,
      locale: "en_US",
      siteId: 300000001,
      propertyId: id,
    })
  );
  let settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    nextArrow: (
      <span>
        <BiChevronRight size={18} />
      </span>
    ),
    prevArrow: (
      <span>
        <BiChevronLeft size={18} />
      </span>
    ),
    beforeChange: (_, next) => setUpdateSlideCount(next + 1),
  };

  useEffect(() => {
    if (data?.data?.propertyInfo.summary.name) {
      document.title = data?.data?.propertyInfo.summary.name;
      if (data?.data?.propertyInfo.summary.name !== name.split("-").join(" ")) {
        navigate(
          `/${id}/${data?.data?.propertyInfo.summary.name
            .split(" ")
            .join("-")}${search}`
        );
      }
    }
  }, [id, data?.data?.propertyInfo.summary.name, navigate, search, name]);
  return (
    <main className="py-3 property-main">
      <Container>
        {error ? (
          <div>
            <ErrorTryAgain
              reFetch={reFetch}
              messege="faild to load the property"
            />
          </div>
        ) : data?.errors ? (
          <div className="text-center py-5">
            <h1>no property to show</h1>
            <button
              onClick={() => navigate(`/search${search}`)}
              className="btn1"
            >
              See all properties
            </button>
          </div>
        ) : loading ? (
          <ThreeDots
            height="80"
            width="80"
            radius="9"
            color="#fc4c4c"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClass="justify-content-center py-5"
            visible={true}
          />
        ) : (
          <section className="property">
            <header className="d-flex align-items-center justify-content-between  p-1">
              <div>
                <button
                  onClick={() => navigate(`/search${search}`)}
                  className="btn1 d-flex align-items-center"
                >
                  <BiChevronLeft size={19} />
                  See all properties
                </button>
              </div>
              <div>
                <button
                  className=" fav-btn"
                  onClick={() => {
                    return user
                      ? handleSave(
                          data?.data?.propertyInfo.summary.id,
                          data?.data?.propertyInfo.summary.name,
                          data?.data?.propertyInfo.propertyGallery.images?.[0]
                            .image.url
                        )
                      : alert("you must logIn");
                  }}
                >
                  {existing ? (
                    <AiFillHeart size={22} className="exIcon" />
                  ) : (
                    <AiOutlineHeart size={22} className="notExIcon" />
                  )}
                  Save
                </button>
              </div>
            </header>
            <div className="slider position-relative">
              <Slider {...settings}>
                {data?.data?.propertyInfo.propertyGallery.images.map((img) => (
                  <div key={img.image.url + Math.random * 100}>
                    <div className="img-container">
                      <img
                        width="500"
                        height="330"
                        loading="lazy"
                        src={img.image.url}
                        alt={img.accessibilityText}
                        className="w-100 h-100"
                      />
                    </div>
                  </div>
                ))}
              </Slider>
              <span className="slideCount">
                {updateSlideCount} /
                {data?.data?.propertyInfo?.propertyGallery?.images?.length}
              </span>
            </div>
            <div>
              <Tabs defaultActiveKey="overView" className="mb-3">
                <Tab eventKey="overView" title="overView">
                  <div className="d-sm-flex justify-content-between">
                    <div className="overView-metadata">
                      <h1 className="name">
                        {data?.data?.propertyInfo.summary.name}
                      </h1>
                      {data?.data?.propertyInfo?.summary?.overview
                        ?.propertyRating?.rating && (
                        <div className="stars">
                          {[
                            ...Array(
                              Math.floor(
                                data?.data?.propertyInfo?.summary?.overview
                                  ?.propertyRating?.rating
                              )
                            ),
                          ].map(() => (
                            <AiFillStar
                              size={17}
                              key={Math.random() * 100 + Math.random() * 100}
                            />
                          ))}
                        </div>
                      )}

                      <p className="text mb-3">
                        {data?.data?.propertyInfo.summary.tagline}
                      </p>
                      <h2 className="heading">
                        {
                          data?.data?.propertyInfo.reviewInfo.summary
                            .overallScoreWithDescriptionA11y.value
                        }
                      </h2>
                      <div>
                        <h2 className="heading">
                          {
                            data?.data?.propertyInfo.summary.amenities
                              .topAmenities.header.text
                          }
                        </h2>
                        <ul className="d-flex flex-wrap">
                          {data?.data?.propertyInfo.summary.amenities.topAmenities.items.map(
                            (an) => (
                              <li
                                key={an.text + Math.random() * 100}
                                className="w-50 mb-3 d-flex align-items-center "
                              >
                                <IconContext.Provider
                                  value={{ size: 20, className: "me-2" }}
                                >
                                  <Icon id={an.icon.id} />
                                </IconContext.Provider>
                                {an.text}
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    </div>
                    <div className="map-sec">
                      <img
                        className="w-100 rounded"
                        src={
                          data?.data?.propertyInfo.summary.location.staticImage
                            .url
                        }
                        alt="map"
                        width="370"
                        height="200"
                      />
                      <address className="text">
                        {
                          data?.data?.propertyInfo.summary.location.address
                            .addressLine
                        }
                      </address>
                    </div>
                  </div>
                </Tab>

                <Tab eventKey="Amenities" title="Amenities">
                  <div className="amenities">
                    {data?.data?.propertyInfo.summary.amenities.amenities.map(
                      (am) => (
                        <div key={Math.random() * 100 + Math.random() * 100}>
                          <h2 className="title mb-3">{am.title}</h2>
                          <Row>
                            {am.contents.map((li) => (
                              <Col
                                xs="12"
                                sm="6"
                                className="d-flex mb-2"
                                key={li.header.text + Math.random() * 100}
                              >
                                <IconContext.Provider
                                  value={{ size: 20, className: "me-3" }}
                                >
                                  <Icon id={id.icon.id} />
                                </IconContext.Provider>
                                <div>
                                  <h3 className="heading">{li.header.text}</h3>
                                  <ul className="list">
                                    {li.items.map((le) => (
                                      <li
                                        key={le.text + Math.random() * 100}
                                        className="mb-1 text"
                                      >
                                        {le.text}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </Col>
                            ))}
                          </Row>
                        </div>
                      )
                    )}
                  </div>
                </Tab>
              </Tabs>
            </div>
          </section>
        )}
      </Container>
    </main>
  );
};
export default memo(Property);
function Icon({ id }) {
  const iconId =
    "Md" +
    id
      .split("_")
      .map((n) => n[0].toUpperCase() + n.slice(1))
      .join("");

  const Icon = icons[iconId] || icons.MdHotel;
  return <Icon />;
}
