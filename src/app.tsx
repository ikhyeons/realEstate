import { createGlobalStyle } from 'styled-components'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { RecoilRoot } from 'recoil'

import ViewMap from './page/ViewMapPage'
import CommunityPage from './page/CommunityPage'
import JoinPage from './page/JoinPage'

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0; 
    box-sizing: border-box; 
  }
`

const App: React.FC = () => {
  return (
    <>
      <RecoilRoot>
        <GlobalStyle />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<ViewMap />} />
            <Route path="/join" element={<JoinPage />} />
            <Route path="/community" element={<CommunityPage />} />
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
    </>
  )
}

export default App
