import { useEffect, useState } from "react";

const useFetch = (url, method = "GET") => {
  const [restData, setRestData] = useState(null); // null prevents loading before the fetch
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortCont = new AbortController();

    // Fake data
    fetch(url, { signal: abortCont.signal, method: method })
      .then((res) => {
        if (!res.ok) {
          throw Error("could not fetch data for that resource");
        }
        return res.json();
      })
      .then((data) => {
        setRestData(data);
        setLoading(false);
        setError(null);
      })
      .catch((err) => {
        if (err.name === "AbortError") {
          console.log("fetch aborted");
        } else {
          setLoading(false);
          setError(err.message);
        }
        console.error("useFecth Err: ", err);
      });

    return () => abortCont.abort();
  }, [url]);
  return { restData, loading, error };
};

export default useFetch;
