import { useContext } from "react";
import { createPortal } from "react-dom";
import { AuthContext } from "../../firebaseContext";
import { MdClose } from "react-icons/md";
import { AiFillHeart } from "react-icons/ai";
import "./style.scss";
import { Link, useNavigate } from "react-router-dom";
const WishList = ({ open, close }) => {
  const navigate = useNavigate();
  const { savedHotels, handleSave, user } = useContext(AuthContext);

  if (open) {
    document.body.classList.add("modalOpen");
  } else {
    document.body.classList.remove("modalOpen");
  }
  return createPortal(
    <div>
      {open && <div className="overlay"></div>}
      <div className={`wishList ${open ? "open" : ""} position-fixed top-0`}>
        <header className="p-2 py-3 d-flex align-items-center border-bottom">
          <button onClick={close}>
            <MdClose size={25} />
          </button>
          <h3 className="heading m-0">
            WishList <AiFillHeart size={20} className="ms-1 icon" />
          </h3>
        </header>

        <div className="h-100">
          {user ? (
            savedHotels.length === 0 ? (
              <h3 className="text-center pt-5">No items to show</h3>
            ) : (
              <ul className="items h-100">
                {savedHotels.map((h) => (
                  <li
                    key={h.id}
                    className="box d-flex align-items-center justify-content-between p-2"
                  >
                    <Link
                      to={`/${h.id}/${h.name.split(" ").join("-")}`}
                      className="d-flex align-items-center content"
                    >
                      <div className="img-container me-2">
                        <img src={h.imgUrl} alt={h.name} className="rounded" />
                      </div>
                      <h4 className="title m-0">
                        {h.name.length >= 38
                          ? `${h.name.slice(0, 38)}...`
                          : h.name}
                      </h4>
                    </Link>
                    <button
                      className="close"
                      onClick={() => handleSave(h.id, h.name, h.imgUrl)}
                    >
                      <MdClose size={25} />
                    </button>
                  </li>
                ))}
              </ul>
            )
          ) : (
            <div className=" justify-content-center pt-5 d-flex align-items-center">
              <h3 className="m-0">you must</h3>
              <button className="btn1 ms-1" onClick={() => navigate("/login")}>
                Sign in
              </button>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.getElementById("portal")
  );
};
export default WishList;
