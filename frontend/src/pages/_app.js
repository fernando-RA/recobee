import { ChakraProvider } from "@chakra-ui/react";
import ReactDOM from "react-dom";

import "../styles/mains.scss";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
        <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
