import React, { useEffect } from "react";
import Navbar from "./Navbar";

const Layout = ({ id, children }) => {
  return (
    <>
      <Navbar></Navbar>
      <main>{children}</main>
    </>
  );
};
export default Layout;
