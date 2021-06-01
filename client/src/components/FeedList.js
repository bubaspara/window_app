import React from "react";
import { Link } from "react-router-dom";
import { Flex, Button } from "@chakra-ui/react";
import Feed from "./Feed";

export default function FeedList() {
  const [feed, setFeed] = React.useState([]);

  const getFeed = async () => {
    await fetch("http://localhost:3001/feed/feeds", {
      method: "GET",
      mode: "cors",
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
            .then((response) => {
              setFeed(response);
            })
            .catch((err) => console.error(err));
        }
      })
      .catch((err) => console.error(err));
  };

  React.useEffect(() => {
    getFeed();
  }, []);

  return (
    <Flex direction="column" justifyContent="center" textAlign="center">
      {feed.map((feed) => (
        <Feed key={feed.id} feed={feed} id={feed.id} />
      ))}
      <Link to="/createfeed">
        <Button textAlign="center">Create New Feed</Button>
      </Link>
    </Flex>
  );
}
