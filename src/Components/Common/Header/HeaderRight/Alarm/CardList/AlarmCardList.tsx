import styled from 'styled-components'

import AlarmChatCard from './AlarmChatCard'
import AlarmDocCard from './AlarmDocCard'
const SCardList = styled.ul``

const AlarmCardList = () => {
  return (
    <SCardList>
      <AlarmChatCard />
      <AlarmDocCard />
    </SCardList>
  )
}

export default AlarmCardList
