import React from 'react'
import MapBody from '../Components/ViewMap/MapBody'
import SideList from '../Components/ViewMap/SideList'
import styled from 'styled-components'
import Header from '../Components/Common/Header/Header'
import InfoModalMain from '../Components/ViewMap/InfoModal/InfoModalMain'
import { useRecoilState } from 'recoil'
import { AIsInfoOn } from '../AtomStorage'

const SViewMap = styled.div`
  display: flex;
  width: 100vw;
  height: 100%;
  position: relative;
`

const SWrap = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`

const ViewMap: React.FC = () => {
  const [isInfoOn, setIsInfoOn] = useRecoilState(AIsInfoOn)
  return (
    <SWrap>
      <Header />
      <SViewMap>
        <SideList />
        <MapBody />
        {isInfoOn === true ? <InfoModalMain /> : null}
      </SViewMap>
    </SWrap>
  )
}

export default ViewMap
