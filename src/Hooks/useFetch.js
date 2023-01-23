import axios from "axios";
import { useEffect, useState } from "react";

const useFetch = (method, url, body) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios
      .request({
        method,
        url,
        headers: {
          "X-RapidAPI-Key": process.env.REACT_APP_RAPIDAPI_KEY,
          "X-RapidAPI-Host": "hotels4.p.rapidapi.com",
          "content-type": "application/json",
        },
        data: body,
      })
      .then((res) => setData(res.data))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, [url, method, body]);
  const reFetch = () => {
    setLoading(true);
    setError(null);
    axios
      .request({
        method,
        url,
        headers: {
          "X-RapidAPI-Key": process.env.REACT_APP_RAPIDAPI_KEY,
          "X-RapidAPI-Host": "hotels4.p.rapidapi.com",
        },
      })
      .then((res) => setData(res.data))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  };
  return { data, loading, error, reFetch };
};
export default useFetch;
