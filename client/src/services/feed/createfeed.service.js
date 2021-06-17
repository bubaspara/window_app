export const CreateFeedService = async (data, history, { setSubmitting }) => {
  setSubmitting(true);
  await fetch(`${process.env.REACT_APP_BASE_URL}/feed/createfeed`, {
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
      if (!res.ok) {
        console.log(res);
        setSubmitting(false);
      } else {
        history.push("/");
      }
    })
    .catch((err) => console.error(err));
};
