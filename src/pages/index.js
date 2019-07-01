import React, { useState } from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Button } from "@material-ui/core"
import { useSpring, animated } from "react-spring"
import Layout from "../components/layout"
import loading from "../images/loading.svg"
import Logo from "../images/logo.svg"

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
  const [Location, setLocation] = useState(0)
  const [List, setList] = useState(function() {
    return data.allDataJson.edges[0].node.features.filter(function(i) {
      return i.properties.EstablishmentType === "Full Service Restaurant"
    })
  })

  const props = useSpring({ opacity: 1, from: { opacity: 0 } })

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
    //if (Location === false) {
    return navigator.geolocation.getCurrentPosition(success, error, options)
    //} else {
    //   return Location
    //}
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
      <div className="page--wrap">
        <div className="content--wrap">
          <div className="main--logo">
            <img className="logo" src={Logo} alt="logo" />
            <h1 className="logo--text">5 Minute Lunch Roulette</h1>
          </div>

          <p className="desc">{data.site.siteMetadata.description}</p>

          <Button
            variant="contained"
            className="big-ole-button"
            onClick={dataGrabber}
          >
            {!Rest.FacilityName ? "Lunch me!" : "Try again, please"}
          </Button>
        </div>
        {Rest ? (
          <animated.p className="contentBox" style={props}>
            {Rest.FacilityName}
            <br />
            {Rest.PropertyAddress}
            <br />
            {Rest.InspectionScore.length > 1
              ? `Last inspection score was ${Rest.InspectionScore} received on ${Rest.InspectionDateText}`
              : "Inspection pending"}
          </animated.p>
        ) : isLoading ? (
          <img className="loading" src={loading} />
        ) : (
          ""
        )}
      </div>
    </Layout>
  )
}

export default IndexPage
