import React from "react";
import {
  Flex,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";

export default function Login() {
  const history = useHistory();

  // Function for when isAuth is true (When we click sign in) so it redirects us to the home page
  const redirectTo = () => {
    history.push("/");
  };

  return (
    <Flex width="full" height="100vh" align="center" justifyContent="center">
      <Box p={2}>
        <Box textAlign="center">
          <Heading>Login</Heading>
        </Box>
        <Box my={4} textAlign="left">
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input type="email" placeholder="email@email.com" />
          </FormControl>
          <FormControl mt={6}>
            <FormLabel>Password</FormLabel>
            <Input type="password" placeholder="*******" />
          </FormControl>
          <Button width="full" mt={4} onClick={redirectTo}>
            Sign In
          </Button>
          <p>
            Don't have an account? <Link to="/signup">Sign Up!</Link>
          </p>
        </Box>
      </Box>
    </Flex>
  );
}
