import React, { useState } from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Container, Button, Typography } from "@material-ui/core"
import Paper from "@material-ui/core/Paper"
import { makeStyles } from "@material-ui/core/styles"
import Layout from "../components/layout"
import loading from "../images/loading.svg"

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

  const [Rest, setRest] = useState("")
  const [isLoading, setIsLoading] = useState(0)
  const [List, setList] = useState(function() {
    return data.allDataJson.edges[0].node.features.filter(function(i) {
      return i.properties.EstablishmentType === "Fast Food"
    })
  })

  const useStyles = makeStyles(theme => ({
    main: {
      padding: theme.spacing(3, 2),
      marginTop: 15,
    },
  }))

  const classes = useStyles()

  var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  }

  // error list
  var error = function(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`)
  }

  // do things with the returned data in here
  var success = async function(pos) {
    var crd = pos.coords
    await console.log(crd.latitude + ", " + crd.longitude)
    //await console.log(getLoc())
    await console.log(List)

    function filteralist() {
      var randNum = Math.floor(Math.random() * Math.floor(List.length))
      setRest(List[randNum].properties)
      return List[randNum].properties
    }
    await filteralist()
    setIsLoading(0)
    // get random restaurant
    await console.log(` the choide: ${filteralist()}`)
  }

  // 1. get location of user
  var getLoc = function() {
    return navigator.geolocation.getCurrentPosition(success, error, options)
  }

  //2. get list of all restaurants
  var restList = function() {
    return List
  }

  var dataGrabber = function() {
    setIsLoading(1)
    getLoc()
  }

  return (
    <Layout>
      <Container maxWidth="md">
        <Paper square={false} className={classes.main}>
          {data.site.siteMetadata.description}

          <Button variant="contained" onClick={dataGrabber}>
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
        ) : isLoading ? (
          <img className="loading" src={loading} />
        ) : (
          ""
        )}
      </Container>
    </Layout>
  )
}

export default IndexPage
