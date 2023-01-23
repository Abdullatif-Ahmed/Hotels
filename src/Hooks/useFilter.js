import { useSearchParams } from "react-router-dom";

const useFilter = () => {
  const [params, setParams] = useSearchParams();
  function add(id, val, type) {
    if (type === "multi") {
      const pa = params.get(id);
      pa ? params.set(id, `${pa},${val}`) : params.set(id, val);
    } else {
      params.set(id, val);
    }
    setParams(params);
  }
  function remove(id, val) {
    const pa = params.get(id);
    if (pa.split(",").length > 1) {
      params.set(
        id,
        pa.split(",").filter((v) => v !== val)
      );
    } else {
      params.delete(id);
    }
    setParams(params);
  }
  function removeAll(ids) {
    ids.forEach((id) => params.delete(id));
    setParams(params);
  }
  return { add, remove, removeAll };
};
export default useFilter;
