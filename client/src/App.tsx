import { ChakraProvider } from "@chakra-ui/react";
import Router from "./Router/Router";
import { AuthProvider } from "./context/AuthContext";
import React from "react";

function App() {
  return (
    <ChakraProvider>
      <AuthProvider>
        <Router></Router>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App;
