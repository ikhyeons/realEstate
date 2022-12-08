import React from 'react'
import MapBody from '../Components/ViewMap/MapBody'
import SideList from '../Components/ViewMap/SideList'
import styled from 'styled-components'
import Header from '../Components/Header'

const SViewMap = styled.div`
  display: flex;
  width: 100vw;
  height: 93vh;
  margin-top: 7vh;
  margin-top: max(7vh, 60px);
`

const ViewMap: React.FC = () => {
  return (
    <>
      <Header />
      <SViewMap>
        <SideList />
        <MapBody />
      </SViewMap>
    </>
  )
}

export default ViewMap
