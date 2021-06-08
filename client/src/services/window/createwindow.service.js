import { isURL } from "../../utils/isURL";

export const createwindow = async (id, windows, feedId, link) => {
  console.log(windows);
  let tempArray = windows;
  let tempItem = tempArray.filter((el) => el.id === id);
  tempItem[0].feedId = feedId;

  if (link !== "") {
    if (isURL(link)) tempItem[0].type = 1;
    else tempItem[0].type = 0;
    tempItem[0].content = link;
  }

  await fetch("http://localhost:3001/window/createwindow", {
    method: "POST",
    mode: "cors",
    credentials: "include",
    body: JSON.stringify(tempItem),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      "Access-Control-Allow-Origin": "http://localhost:3000",
      "Access-Control-Allow-Credentials": true,
    },
  })
    .then((res) => {
      if (!res.ok) {
        console.log(res);
      }
    })
    .catch((err) => console.error(err));
};
