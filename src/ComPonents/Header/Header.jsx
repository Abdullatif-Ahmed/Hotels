import { Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../Assets/logo.webp";
import { FaUserCircle } from "react-icons/fa";
import { BiTrip } from "react-icons/bi";
import { BsFillHeartFill } from "react-icons/bs";
import "./header.scss";
import { useContext, useState } from "react";
import { AuthContext } from "../../firebaseContext";
import WishList from "../WishList/WishList";

const Header = () => {
  const [openWishlist, setOpenWishList] = useState(false);
  const navigate = useNavigate();
  const { user, logOut } = useContext(AuthContext);
  async function handleLogOut() {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <header className="py-4 header">
      <Container>
        <div className="d-flex justify-content-between align-items-center">
          <Link to="/">
            <img src={logo} alt="Booking" width="110" height="33" />
          </Link>
          <nav className="ms-auto nav">
            <ul className="d-flex align-items-center">
              <li>
                <button
                  onClick={() => setOpenWishList(true)}
                  className="nav-item d-flex align-items-center"
                >
                  <BsFillHeartFill className="me-1" size="20" />
                  <span className="d-none d-md-inline-block">WishList</span>
                </button>
              </li>
              <li>
                <Link
                  to="#"
                  className="d-none d-md-inline-block fs-6 text-capitalize nav-item"
                >
                  trips
                </Link>
                <Link to="/trip" className="d-md-none nav-item">
                  <BiTrip size="25" />
                </Link>
              </li>
              {user ? (
                <li>
                  <button className="nav-item" onClick={handleLogOut}>
                    log out
                  </button>
                </li>
              ) : (
                <li>
                  <Link
                    to="/login"
                    className="d-none d-md-inline-block fs-6 text-capitalize nav-item"
                  >
                    sign in
                  </Link>
                  <Link to="/login" className="d-md-none nav-item">
                    <FaUserCircle size="25" />
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </Container>
      <WishList open={openWishlist} close={() => setOpenWishList(false)} />
    </header>
  );
};
export default Header;
