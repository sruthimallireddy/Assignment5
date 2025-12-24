import { useState, useEffect, useCallback, useRef } from 'react';

export default function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const controllerRef = useRef(null);

  const fetchData = useCallback(async (signal) => {
    if (!url) return;
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(url, { signal });
      if (!res.ok) {
        throw new Error(`${res.status} ${res.statusText}`);
      }
      const json = await res.json();
      setData(json);
    } catch (err) {
      if (err.name === 'AbortError') return; // fetch was aborted
      setError(err);
      setData(null);
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  const refetch = useCallback(() => {
    if (controllerRef.current) {
      controllerRef.current.abort();
    }
    controllerRef.current = new AbortController();
    fetchData(controllerRef.current.signal);
  }, [fetchData]);

  useEffect(() => {
    if (!url) return;
    controllerRef.current = new AbortController();
    fetchData(controllerRef.current.signal);

    return () => {
      if (controllerRef.current) controllerRef.current.abort();
    };
  }, [url, fetchData]);

  return { data, loading, error, refetch };
}
