import { createGlobalStyle } from 'styled-components'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import Check from './Components/Check'
import { QueryClient, QueryClientProvider } from 'react-query'
import { CookiesProvider } from 'react-cookie'

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
const queryClient = new QueryClient()
const App: React.FC = () => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <CookiesProvider>
            <GlobalStyle />
            <div></div>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<ViewMap />} />
                <Route path="/join" element={<JoinPage />} />
                <Route path="/community/*" element={<CommunityPage />} />
              </Routes>
            </BrowserRouter>
          </CookiesProvider>
        </RecoilRoot>
      </QueryClientProvider>
    </>
  )
}

export default App
