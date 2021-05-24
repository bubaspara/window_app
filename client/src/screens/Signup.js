import React from "react";
import {
  Flex,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Button,
} from "@chakra-ui/react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";

export default function SignUp() {
  const history = useHistory();

  const initialValues = {
    name: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    password: Yup.string().required("Password is required"),
  });

  const onSubmit = async (data) => {
    console.log(JSON.stringify(data));
    setLoading(true);
    await fetch("http://localhost:3001/auth/register", {
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
        setLoading(false);
        history.push("/");
      })
      .catch((err) => console.error(err));
  };

  const [loading, setLoading] = React.useState(false);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      <Form>
        <Flex
          width="full"
          height="100vh"
          align="center"
          justifyContent="center"
        >
          <Box p={2}>
            <Box textAlign="center">
              <Heading>Signup</Heading>
            </Box>
            <Box my={4} textAlign="left">
              <FormControl>
                <FormLabel>Username</FormLabel>
                <Field name="name" placeholder="Username" />
              </FormControl>

              <FormControl mt={6}>
                <FormLabel>Password</FormLabel>
                <Field type="password" name="password" placeholder="******" />
              </FormControl>

              <Button width="full" mt={4} type="submit" disabled={loading}>
                Sign Up
              </Button>

              <p>
                Already have an account? <Link to="login">Login!</Link>
              </p>
            </Box>
          </Box>
        </Flex>
      </Form>
    </Formik>
  );
}
