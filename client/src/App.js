import { ChakraProvider } from "@chakra-ui/react";
import Router from "./Router/Router";

function App() {
  return (
    <ChakraProvider>
      <Router></Router>
    </ChakraProvider>
  );
}

export default App;
