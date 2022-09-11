import React, { useEffect, useState } from "react"
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker
} from "react-simple-maps"
import { SimpleMapContainer } from './styled'

type Texts = {
  city: string
  lat: number,
  lng: number,
  people: number
}[]
//const geoUrl = "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json"
//const geoUrl = "https://docs.rferl.org/Infographics/2022/2022_09/Tajikistan_GBAO/geojson/world-countries.json"
const geoUrl = "https://docs.rferl.org/Infographics/2022/2022_09/Tajikistan_GBAO/geojson/tajikistan-with-regions_.json"
//const geoUrl = "https://data.humdata.org/dataset/ef14d06a-30bf-483d-9550-7210dfa7a535/resource/fd44f924-3b64-41e8-9430-413acc2e7974/download/tajikistan.geojson"
//const geoUrl = "tajikistan-with-regions_.json"

const SimpleMap = () => {

  const dataObject = [
    {
      city:"Rushon",
      lat: 37.9429401,
      lng: 71.5516857,
      people: 17
    },{
      city:"Khorug",
      lat: 37.4761811,
      lng: 71.5424160,
      people: 5
    }
  ] as Texts

  const maxScale = 20;
  const dataObjectScales = dataObject.map((scale) => scale.people)
  const maxValue = Math.max(...dataObjectScales)

  console.log(dataObjectScales)
  const circleScale = (_people: number) => {
    console.log(_people*maxScale/maxValue)
    return Math.sqrt((_people)/Math.PI)*maxScale/Math.sqrt((maxValue)/Math.PI)
  }

  useEffect(() => {

  }, []);

  return (
    <SimpleMapContainer>
      <ComposableMap
        projectionConfig={{
            center: [71.5, 38.8],
            scale: 6600,
          }}
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography key={geo.rsmKey} geography={geo} />
            ))
          }
        </Geographies>
        {dataObject.map(({ city, lng, lat, people }) => {
        return (
          <Marker key={city} coordinates={[lng, lat]}>
            <circle fill="#7D161D" stroke="#FFF" r={circleScale(people)} />
          </Marker>
        );
      })}
      </ComposableMap>
    </SimpleMapContainer>
  )
}
export default SimpleMap
