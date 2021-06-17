export const LoginService = (
  name,
  password,
  history,
  setAuthState,
  setError
) => {
  setError("");
  const data = { name: name, password: password };
  fetch(`${process.env.REACT_APP_BASE_URL}/auth/login`, {
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
      if (res.ok) {
        history.push("/");
        setAuthState(true);
      } else {
        setError("Wrong username/password combination");
      }
    })
    .catch((err) => console.error(err));
};
