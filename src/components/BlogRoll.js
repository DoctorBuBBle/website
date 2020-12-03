import React from "react";
import PropTypes from "prop-types";
import { graphql, Link, StaticQuery } from "gatsby";
import Timeline from "./Timeline";

const getImageSrc = (image) =>
  !!image?.childImageSharp ? image.childImageSharp.fluid.src : image;

class BlogRoll extends React.Component {
  render() {
    const { data } = this.props;
    const { edges: posts } = data.allMarkdownRemark;

    const setup = {
      data: posts,
      getTimestamp: ({ node: post }) => post.frontmatter.date,
      getText: ({ node: post }) => {
        return (
          <>
            <Link to={post.fields.slug}>
              <h1 style={{ whiteSpace: "normal" }}>{post.frontmatter.title}</h1>
            </Link>
            <p>{post.excerpt}</p>
            <br />
            <br />
            <Link to={post.fields.slug}>Keep Reading →</Link>
          </>
        );
      },
      getImageSrc: ({ node: post }) =>
        getImageSrc(post.frontmatter.featuredimage),
    };

    return <Timeline {...setup} />;
  }
}

BlogRoll.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
};

export default () => (
  <StaticQuery
    query={graphql`
      query BlogRollQuery {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
        ) {
          edges {
            node {
              excerpt(pruneLength: 400)
              id
              fields {
                slug
              }
              frontmatter {
                title
                templateKey
                date(formatString: "DD.MM.YYYY")
                featuredpost
                featuredimage {
                  childImageSharp {
                    fluid(maxWidth: 1000, quality: 100) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
            }
          }
        }
      }
    `}
    render={(data, count) => <BlogRoll data={data} count={count} />}
  />
);
