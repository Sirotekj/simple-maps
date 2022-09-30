import React, { useState, useRef } from "react"
import useMouse from '@react-hook/mouse-position'
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
  Marker
} from "react-simple-maps"
import { SimpleMapContainer, SimpleMapLegend, SimpleMapLegendItem, SimpleMapPopup } from './styled'

type Texts = {
  id: number
  city: string
  lat: number
  lng: number
  people: number
  date: string
  color: string
}[]
//const geoUrl = "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json"
//const geoUrl = "https://docs.rferl.org/Infographics/2022/2022_09/Tajikistan_GBAO/geojson/world-countries.json"
const geoUrl = "https://docs.rferl.org/Infographics/2022/2022_09/Tajikistan_GBAO/geojson/tajikistan-with-regions_.json"
//const geoUrl = "https://data.humdata.org/dataset/ef14d06a-30bf-483d-9550-7210dfa7a535/resource/fd44f924-3b64-41e8-9430-413acc2e7974/download/tajikistan.geojson"
//const geoUrl = "tajikistan-with-regions_.json"


const SimpleMap = () => {

  const monthsArr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const popupText = "On / at least /&nbsp;people were known to have been killed in the crackdown in ";

  const dataObject = [
    {
      id: 1,
      city:"Rushon",
      lat: 37.9429401,
      lng: 71.5516857,
      people: 17,
      date: "unknown date",
      color: "rgba(100,100,100,0.8)"
    },{
      id: 2,
      city:"Rushon",
      lat: 37.9429401,
      lng: 71.5516857,
      people: 5,
      date: "2022-05-31",
      color: "#7D161D"//"rgba(125,22,29,0.5)"
    },{
      id: 3,
      city:"Rushon",
      lat: 37.9429401,
      lng: 71.5516857,
      people: 4,
      date: "2022-05-18",
      color: "#A71D26"//"rgba(125,22,29,0.7)"
    },{
      id: 4,
      city:"Rushon",
      lat: 37.9429401,
      lng: 71.5516857,
      people: 3,
      date: "2022-05-19",
      color:"#D12430"//"rgba(125,22,29,1)"
    },{
      id: 5,
      city:"Khorug",
      lat: 37.4761811,
      lng: 71.5424160,
      people: 2,
      date: "2022-06-12",
      color: "#EA6903"//"rgba(234,105,3,0.4)"
    },{
      id: 6,
      city:"Khorug",
      lat: 37.4761811,
      lng: 71.5424160,
      people: 1,
      date: "2022-05-22",
      color: "#EE8735"//"rgba(234,105,3,0.6)"
    }
  ] as Texts

  const [popup, setPopup] = useState(false)
  const [popupContent, setPopupContent] = useState("");

  const openPopup = (id:number) => {
    console.log(id)
    setPopup(true);
    setPopupContent(
      dataObject[(id-1)].city +
      "<br>" +
      popupText.split("/")[0] +
      dataObject[(id-1)].date +
      popupText.split("/")[1] +
      dataObject[(id-1)].people +
      popupText.split("/")[2] +
      dataObject[(id-1)].city
    );
  }

  const maxScale = 46;
  const dataObjectScales = dataObject.map((scale) => scale.people)
  const maxValue = Math.max(...dataObjectScales)

  const circleScale = (_people: number) => {
    return Math.sqrt((_people)/Math.PI)*maxScale/Math.sqrt((maxValue)/Math.PI)
  }

  const ref = React.useRef<HTMLDivElement>(null)
  const mouse = useMouse(ref, {
    enterDelay: 100,
    leaveDelay: 100,
  })

  return (
    <SimpleMapContainer ref={ref}>
      <SimpleMapLegend>
        {dataObject.map(({ id, date, color }) => {
          return(
            <SimpleMapLegendItem key={id} color={ color }>
              {date=="unknown date"?date:monthsArr[Number(date.split("-")[1])-1]+ " " + date.split("-")[2]}
            </SimpleMapLegendItem>
          )
        })}
      </SimpleMapLegend>
      <ComposableMap
        projectionConfig={{
            center: [71.5, 38.8],
            scale: 6600,
          }}
      >
        <ZoomableGroup minZoom={1} maxZoom={3}>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography key={geo.rsmKey} geography={geo} />
              ))
            }
          </Geographies>
          {dataObject.map(({ id, city, lng, lat, people, date, color }) => {
          return (
            <Marker
              key={id}
              coordinates={[lng, lat]}
              onMouseOver={() => openPopup(id)}
              onMouseOut={() => {setPopup(false)}}
            >
              <circle fill={color} stroke="#FFF" r={circleScale(people)} />
            </Marker>
            );
          })}
        </ZoomableGroup>
      </ComposableMap>
      <SimpleMapPopup isActive={ popup } style={{top: mouse.y+"px", left: mouse.x+"px"}}>
        <div dangerouslySetInnerHTML={{__html:popupContent}}>
        </div>
      </SimpleMapPopup>
    </SimpleMapContainer>
  )
}
export default SimpleMap
