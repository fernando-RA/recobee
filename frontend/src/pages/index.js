import React from "react";

import Footer from "components/Footer";
import Header from "components/Header";
import Layout from "components/Layout";
import SEO from "components/SEO";

const IndexPage = () => (
  <Layout id="home">
    <SEO
      description=""
      title="Recobee"
    />
    <Header />
    <Footer />
  </Layout>
);

export default IndexPage;
