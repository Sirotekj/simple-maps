import styled from 'styled-components'

export const SimpleMapContainer = styled.div`
  position: relative;
  width: 100%;
  background-color: #100F0F;
  svg {
    fill: #1A1818;
    stroke: #FFF;
    .rsm-marker {
      stroke-width: 0.5;
    }
  }
`
export const  SimpleMapLegend = styled.div`
  position: absolute;
  display: flex;
  left: 12px;
  top: 12px;
  color: white;
`
export const  SimpleMapLegendItem = styled.div<{ color: string }>`
  padding-right: 8px;
  &:before {
    content:"";
    display: inline-block;
    width: 10px;
    height: 10px;
    border:1px solid white;
    margin-right: 2px;
    background: ${ (props) => props.color }
  }
`

export const SimpleMapPopup = styled.div`
  display: none;
  position: absolute;
  width: 212px;
  padding: 12px;
  background-color: rgba(255,255,255,0.2);
  color: white;
`
