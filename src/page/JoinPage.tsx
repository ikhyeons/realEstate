import React from 'react'
import Header from '../Components/Header'
import styled from 'styled-components'

const SJoin = styled.div`
  display: flex;
  width: 100vw;
  height: 93vh;
  margin-top: 7vh;
  align-items: center;
`

const SForm = styled.form`
  width: 1000px;
  height: 800px;
  background: #ffef87;
  padding: 20px;
  margin: 0 auto;
`

const JoinPage: React.FC = () => {
  return (
    <>
      <Header />
      <SJoin>
        <SForm>Join Page</SForm>
      </SJoin>
    </>
  )
}

export default JoinPage
