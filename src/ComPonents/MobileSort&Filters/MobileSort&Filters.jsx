import { GrFormClose } from "react-icons/gr";
import { createPortal } from "react-dom";
import "./style.scss";

const MobileFiltersModel = ({ children, open, close, removeFilters }) => {
  if (open) {
    document.body.classList.add("modalOpen");
  } else {
    document.body.classList.remove("modalOpen");
  }
  return (
    open &&
    createPortal(
      <div className="d-lg-none">
        <div className="overlay"></div>
        <section className="position-fixed mobileFiltersModel rounded pt-5">
          <div className="content ">
            <header className="w-100 d-flex align-items-center justify-content-between p-3 border-bottom position-fixed start-0 top-0 rounded-top">
              <div className="d-flex align-items-center ">
                <button
                  aria-label="close model"
                  className="me-1"
                  onClick={close}
                >
                  <GrFormClose size={25} />
                </button>
                <h3 className="mb-0 title">Sort & filters</h3>
              </div>
              <button className="btn1" onClick={removeFilters}>
                Clear
              </button>
            </header>
            <div className="p-3 pt-4">{children}</div>
          </div>
        </section>
      </div>,
      document.getElementById("portal")
    )
  );
};
export default MobileFiltersModel;
