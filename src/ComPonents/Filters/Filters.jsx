import { FormCheck } from "react-bootstrap";
import useFilter from "../../Hooks/useFilter";
import "./filters.scss";
import { useEffect, useRef } from "react";
const Filters = ({ data, sendFilters, lg }) => {
  const { add, remove } = useFilter();
  const filters = useRef();
  useEffect(() => {
    if (sendFilters) {
      const array = Array.from(
        filters.current.querySelectorAll("input[data-id]")
      )
        .filter((inp) => inp.checked && inp.dataset.default === "false")
        .map((inp) => {
          return { id: inp.dataset.id, val: inp.value, name: inp.dataset.name };
        });

      sendFilters([...new Map(array.map((item) => [item.val, item])).values()]);
    }
  }, [data, sendFilters]);
  return (
    <div className={`filters ${lg ? "lg" : ""}`} ref={filters}>
      <div
        key={
          data?.data?.propertySearch.universalSortAndFilter.filterSections?.[1]
            .title
        }
        className="filterSection"
      >
        <h3 className="filters-heading">
          {
            data?.data?.propertySearch.universalSortAndFilter
              .filterSections?.[1].title
          }
        </h3>
        {data?.data?.propertySearch.universalSortAndFilter.filterSections?.[1].fields.map(
          (fl) =>
            fl.primary === "Star rating" ||
            fl.primary === "Property type" ||
            fl.primary === "Hotels.com® Rewards" ||
            fl.primary === "Your budget" ? (
              ""
            ) : (
              <fieldset
                key={fl?.primary || Math.random()}
                className="fieldset mt-3"
              >
                {fl.primary && <legend>{fl.primary}</legend>}
                {fl.__typename === "ShoppingMultiSelectionField" ||
                fl.__typename === "ShoppingMultiSelectionTileField" ? (
                  (
                    fl.multiSelectionOptions || fl.tileMultiSelectionOptions
                  ).map((fm) => (
                    <div key={fm.value} className="input-container">
                      <FormCheck.Input
                        data-default={fm.default}
                        data-name={
                          fm.primary.length > 21
                            ? fm.primary.slice(0, 21) + "..."
                            : fm.primary
                        }
                        data-id={fm.id !== "regionId" ? fm.id : `F${fm.id}`}
                        type="checkbox"
                        name={fl.primary}
                        id={`${fl.primary}_${fm.value}`}
                        disabled={fm.disabled}
                        checked={fm.selected}
                        value={fm.value}
                        onChange={(e) => {
                          e.target.checked === true
                            ? fm.id !== "regionId"
                              ? add(fm.id, fm.value, "multi")
                              : add(`F${fm.id}`, fm.value, "single")
                            : fm.id !== "regionId"
                            ? remove(fm.id, fm.value)
                            : remove(`F${fm.id}`, fm.value);
                        }}
                      />
                      <FormCheck.Label
                        htmlFor={`${fl.primary}_${fm.value}`}
                        title={fm.primary}
                      >
                        {fm.primary.length > 17
                          ? fm.primary.slice(0, 17) + "..."
                          : fm.primary}
                      </FormCheck.Label>
                    </div>
                  ))
                ) : fl.__typename === "ShoppingSelectionField" ? (
                  fl.options.map((fm) => (
                    <div
                      key={fm.value === "" ? Math.random() : fm.value}
                      className="input-container"
                    >
                      <FormCheck.Input
                        data-default={fm.default}
                        data-name={
                          fm.primary.length > 21
                            ? fm.primary.slice(0, 21) + "..."
                            : fm.primary
                        }
                        data-id={fm.id !== "regionId" ? fm.id : `F${fm.id}`}
                        type="radio"
                        name={fl.primary}
                        id={`${fl.primary}_${fm.value}`}
                        disabled={fm.disabled}
                        checked={fm.selected}
                        value={fm.value}
                        onChange={(e) => {
                          e.target.checked === true &&
                            add(
                              fm.id !== "regionId" ? fm.id : `F${fm.id}`,
                              fm.value,
                              "single"
                            );
                        }}
                      />
                      <FormCheck.Label htmlFor={`${fl.primary}_${fm.value}`}>
                        {fm.primary.length > 21
                          ? fm.primary.slice(0, 21) + "..."
                          : fm.primary}
                      </FormCheck.Label>
                    </div>
                  ))
                ) : fl.__typename ===
                  "ShoppingMultiSelectionStackedTileField" ? (
                  <div className="d-flex flex-wrap">
                    {fl.tileMultiSelectionOptions.map((fm) => (
                      <div
                        key={fm.value}
                        className="input-container rating me-1 mb-1"
                      >
                        <input
                          className="d-none"
                          data-name={
                            fm.primary.length > 21
                              ? fm.primary.slice(0, 21) + "..."
                              : fm.primary
                          }
                          data-default={fm.default}
                          type="checkbox"
                          data-id={fm.id}
                          name={fl.primary}
                          id={`${fl.primary}_${fm.value}`}
                          disabled={fm.disabled}
                          checked={fm.selected}
                          value={fm.value}
                          onChange={(e) => {
                            e.target.checked === true &&
                              add(fm.id, fm.value, "single");
                          }}
                        />
                        <label htmlFor={`${fl.primary}_${fm.value}`}>
                          {fm.primary}{" "}
                          {fm.icon
                            ? fm.value === "10"
                              ? fm.icon.description
                              : fm.icon.description + "s"
                            : ""}
                        </label>
                      </div>
                    ))}
                  </div>
                ) : fl.__typename === "ShoppingRangeField" ? (
                  ""
                ) : (
                  ""
                )}
              </fieldset>
            )
        )}
      </div>
    </div>
  );
};
export default Filters;
