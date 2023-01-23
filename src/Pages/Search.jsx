import { addDays, format, getDate, getMonth, getYear } from "date-fns";
import { memo, useCallback, useEffect, useState } from "react";
import { Col, Container, FloatingLabel, Form, Row } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import SearchForm from "../ComPonents/Search Form/Search Form";
import useFetch from "../Hooks/useFetch";
import useTravellersConvert from "../Hooks/useTravellersConvert";
import "../Sass/Pages/search.scss";
import Filters from "../ComPonents/Filters/Filters";
import useFilter from "../Hooks/useFilter";
import MobileFiltersModel from "../ComPonents/MobileSort&Filters/MobileSort&Filters";
import { GrFormClose } from "react-icons/gr";
import PlaceholderLoading from "react-placeholder-loading";
import ErrorTryAgain from "../ComPonents/Error try again";
import { BiSearch } from "react-icons/bi";
import Item from "../ComPonents/Item/Item";
import { MdArrowUpward } from "react-icons/md";

const Search = () => {
  const [openFiltersModel, setOpenFiltersModel] = useState(false);
  const [view, setView] = useState(false);
  const [params] = useSearchParams();
  const [filters, setFilters] = useState([]);
  const { split } = useTravellersConvert();
  const { add, remove, removeAll } = useFilter();
  const placeHolderCount = 6;
  const { data, loading, error, reFetch } = useFetch(
    "POST",
    "https://hotels4.p.rapidapi.com/properties/v2/list",

    JSON.stringify({
      currency: "USD",
      eapid: 1,
      locale: "en_US",
      siteId: 300000001,
      destination: {
        regionId: params.get("regionId"),
        coordinates: {
          latitude:
            params.get("latLong") &&
            parseFloat(params.get("latLong").split(",")[0]),
          longitude:
            params.get("latLong") &&
            parseFloat(params.get("latLong").split(",")[1]),
        },
      },
      checkInDate: {
        day: getDate(new Date(params.get("startDate"))),
        month: getMonth(new Date(params.get("startDate"))) + 1,
        year: getYear(new Date(params.get("startDate"))),
      },
      checkOutDate: {
        day: getDate(new Date(params.get("endDate"))),
        month: getMonth(new Date(params.get("endDate"))) + 1,
        year: getYear(new Date(params.get("endDate"))),
      },
      rooms: split(params.get("travellers") || ""),
      resultsStartingIndex: 0,
      resultsSize: 200,
      sort: params.get("sort") || "RECOMMENDED",
      filters: {
        hotelName: params.get("hotelName"),

        guestRating: params.get("guestRating"),
        accessibility: params.get("accessibility")?.split(","),
        travelerType: params.get("travelerType")?.split(","),
        mealPlan: params.get("mealPlan")?.split(","),
        poi: params.get("poi"),
        regionId: params.get("FregionId"),
        amenities: params.get("amenities")?.split(","),
        paymentType: params.get("paymentType")?.split(","),
        bedroomFilter: params.get("bedroomFilter")?.split(","),
        availableFilter: params.get("availableFilter"),
      },
    })
  );
  console.log(data);
  const q = params.get("location");
  useEffect(() => {
    document.title = q;
  }, [q]);
  useEffect(() => {
    if (!params.has("regionId")) {
      add("regionId", 2621, "single");
      add("latLong", "40.712843,-74.005966", "single");
      add("location", "New York, United States", "single");
    }
    if (!params.has("travellers")) {
      add("travellers", 1, "single");
    }
    if (!params.has("startDate") || !params.has("endDate")) {
      add("startDate", format(addDays(new Date(), 10), "yyyy-MM-dd"), "single");
      add("endDate", format(addDays(new Date(), 11), "yyyy-MM-dd"), "single");
    }
  }, [params, add]);
  useEffect(() => {
    const scroll = () => {
      if (window.scrollY >= 800) {
        setView(true);
      } else {
        setView(false);
      }
    };
    window.addEventListener("scroll", scroll);
    return () => clearInterval("scroll", scroll);
  });
  const sendFilters = useCallback((filters) => {
    setFilters(filters);
  }, []);

  return (
    <>
      <main className="searchMain py-4">
        <button
          onClick={() => {
            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;
          }}
          className={`rounded-circle position-fixed to-top ${
            view ? "show" : ""
          }`}
        >
          <MdArrowUpward size={23} />
        </button>
        <section className="mb-3">
          <Container>
            <SearchForm searchPage />
          </Container>
        </section>
        <section className="results-sec">
          <Container>
            {error ? (
              <div>
                <ErrorTryAgain
                  reFetch={reFetch}
                  messege="faild to load the properties"
                />
              </div>
            ) : data?.errors ? (
              <div className="d-flex align-items-center flex-column pt-4 mb-3">
                <BiSearch size={22} />
                <h1>No matches</h1>
                <span className="text">try to remove filters</span>
                <button
                  onClick={() =>
                    removeAll([
                      "guestRating",
                      "accessibility",
                      "travelerType",
                      "mealPlan",
                      "poi",
                      "FregionId",
                      "amenities",
                      "paymentType",
                      "bedroomFilter",
                      "availableFilter",
                    ])
                  }
                  aria-label="remove all filters"
                  className=" removeAll"
                >
                  Remove all filters
                </button>
              </div>
            ) : (
              <div className="wraper d-lg-flex">
                <aside className="d-none d-lg-block">
                  <Filters data={data} sendFilters={sendFilters} lg={true} />
                </aside>
                <div className="widget">
                  <header className=" mb-3">
                    <div className="d-lg-none mobile-models-btns d-flex align-items-center w-100 mb-2">
                      <div className="btn-container ">
                        <button
                          onClick={() => setOpenFiltersModel(true)}
                          aria-label="open sort and filter model"
                          className="w-100 rounded-pill p-1"
                        >
                          Sort & filter
                        </button>
                      </div>
                    </div>
                    <div>
                      <ul className="d-flex flex-wrap align-items-center">
                        {filters.map((fl) => (
                          <li key={fl.val} className="me-2">
                            <button
                              className="deleteFilter  rounded-pill d-flex justify-content-between align-items-center"
                              onClick={() => remove(fl.id, fl.val)}
                              aria-label="delete this filter"
                            >
                              {fl.name}
                              <GrFormClose size={19} className="ms-2 icon" />
                            </button>
                          </li>
                        ))}
                        {filters.length !== 0 && (
                          <li>
                            <button
                              onClick={() =>
                                removeAll(filters.map((f) => f.id))
                              }
                              aria-label="remove all filters"
                              className=" removeAll"
                            >
                              Remove all filters
                            </button>
                          </li>
                        )}
                      </ul>
                    </div>
                    <div className="d-flex justify-content-center justify-content-lg-between align-items-center">
                      <span className="text">
                        {
                          data?.data?.propertySearch.summary.resultsTitleModel
                            .header
                        }
                      </span>
                      {data?.data?.propertySearch.universalSortAndFilter.sortSections?.[0].fields.map(
                        (s) => (
                          <div key={s.primary} className="d-none d-lg-block">
                            <FloatingLabel
                              controlId="floatingSelect"
                              label={s.primary}
                            >
                              <Form.Select
                                value={
                                  s.dropdownFilterOptions.find(
                                    (so) => so.selected === true
                                  ).value
                                }
                                aria-label={s.primary}
                                onChange={(e) => {
                                  console.log(e.target.value);
                                  add("sort", e.target.value, "single");
                                }}
                              >
                                {s.dropdownFilterOptions.map((so) => (
                                  <option value={so.value} key={so.value}>
                                    {so.primary}
                                  </option>
                                ))}
                              </Form.Select>
                            </FloatingLabel>
                          </div>
                        )
                      )}
                    </div>
                  </header>
                  <div className="properties-boxes mb-3">
                    <Row>
                      {loading
                        ? [...Array(placeHolderCount)].map(() => (
                            <Col
                              key={Math.random() * 10 + Math.random() * 20}
                              xs="12"
                              className="px-1 px-xl-2 mb-2 mb-xl-3"
                            >
                              <div className="d-flex flex-column flex-md-row rounded">
                                <div>
                                  <PlaceholderLoading
                                    shape="rect"
                                    width="100%"
                                    height={180}
                                  />
                                </div>
                                <div className="p-2">
                                  <div className="mb-2">
                                    <PlaceholderLoading
                                      shape="rect"
                                      width="100%"
                                      height={20}
                                    />
                                  </div>
                                  <div className="mb-2">
                                    <PlaceholderLoading
                                      shape="rect"
                                      width="90%"
                                      height={20}
                                    />
                                  </div>
                                  <div className="mb-2">
                                    <PlaceholderLoading
                                      shape="rect"
                                      width="77%"
                                      height={20}
                                    />
                                  </div>
                                </div>
                              </div>
                            </Col>
                          ))
                        : data?.data?.propertySearch.properties.map((item) => (
                            <Col
                              xs="12"
                              className="px-2 mb-3 "
                              key={item.id + Math.random() * 100}
                            >
                              <Item item={item} />
                            </Col>
                          ))}
                    </Row>
                  </div>
                </div>
              </div>
            )}
          </Container>
        </section>
      </main>
      <MobileFiltersModel
        open={openFiltersModel}
        close={() => setOpenFiltersModel(false)}
        removeFilters={() => removeAll(filters.map((f) => f.id))}
      >
        {error ? (
          <div>
            <ErrorTryAgain
              reFetch={reFetch}
              messege="faild to load the properties"
            />
          </div>
        ) : data?.errors ? null : (
          data?.data?.propertySearch.universalSortAndFilter.sortSections?.[0].fields.map(
            (s) => (
              <div key={s.primary}>
                <FloatingLabel controlId="floatingSelect" label={s.primary}>
                  <Form.Select
                    value={
                      s.dropdownFilterOptions.find((so) => so.selected === true)
                        .value
                    }
                    aria-label={s.primary}
                    onChange={(e) => add("sort", e.target.value, "single")}
                  >
                    {s.dropdownFilterOptions.map((so) => (
                      <option value={so.value} key={so.value}>
                        {so.primary}
                      </option>
                    ))}
                  </Form.Select>
                </FloatingLabel>
              </div>
            )
          )
        )}
        <Filters data={data} />
      </MobileFiltersModel>
    </>
  );
};
export default memo(Search);
