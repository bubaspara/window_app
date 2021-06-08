export const updateFeed = (id, updatedValue, setError) => {
  let data = {
    updatedValue: `${updatedValue}`,
  };
  if (updatedValue) {
    setError("");
    fetch(`http://localhost:3001/feed/update/${id}`, {
      method: "PUT",
      credentials: "include",
      body: JSON.stringify(data),
      mode: "cors",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "Access-Control-Allow-Origin": "http://localhost:3000",
        "Access-Control-Allow-Credentials": true,
      },
    })
      .then((res) => {
        console.log(res.json());
      })
      .catch((err) => console.error(err));
  } else {
    setError(`Can't be empty`);
  }
};
