import React from "react";

import { useMyFetch } from "../hooks/useMyFetch";

export default () => {
  const { isLoading, error, data } = useMyFetch(
    "https://jsonplaceholder.typicode.com/todos/1"
  );

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {data && <p>{JSON.stringify(data)}</p>}
    </div>
  );
};
