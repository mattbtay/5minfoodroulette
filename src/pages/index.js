import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Container, Box, TextField } from "@material-ui/core"
import Paper from "@material-ui/core/Paper"
import { makeStyles } from "@material-ui/core/styles"
import Layout from "../components/layout"

const IndexPage = () => {
  const data = useStaticQuery(graphql`
    query SiteDescriptionQuery {
      site {
        siteMetadata {
          description
        }
      }
    }
  `)

  const useStyles = makeStyles(theme => ({
    main: {
      padding: theme.spacing(3, 2),
      marginTop: 15,
    },
  }))

  const classes = useStyles()

  return (
    <Layout>
      <Container maxWidth="md">
        <Paper square={false} className={classes.main}>
          {data.site.siteMetadata.description}
          <Box className="box-wrapper">
            <TextField
              id="outlined-name"
              label="Your Address"
              className={null}
              value=""
              onChange={null}
              margin="normal"
              variant="outlined"
            />
          </Box>
        </Paper>
      </Container>
    </Layout>
  )
}

export default IndexPage
