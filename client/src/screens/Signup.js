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
import { SingupService } from "../services/user/signup.service";

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

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(data, actions) => SingupService(data, history, actions)}
      validationSchema={validationSchema}
    >
      {(formik) => (
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

                <Button
                  width="full"
                  mt={4}
                  type="submit"
                  disabled={formik.isSubmitting}
                >
                  Sign Up
                </Button>

                <p>
                  Already have an account? <Link to="login">Login!</Link>
                </p>
              </Box>
            </Box>
          </Flex>
        </Form>
      )}
    </Formik>
  );
}
