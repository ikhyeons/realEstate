import { useState } from 'react'
import styled from 'styled-components'
import { useMutation, useQuery } from 'react-query'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'

import Popover from '@mui/material/Popover'
import Box from '@mui/material/Box'
import Port from '../../../../../../port'
import { useRecoilState } from 'recoil'
import { AchatSocket, AreplySocket } from '../../../../../AtomStorage'

const SProfile = styled.div`
  border-radius: 50%;
  width: 50px;
  background: lightyellow;
  margin: 0 5px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 24px;
  cursor: pointer;
  :hover {
    border: 2px solid black;
  }
`

const SChangeMyInfo = styled.div`
  cursor: pointer;
  padding: 5px;
  :hover {
    background: rgba(0, 0, 0, 0.1);
  }
`

const SLogout = styled.div`
  border-top: 1px solid black;
  cursor: pointer;
  padding: 5px;
  :hover {
    background: rgba(0, 0, 0, 0.1);
  }
`

const ProfileBtn = () => {
  const [chatSoket] = useRecoilState(AchatSocket)
  const [replySoket] = useRecoilState(AreplySocket)
  const navigate = useNavigate()
  const [isPopOpen, setIsPopOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const [, setCookies] = useCookies(['isLogin'])
  const [first, setFirst] = useState<string>('')

  const logOut = useMutation<mutationData>(
    () =>
      axios.post(
        `http://${Port}/session/logout`,
        {},
        {
          withCredentials: true,
        },
      ),
    {
      onSuccess: (data) => {
        console.log(data)
        if (data.data.result === 0) {
          setCookies('isLogin', 'false')
        } else if (data.data.result === 1)
          alert('DB오류발생! 하지만 로그아웃은 함 ')
        else alert('또다른 무언가')
      },
      onSettled: () => {
        navigate('/')
        window.location.reload()
      },
    },
  )

  const { status, error, data, refetch } = useQuery<headerUserInfo>(
    ['readUserInfo'],
    () =>
      axios.get(`http://${Port}/user/readUserInfo`, {
        withCredentials: true,
      }),
    {
      onSuccess: (data) => {
        setFirst(data.data.data[0].userName[0])
      },
    },
  )

  return (
    <>
      <SProfile
        onClick={(event: React.MouseEvent<HTMLElement>) => {
          /*클릭 했을 때*/
          setAnchorEl(
            event.currentTarget,
          ) /*지금 클릭된 버튼을 anchorEl에 저장함*/
          setIsPopOpen(
            (prev) => !prev,
          ) /*isPopOpen은 팝업창을 열림, 닫음을 결정함, 이전값이 열림이면 닫힘으로, 닫힘이면 열림으로*/
        }}
      >
        {first}
      </SProfile>
      {isPopOpen === true ? (
        <Popover /*로그인 버튼 클릭 시 나오는 팝업 mui*/
          sx={{ marginTop: '12px' }}
          open={isPopOpen} /*isPopOpen이 true면 열림, 아니면 닫힘*/
          onClose={() =>
            setIsPopOpen(false)
          } /*isPopOpen을 false로 바꾸어 닫히게 하는 함수*/
          anchorEl={anchorEl} /*어느 버튼에 종속할 건지 결정*/
          anchorOrigin={{
            /*클릭했을 때 튀어나오는 위치*/
            vertical: 'bottom',
            horizontal: 'right',
          }}
        >
          <Box sx={{ padding: '6px', width: '150px' }}>
            <SChangeMyInfo>정보수정</SChangeMyInfo>
            <SLogout
              onClick={() => {
                logOut.mutate()
                chatSoket()?.disconnect()
                replySoket()?.disconnect()
              }}
            >
              로그아웃
            </SLogout>
          </Box>
        </Popover>
      ) : null}
    </>
  )
}

export default ProfileBtn
