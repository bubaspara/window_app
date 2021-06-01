import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import {
  FormControl,
  FormLabel,
  Button,
  Flex,
  Box,
  Heading,
} from "@chakra-ui/react";
import * as Yup from "yup";
import { useHistory } from "react-router";

export default function CreateFeed() {
  const history = useHistory();

  const initialValues = {
    name: "",
    background_color: "",
    cookie: document.cookie,
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    background_color: Yup.string(),
  });

  const onSubmit = async (data) => {
    await fetch("http://localhost:3001/feed/createfeed", {
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
        if (!res.ok) {
          console.log(res);
        } else {
          history.push("/");
        }
      })
      .catch((err) => console.error(err));
  };

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
              <Heading>Create A Feed</Heading>
            </Box>
            <Box my={4} textAlign="left">
              <FormControl>
                <FormLabel>Name</FormLabel>
                <ErrorMessage name="name" component="span" />
                <Field
                  id="inputCreateFeed"
                  name="name"
                  placeholder="Feed Name"
                />
              </FormControl>
              <FormControl mt={6}>
                <FormLabel>Background Color</FormLabel>
                <ErrorMessage name="background_color" component="span" />
                <Field
                  id="inputCreateFeed"
                  name="background_color"
                  placeholder="Feed Background Color"
                />
              </FormControl>
              <Button width="full" mt={4} type="submit">
                Create
              </Button>
            </Box>
          </Box>
        </Flex>
      </Form>
    </Formik>
  );
}
