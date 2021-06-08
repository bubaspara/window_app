export const getWindows = async (feedId, setWindows) => {
  await fetch("http://localhost:3001/window/windows", {
    method: "POST",
    credentials: "include",
    mode: "cors",
    body: JSON.stringify({ feedId: `${feedId}` }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      "Access-Control-Allow-Origin": "http://localhost:3000",
      "Access-Control-Allow-Credentials": true,
    },
  })
    .then((res) => {
      if (res.ok) {
        res
          .json()
          .then((results) => setWindows(results))
          .catch((err) => console.error(err));
      }
    })
    .catch((err) => console.error(err));
};
