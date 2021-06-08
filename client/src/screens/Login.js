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
import { LoginService } from "../services/user/login.service";
import { useHistory } from "react-router";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [name, setName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");

  const history = useHistory();
  const { setAuthState } = useAuth();

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
          <Button
            width="full"
            mt={4}
            onClick={() =>
              LoginService(name, password, history, setAuthState, setError)
            }
          >
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
