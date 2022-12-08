import React from 'react'
import Header from '../Components/Header'
import styled from 'styled-components'

const SCommunity = styled.div`
  display: flex;
  width: 100vw;
  height: 93vh;
  margin-top: max(7vh, 60px);
`

const CommunityPage: React.FC = () => {
  return (
    <>
      <Header />
      <SCommunity>Community Page</SCommunity>
    </>
  )
}

export default CommunityPage
