import React from "react";

import Layout from "../../components/Layout";
import BlogRoll from "../../components/BlogRoll";

export default class BlogIndexPage extends React.Component {
  render() {
    return (
      <Layout>
        <h1 className="section-title">Latest Stories</h1>
        <section className="section">
          <article>
            <BlogRoll />
          </article>
        </section>
      </Layout>
    );
  }
}
