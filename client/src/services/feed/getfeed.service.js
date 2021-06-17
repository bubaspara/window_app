export const getFeed = async (setFeed) => {
  const cookieSplit = document.cookie.split("=");
  const data = {
    token: cookieSplit[1],
  };
  await fetch(`${process.env.REACT_APP_BASE_URL}/feed/feeds`, {
    method: "POST",
    credentials: "include",
    mode: "cors",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      "Access-Control-Allow-Origin": "http://localhost:3000",
      "Access-Control-Allow-Credentials": true,
    },
  })
    .then((res) => {
      res
        .json()
        .then((result) => setFeed(result))
        .catch((err) => console.error(err));
    })
    .catch((err) => console.error(err));
};
