import React from "react";
import {
  Flex,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Button,
  Input,
  Alert,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const history = useHistory();

  const [name, setName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const { setAuthState } = useAuth();

  const login = () => {
    setError("");
    const data = { name: name, password: password };
    fetch("http://localhost:3001/auth/login", {
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
        console.log("Response", res);
        if (res.ok) {
          history.push("/");
          setAuthState(true);
        } else {
          setError("Wrong username/password combination");
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <Flex width="full" height="100vh" align="center" justifyContent="center">
      <Box p={2}>
        <Box textAlign="center">
          <Heading>Login</Heading>
        </Box>
        {error ? <Alert status="error">{error}</Alert> : ""}
        <Box my={4} textAlign="left">
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input
              placeholder="Name"
              name="name"
              onChange={(e) => setName(e.target.value)}
            />
          </FormControl>
          <FormControl mt={6}>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              placeholder="*******"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          <Button width="full" mt={4} onClick={login}>
            Log In
          </Button>
          <p>
            Don't have an account? <Link to="/signup">Sign Up!</Link>
          </p>
        </Box>
      </Box>
    </Flex>
  );
}
