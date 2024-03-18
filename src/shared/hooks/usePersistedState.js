import React, { useEffect } from "react";

export default function usePersistedState(key, defaultValue) {
  const isServer = typeof window === "undefined";
  const [state, setState] = React.useState(
    () => (!isServer && JSON.parse(localStorage.getItem(key))) || defaultValue
  );
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);
  return [state, setState];
}
