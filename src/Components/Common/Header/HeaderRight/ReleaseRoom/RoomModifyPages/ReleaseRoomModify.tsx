import styled from 'styled-components'

import Modify1 from './Modify1'
import Modify2 from './Modify2'
import { useRecoilState } from 'recoil'
import { AModifyStep } from '../../../../../../AtomStorage'

const Sform = styled.form``

const ReleaseRoomModify = () => {
  const [modifyStep] = useRecoilState(AModifyStep)
  return (
    <Sform>
      {modifyStep === 'first' ? (
        <Modify1 />
      ) : modifyStep === 'second' ? (
        <Modify2 />
      ) : null}
    </Sform>
  )
}

export default ReleaseRoomModify
