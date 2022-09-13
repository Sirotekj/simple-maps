import styled from 'styled-components'

export const SimpleMapContainer = styled.div`
  position: relative;
  width: 100%;
  background-color: #100F0F;
  svg {
    g g {
      fill: #1A1818;
      stroke: #FFF;
    }
    .rsm-marker {
      stroke-width: 0.5;
    }
  }
`
export const  SimpleMapLegend = styled.div`
  position: relative;
  padding: 4px 12px;
  display: flex;
  background-color: #100F0F;
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

export const SimpleMapPopup = styled.div<{ isActive: boolean }>`
  display: ${(props) => (props.isActive ? "block" : "none" )};
  position: absolute;
  div {
    position: absolute;
    bottom: 4px;
    left: 0;
    transform: translateX(-50%);
    width: 212px;
    padding: 12px;
    background-color: rgba(0,0,0,0.6);
    color: white;
    border-radius: 5px;

  }
`
