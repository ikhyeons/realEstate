import styled from 'styled-components'
import { useLocation } from 'react-router-dom'

import HeaderLeftMain from './HeaderLeft/HeaderLeftMain'
import HeaderLeft from './HeaderLeft/HeaderLeft'
import HeaderRight from './HeaderRight/HeaderRight'

const SHeader = styled.header`
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 3;
  width: 100vw;
  height: 7vh;
  min-height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(45deg, #ffdf65, #f0d060);
`

const SHeaderLeft = styled.div`
  padding: 15px;
  display: flex;
  justify-content: space-around;
`

const SHeaderRight = styled.div`
  width: 400px;
  display: flex;
  justify-content: space-around;
`

const Header: React.FC = () => {
  const currentLocation = useLocation() // 현재 url을 가져올 수 있음

  return (
    <SHeader>
      <SHeaderLeft>
        {currentLocation.pathname !== '/' ? <HeaderLeft /> : <HeaderLeftMain />}
      </SHeaderLeft>

      <SHeaderRight>
        <HeaderRight />
      </SHeaderRight>
    </SHeader>
  )
}

export default Header
