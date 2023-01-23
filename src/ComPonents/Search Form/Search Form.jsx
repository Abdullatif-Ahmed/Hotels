import "./Search Form.scss";
import { CiLocationOn, CiCalendar, CiUser, CiSearch } from "react-icons/ci";
import { HiLocationMarker } from "react-icons/hi";
import { MdLocalAirport } from "react-icons/md";
import { FaBuilding } from "react-icons/fa";
import { BiSearch } from "react-icons/bi";
import { memo, useEffect, useReducer, useRef, useState } from "react";
import useFetch from "../../Hooks/useFetch";
import { MutatingDots } from "react-loader-spinner";
import { Dropdown, FloatingLabel, Form } from "react-bootstrap";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRange } from "react-date-range";
import { format, addDays } from "date-fns";
import travellers, {
  ADD_ROOM,
  CHANGE_STATE,
  DECREASE_ADULTS,
  DECREASE_CHILDREN,
  INCREASE_ADULTS,
  INCREASE_CHILDREN,
  REMOVE_ROOM,
  SELECT_CHILD_AGE,
} from "./travellers";
import { useNavigate } from "react-router";
import useFilter from "../../Hooks/useFilter";
import { useSearchParams } from "react-router-dom";
import useTravellersConvert from "../../Hooks/useTravellersConvert";
import ErrorTryAgain from "../Error try again";
const SearchForm = ({ searchPage }) => {
  const { join, split } = useTravellersConvert();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [searchVal, setSearchVal] = useState(params.get("location") || "");
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [locationError, setLocationError] = useState(false);
  const [openTreavellers, setOpenTravellers] = useState(false);
  const [openLocationMenu, setOpenLocationMenu] = useState(false);
  const [openSearchForm, setOpenSearchForm] = useState(false);
  const [travellersError, setTravellersError] = useState(false);
  const travellersModel = useRef();
  const travellersBtn = useRef();
  const locationMenu = useRef();
  const locationBtn = useRef();
  const [date, setDate] = useState([
    {
      startDate: params.has("startDate")
        ? new Date(params.get("startDate"))
        : addDays(new Date(), 10),
      endDate: params.has("endDate")
        ? new Date(params.get("endDate"))
        : addDays(new Date(), 11),
      key: "selection",
    },
  ]);
  let initialState = params.get("travellers")
    ? split(params.get("travellers"))
    : [{ adults: 1, children: [] }];
  const [state, dispatch] = useReducer(travellers, initialState);
  const [checkedTravellers, setCheckedTravellers] = useState(initialState);
  const { add } = useFilter();
  useEffect(() => {
    const chE = state.some((rom) =>
      rom.children.some((ch) => ch.age === false)
    );
    if (!chE) {
      setTravellersError(false);
    }
  }, [state]);
  useEffect(() => {
    function clickOutSide(e) {
      if (openTreavellers && !travellersBtn.current.contains(e.target)) {
        setOpenTravellers(false);
        dispatch({ type: CHANGE_STATE, payload: checkedTravellers });
      }
      if (
        openLocationMenu &&
        !locationMenu.current.contains(e.target) &&
        !locationBtn.current.contains(e.target)
      ) {
        setOpenLocationMenu(false);
      }
    }
    document.addEventListener("click", clickOutSide);
    return () => document.removeEventListener("click", clickOutSide);
  });

  const {
    data: searchData,
    loading,
    error,
    reFetch,
  } = useFetch(
    "GET",
    `https://hotels4.p.rapidapi.com/locations/v3/search?q=${searchVal.trim()}`
  );

  function handleLocationSelect(val) {
    setOpenLocationMenu(false);
    setSelectedLocation(val);
    setSearchVal(val.regionNames.primaryDisplayName);
    setLocationError(false);
    if (searchPage) {
      add("location", val.regionNames.secondaryDisplayName, "single");
      add(
        "latLong",
        `${val.coordinates.lat},${val.coordinates.long}`,
        "single"
      );
      add("regionId", val.gaiaId, "single");
    }
  }
  function handleDateRange(item) {
    setDate([item.selection]);
    if (searchPage) {
      add(
        "startDate",
        format(item.selection.startDate, "yyyy-MM-dd"),
        "single"
      );
      add("endDate", format(item.selection.endDate, "yyyy-MM-dd"), "single");
    }
  }
  function handleTravellersSubmit(e) {
    e.preventDefault();
    const chE = state.some((rom) =>
      rom.children.some((ch) => ch.age === false)
    );
    if (chE) {
      setTravellersError(true);
    } else {
      setCheckedTravellers(state);
      if (searchPage) {
        add("travellers", join(state), "single");
      }
      setOpenTravellers(false);
    }
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (selectedLocation === null) {
      setLocationError(true);
    } else {
      navigate(
        `/search?location=${
          selectedLocation.regionNames.secondaryDisplayName
        }&startDate=${format(date[0].startDate, "yyyy,MM,dd")}&endDate=${format(
          date[0].endDate,
          "yyyy,MM,dd"
        )}&travellers=${join(checkedTravellers)}&latLong=${
          selectedLocation.coordinates.lat
        },${selectedLocation.coordinates.long}&regionId=${
          selectedLocation.gaiaId
        }`
      );
    }
  }

  return (
    <>
      {searchPage && (
        <button
          className={`d-flex align-items-center searchToggle w-100  d-lg-none ${
            !openSearchForm ? "d-inline-block" : "d-none"
          }`}
          onClick={() => setOpenSearchForm(true)}
        >
          <BiSearch size={16} className="me-2" />
          <div>
            <h1 className="location">{searchVal}</h1>
            <span>
              {" "}
              {format(date[0].startDate, "dd MMM")} -{" "}
              {format(date[0].endDate, "dd MMM")}
            </span>
            <span className="ms-2">
              {state.reduce(
                (cur, acc) => cur + (acc.adults + acc.children.length),
                0
              )}{" "}
              travellers, {state.length} room
            </span>
          </div>
        </button>
      )}

      <form
        className={`${searchPage ? "searchPage" : "landingPage"} ${
          searchPage
            ? `${openSearchForm ? "d-block" : "d-none"} d-lg-block`
            : ""
        } searchForm d-lg-flex align-items-center justify-content-between`}
        onSubmit={handleSubmit}
      >
        <Dropdown
          show={openLocationMenu}
          className="formGroup h-100 position-relative"
        >
          <Dropdown.Toggle
            ref={locationBtn}
            onClick={() => setOpenLocationMenu((state) => !state)}
            className={`d-flex align-items-center toggle-btn ${
              locationError ? "error" : ""
            }`}
          >
            <CiLocationOn size={23} className="icon" />
            <div className="renderGroup">
              <label htmlFor="location">Location</label>
              <p className="m-0 text">
                {params.get("location") ||
                  selectedLocation?.regionNames.primaryDisplayName ||
                  "Going to"}
              </p>
            </div>
          </Dropdown.Toggle>
          <Dropdown.Menu
            ref={locationMenu}
            className="modal-dropDown search-modal position-absolute  "
          >
            <input
              spellCheck="false"
              autoFocus
              autoComplete="off"
              className="text w-100 border-bottom"
              type="text"
              placeholder="Where are you going?"
              id="location"
              value={searchVal}
              onInput={(e) => setSearchVal(e.target.value)}
            />
            {searchVal.trim().length === 0 || searchData?.sr?.length === 0 ? (
              <div className="text-center pt-4 p-1">
                <CiSearch className=" mb-2" size={40} />
                <p className="text">
                  Search by destination, accommodation or landmark
                </p>
              </div>
            ) : error ? (
              <ErrorTryAgain
                reFetch={reFetch}
                messege="Faild to load the locations"
              />
            ) : (
              <div>
                {loading ? (
                  <MutatingDots
                    height="100"
                    width="100"
                    radius="12.5"
                    ariaLabel="mutating-dots-loading"
                    wrapperStyle={{}}
                    wrapperClass="justify-content-center mb-3 pt-5 spinner"
                    visible={true}
                  />
                ) : (
                  <ul className="search-list">
                    {searchData?.sr?.map((li) => (
                      <li key={li.essId.sourceId}>
                        <button
                          className="d-flex align-items-center search-item w-100"
                          onClick={(e) => {
                            e.preventDefault();
                            handleLocationSelect(li);
                          }}
                        >
                          <div>
                            {li.type === "AIRPORT" ? (
                              <MdLocalAirport size={15} className="icon" />
                            ) : li.type === "HOTEL" ? (
                              <FaBuilding size={15} className="icon" />
                            ) : (
                              <HiLocationMarker size={15} className="icon" />
                            )}
                          </div>
                          <div className="item-regionNames">
                            <span className="item-primaryName d-block">
                              {li.regionNames.primaryDisplayName}
                            </span>
                            <span className="item-secondaryName">
                              {li.regionNames.secondaryDisplayName}
                            </span>
                          </div>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}

                <p className=" d-flex align-items-center justify-content-center m-0 p-3">
                  <CiSearch size={20} className="icon me-1" /> Search for "
                  {searchVal}"
                </p>
              </div>
            )}
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown className="formGroup  position-relative">
          <Dropdown.Toggle className="d-flex align-items-center toggle-btn">
            <CiCalendar size={23} className="icon" />
            <div className="renderGroup">
              <label htmlFor="Dates">Dates</label>
              <p className="text m-o">
                {format(date[0].startDate, "dd MMM")} -{" "}
                {format(date[0].endDate, "dd MMM")}
              </p>
            </div>
          </Dropdown.Toggle>
          <Dropdown.Menu className="modal-dropDown  position-absolute  ">
            <DateRange
              editableDateInputs={true}
              onChange={(item) => handleDateRange(item)}
              moveRangeOnFirstSelection={false}
              ranges={date}
              minDate={new Date()}
              className="w-100 date-range"
              rangeColors={["#fa3734"]}
              color="#fc4c4c"
              fixedHeight={true}
            />
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown className="formGroup  position-relative">
          <Dropdown.Toggle
            ref={travellersBtn}
            onClick={(e) => {
              e.preventDefault();
              setOpenTravellers((state) => !state);
            }}
            className={` d-flex align-items-center toggle-btn ${
              travellersError ? "error" : ""
            }`}
            aria-label="add travellers"
          >
            <CiUser size={23} className="icon" />
            <div className="renderGroup">
              <label>Travellers</label>
              <p className="text m-0">
                {state.reduce(
                  (cur, acc) => cur + (acc.adults + acc.children.length),
                  0
                )}{" "}
                travellers, {state.length} room
              </p>
            </div>
          </Dropdown.Toggle>

          <Dropdown.Menu
            onClick={(e) => e.stopPropagation()}
            show={openTreavellers}
            ref={travellersModel}
            className={`modal-dropDown travellers-modal position-absolute ${
              openTreavellers ? "d-block" : "d-none"
            }`}
          >
            <ul className="rooms">
              {state.map((rom, ind) => (
                <li className="room mb-3" key={Math.random() * 1000}>
                  <h2 className="room-heading mb-2">Room {ind + 1}</h2>
                  <div className="room-item d-flex align-items-center justify-content-between mb-3">
                    <label className="room-item-label">Adults</label>

                    <div className="activites d-flex align-items-center">
                      <button
                        disabled={rom.adults === 1}
                        className="rounded-circle "
                        onClick={() =>
                          dispatch({ type: DECREASE_ADULTS, payload: ind })
                        }
                      >
                        -
                      </button>
                      <span className="num">{rom.adults}</span>
                      <button
                        disabled={rom.adults === 8}
                        className="rounded-circle "
                        onClick={() =>
                          dispatch({ type: INCREASE_ADULTS, payload: ind })
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="room-item d-flex align-items-center justify-content-between mb-3">
                    <label className="room-item-label">Children</label>
                    <div className="activites d-flex align-items-center">
                      <button
                        disabled={rom.children.length === 0}
                        className="rounded-circle "
                        onClick={() =>
                          dispatch({
                            type: DECREASE_CHILDREN,
                            payload: ind,
                          })
                        }
                      >
                        -
                      </button>
                      <span className="num">{rom.children.length}</span>
                      <button
                        disabled={rom.children.length === 6}
                        className="rounded-circle "
                        onClick={() =>
                          dispatch({ type: INCREASE_CHILDREN, payload: ind })
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <ul className="children mb-2">
                    {rom.children.map((ch, chInd) => (
                      <li key={Math.random() * 1000}>
                        <FloatingLabel
                          controlId="floatingSelectGrid"
                          label={`child ${chInd + 1}`}
                        >
                          <Form.Select
                            className={`${
                              ch.age === false && travellersError ? "error" : ""
                            }`}
                            value={ch.age}
                            onChange={(e) =>
                              dispatch({
                                type: SELECT_CHILD_AGE,
                                payload: {
                                  romInd: ind,
                                  chInd,
                                  selectedAge: e.target.value,
                                },
                              })
                            }
                          >
                            <option
                              value={false}
                              aria-selected={false}
                              className="d-none"
                            ></option>
                            <option value="0">Under 1</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
                            <option value="12">12</option>
                            <option value="13">13</option>
                            <option value="14">14</option>
                            <option value="15">15</option>
                            <option value="16">16</option>
                            <option value="17">17</option>
                          </Form.Select>
                        </FloatingLabel>
                        {ch.age === false && travellersError ? (
                          <span
                            style={{
                              color: "#fa3734",
                              fontWeight: 600,
                              fontSize: "13px",
                            }}
                          >
                            Select the child age
                          </span>
                        ) : (
                          ""
                        )}
                      </li>
                    ))}
                  </ul>
                  {state.length > 1 && (
                    <button
                      className="btn1 ms-auto d-block"
                      onClick={() =>
                        dispatch({ type: REMOVE_ROOM, payload: ind })
                      }
                    >
                      Remove room
                    </button>
                  )}
                </li>
              ))}
            </ul>
            <button
              className="btn1 d-block ms-auto mb-4"
              disabled={state.length === 8}
              onClick={(e) => {
                e.preventDefault();
                dispatch({ type: ADD_ROOM });
              }}
            >
              Add another room
            </button>
            <button
              onClick={handleTravellersSubmit}
              className="w-100 btn2 rounded-5"
            >
              Done
            </button>
          </Dropdown.Menu>
        </Dropdown>
        {searchPage ? (
          <div className="text-center py-2">
            <button
              className="d-lg-none btn1 p-1"
              onClick={() => setOpenSearchForm(false)}
            >
              Close
            </button>
          </div>
        ) : (
          <button
            aria-label="search"
            type="submit"
            className="w-100 submitBtn btn2"
          >
            Search
          </button>
        )}
      </form>
    </>
  );
};
export default memo(SearchForm);
