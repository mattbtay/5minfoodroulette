import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Container, Box, TextField, Typography } from "@material-ui/core"
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
      allDataJson {
        edges {
          node {
            id
            features {
              properties {
                EstablishmentType
                FacilityName
                Inspection
                PropertyAddress
                XCoord
                YCoord
                InspectionScore
                InspectionDateText
              }
            }
          }
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

  var rests = data.allDataJson.edges[0].node.features.filter(function(i) {
    return i.properties.EstablishmentType === "Fast Food"
  })

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
          {rests.map(function(rest, i) {
            return (
              <Typography
                variant="body1"
                element="body1"
                key={rest.properties.FacilityName + i}
              >
                {rest.properties.FacilityName}
                <br />
                {rest.properties.PropertyAddress}
                <br />
                Inspection Score: {rest.properties.InspectionScore}
                <br />
                <br />
              </Typography>
            )
          })}
        </Paper>
      </Container>
    </Layout>
  )
}

export default IndexPage
