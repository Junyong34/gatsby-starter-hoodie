import React from "react"
import { Helmet } from "react-helmet"
import styled from "styled-components"
import { graphql } from "gatsby"

import Layout from "components/Layout"
import Bio from "components/Bio"
import PostList from "components/PostList"
import Divider from "components/Divider"

import { title, description, siteUrl } from "../../blog-config"

const Space = styled.div`
  height: 3rem;
`

const BlogIndex = ({ data, location }) => {
  const posts = data.allMarkdownRemark.nodes

  if (posts.length === 0) {
    return (
      <p>
        No blog posts found. Add markdown posts to "content/blog" (or the
        directory you specified for the "gatsby-source-filesystem" plugin in
        gatsby-config.js).
      </p>
    )
  }

  return (
    <Layout>
      <Helmet>
        <title>{title}</title>
        {description && <meta name="description" content={description} />}
        <meta property="og:url" content={siteUrl} />
        <meta property="og:title" content={title} />
        {description && (
          <meta property="og:description" content={description} />
        )}
      </Helmet>
      <Space />
      <Bio />
      <Divider />
      <PostList postList={posts} />
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        excerpt(pruneLength: 200)
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          update(formatString: "MMM DD, YYYY")
          title
          tags
        }
      }
    }
  }
`
