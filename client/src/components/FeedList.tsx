import React from "react";
import { Link } from "react-router-dom";
import { Flex, Button } from "@chakra-ui/react";
import Feed from "./Feed";
import { getFeed } from "../services/feed/getfeed.service";
import {IFeeds} from '../interfaces/Interfaces'

export default function FeedList() {
  const [feed, setFeed] = React.useState<IFeeds[]>([]);

  React.useEffect(() => {
    getFeed(setFeed);
  }, []);

  return (
    <Flex direction="column" justifyContent="center" align="center">
      {feed.map((feed) => (
        <Feed key={feed.id} feed={feed} id={feed.id} />
      ))}
      <Link to="/createfeed">
        <Button textAlign="center">Create New Feed</Button>
      </Link>
    </Flex>
  );
}
