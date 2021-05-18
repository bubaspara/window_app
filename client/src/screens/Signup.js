import React, { useRef, useState } from "react";
import {
  Flex,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Alert,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function SignUp() {
  const emailRef = useRef();
  const passRef = useRef();
  const passConfRef = useRef();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (passRef.current.value !== passConfRef.current.value) {
      return setError(`Passwords do not match`);
    }

    try {
      setError("");
      setLoading(true);
    } catch {
      setError(`Failed to create an account`);
    }
    setLoading(false);
  };
  return (
    <Flex width="full" height="100vh" align="center" justifyContent="center">
      <Box p={2}>
        <Box textAlign="center">
          <Heading>Signup</Heading>
        </Box>
        <form onSubmit={handleSubmit}>
          {error && <Alert status="error">{error}</Alert>}
          <Box my={4} textAlign="left">
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                ref={emailRef}
                placeholder="email@email.com"
                required
              />
            </FormControl>
            <FormControl mt={6}>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                ref={passRef}
                placeholder="*******"
                required
              />
            </FormControl>
            <FormControl mt={6}>
              <FormLabel>Confirm Password</FormLabel>
              <Input
                type="password"
                ref={passConfRef}
                placeholder="*******"
                required
              />
            </FormControl>
            <Button width="full" mt={4} type="submit" disabled={loading}>
              Sign Up
            </Button>
            <p>
              Already have an account? <Link to="login">Login!</Link>
            </p>
          </Box>
        </form>
      </Box>
    </Flex>
  );
}
