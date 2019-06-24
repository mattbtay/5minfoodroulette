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
  const [Rest, setRest] = useState("none chosen")

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

  var clicker = () => {
    dataGrabber
      .then(function(rests) {
        //console.log(rests)
        var bad = rests.filter(function(i) {
          return i.properties.InspectionScore === "80"
        })
        return bad
      })
      .then(function(bad) {
        var tacos = bad.filter(function(i) {
          return i.properties.FacilityName === "TAQUERIA SALTILLO"
        })
        return tacos
      })
      .then(function(tacos) {
        //debugger
        var [FacilityName] = tacos[0].properties
        setRest(tacos[0].properties.FacilityName)
      })
  }

  var dataGrabber = new Promise(function(resolve, reject) {
    var rests = data.allDataJson.edges[0].node.features.filter(function(i) {
      return i.properties.EstablishmentType === "Fast Food"
    })
    resolve(rests)
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

          <Button variant="contained" onClick={clicker}>
            Get Some Data
          </Button>
        </Paper>
        <Typography id="contentBox">Chosen: {Rest}</Typography>
      </Container>
    </Layout>
  )
}

export default IndexPage
