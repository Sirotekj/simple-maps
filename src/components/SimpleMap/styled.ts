import styled from 'styled-components'

export const SimpleMapContainer = styled.div`
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
export const SimpleMapPopup = styled.div`
  display: none;
  position: absolute;
  width: 212px;
  background-color: rgba(255,255,255,0.2);
  color: white;
`
