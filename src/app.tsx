import { createGlobalStyle } from 'styled-components'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './Components/Header'
import ViewMap from './page/ViewMapPage'
import CommunityPage from './page/CommunityPage'
import JoinPage from './page/JoinPage'
import RoomPage from './page/RoomPage'

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
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ViewMap />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/join" element={<JoinPage />} />
          <Route path="/room" element={<RoomPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
