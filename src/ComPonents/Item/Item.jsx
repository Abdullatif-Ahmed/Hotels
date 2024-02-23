import { Link, useLocation } from "react-router-dom";
import { IoMdPricetag } from "react-icons/io";
import { RiRefund2Line } from "react-icons/ri";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

import "./item.scss";
import { useContext } from "react";
import { AuthContext } from "../../firebaseContext";
const Item = ({ item }) => {
  const { savedHotels, handleSave, user } = useContext(AuthContext);
  const existing = savedHotels.some((h) => h.id === item.id);
  const { search } = useLocation();
  return (
    <div className="d-flex flex-column flex-md-row item">
      <div className="leftPart position-relative">
        <Link to={`/${item.id}/${item.name.split(" ").join("-")}${search}`}>
          <div className="img-container h-100">
            <img
              loading="lazy"
              width="285"
              src={item?.propertyImage?.image.url}
              alt={item.name}
              className="w-100"
            />
          </div>
        </Link>
        <button
          aria-label={existing ? "unsave" : "save"}
          className="position-absolute fav-btn"
          onClick={() => {
            return user
              ? handleSave(item.id, item.name, item?.propertyImage.image.url)
              : alert("you must logIn");
          }}
        >
          {existing ? (
            <AiFillHeart size={22} className="exIcon" />
          ) : (
            <AiOutlineHeart size={22} className="notExIcon" />
          )}
        </button>
      </div>
      <div className="meta-data">
        <Link
          to={`/${item.id}/${item.name.split(" ").join("-")}${search}`}
          className="h-100 d-md-flex flex-column justify-content-between"
        >
          <div className="topPart">
            <div>
              <h2 className="title" title={item.name}>
                {item.name} Lorem ipsum dolor, sit amet consectetur adipisicing
                elit. Sunt, cumque?
              </h2>
              <span className="text">{item.neighborhood?.name}</span>
            </div>
          </div>
          <div className="bottomPart d-flex align-items-center justify-content-between">
            <div className="labels align-self-end">
              {item.offerSummary.messages.map((ms) => (
                <div
                  key={Math.random() * 20 + Math.random() * 10}
                  className={`${
                    ms.theme === "SUCCESS" ? "success" : ""
                  } label d-flex align-items-center`}
                >
                  {ms?.mark?.id === "loyalty" ? (
                    <RiRefund2Line size={20} className="me-1 icon" />
                  ) : (
                    ""
                  )}
                  {ms.message}
                </div>
              ))}
            </div>
            <div>
              <div>
                <div>
                  {item.offerBadge?.primary && (
                    <div className="text-right">
                      {" "}
                      <span className="offerBadge member">
                        {item.offerBadge.primary.icon_temp && (
                          <IoMdPricetag size={19} className="me-1" />
                        )}
                        {`${item.offerBadge.primary.text} available`}
                      </span>
                    </div>
                  )}
                  {item.offerBadge?.secondary && (
                    <div className="text-right">
                      <span className="offerBadge off">
                        {item.offerBadge.secondary.text}
                      </span>
                    </div>
                  )}
                </div>
                <div className="price">
                  {item.price.strikeOut && (
                    <del className="prevPrice">
                      {item.price.strikeOut.formatted}
                    </del>
                  )}
                  <span className="currentPrice">
                    {item.price.lead?.formatted}
                  </span>
                </div>
              </div>
              <div className="text-right reviews">
                <strong>{item.reviews.score}</strong>/10{" "}
                <span className="total">({item.reviews.total} reviews)</span>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};
export default Item;
