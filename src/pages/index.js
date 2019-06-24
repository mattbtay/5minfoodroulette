import React, { useState } from "react"
import { useStaticQuery, graphql } from "gatsby"
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
} from "@material-ui/core"
import Paper from "@material-ui/core/Paper"
import { makeStyles } from "@material-ui/core/styles"
import Layout from "../components/layout"

const IndexPage = () => {
  const [Rest, setRest] = useState("")

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

  var dataGrabber = new Promise(function(resolve, reject) {
    var rests = data.allDataJson.edges[0].node.features.filter(function(i) {
      return i.properties.EstablishmentType === "Fast Food"
    })
    resolve(rests)
  })

  var clicker = () => {
    dataGrabber
      .then(function(rests) {
        //console.log(rests)
        //debugger
        var count = rests.length

        var randRest =
          rests[Math.floor(Math.random() * Math.floor(count))].properties
        return randRest
      })
      .then(function(randRest) {
        setRest(randRest)
      })
  }

  return (
    <Layout>
      <Container maxWidth="md">
        <Paper square={false} className={classes.main}>
          {data.site.siteMetadata.description}

          <Button variant="contained" onClick={clicker}>
            Get Some Data
          </Button>
        </Paper>
        {Rest ? (
          <Typography id="contentBox">
            Chosen:
            <br />
            {Rest.FacilityName}
            <br />
            {Rest.PropertyAddress}
            <br />
            {Rest.InspectionScore.length > 1
              ? `Last inspection score was ${Rest.InspectionScore} received on ${Rest.InspectionDateText}`
              : "Inspection pending"}
          </Typography>
        ) : (
          ""
        )}
      </Container>
    </Layout>
  )
}

export default IndexPage
