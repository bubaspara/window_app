export const SingupService = async (data, history, { setSubmitting }) => {
  setSubmitting(true);
  await fetch(`${process.env.REACT_APP_BASE_URL}/auth/register`, {
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
      history.push("/");
      setSubmitting(false);
    })
    .catch((err) => console.error(err));
};
