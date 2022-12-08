import React from 'react'
import Header from '../Components/Header'
import styled from 'styled-components'

const SRoom = styled.div`
  display: flex;
  width: 100vw;
  height: 93vh;
  margin-top: max(7vh, 60px);
`

const RoomPage: React.FC = () => {
  return (
    <>
      <Header />
      <SRoom>RoomPage</SRoom>
    </>
  )
}

export default RoomPage
