import { useState } from 'react'
import styled from 'styled-components'
import { useQueries, useMutation, useQueryClient } from 'react-query'
import axios from 'axios'
import Port from '../../../../../../port'

import Button from '@mui/material/Button'
import Popover from '@mui/material/Popover'
import Box from '@mui/material/Box'
import Switch from '@mui/material/Switch'

import ReleaseRoomTrue from './ReleaseRoomTrue'
import ReleaseRoomModify from './ReleaseRoomModify'
import { useRecoilState } from 'recoil'
import { AcurrentImg, ARIsModify } from '../../../../../AtomStorage'

const ReleaseRoom = () => {
  const [, setCurrentImg] = useRecoilState(AcurrentImg)
  const queryClient = useQueryClient() // 등록된 quieryClient 가져오기
  const [isPopOpen, setIsPopOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [isModify, setIsModify] = useRecoilState(ARIsModify)

  const dropdownSX = {
    padding: '6px',
    width: '600px',
    display: 'flex',
    flexDirection: 'column',
  }

  const STop = styled.div`
    display: flex;
    justify-content: space-between;
  `

  const SOFdiv = styled.div<{ release: string }>`
    color: ${(prop) =>
      Number(prop.release) == 1 ? 'lightgreen' : 'lightgray'};
    text-shadow: ${(prop) =>
      Number(prop.release) == 1
        ? '-1px 0 rgb(0, 150, 0), 0 1px rgb(0, 150, 0), 1px 0 rgb(0, 150, 0), 0 -1px rgb(0, 150, 0)'
        : '-1px 0 rgb(130, 130, 130), 0 1px rgb(130, 130, 130), 1px 0 rgb(130, 130, 130), 0 -1px rgb(130, 130, 130)'};

    border-radius: 50%;
    width: 40px;
    height: 33px;
    font-size: 17px;
    margin-left: 1px;
  `

  const res = useQueries([
    {
      queryKey: ['readOption'],
      queryFn: () =>
        axios.get(`http://${Port}/releaseRoom/readRoomOption`, {
          withCredentials: true,
        }),
    },
    {
      queryKey: ['readUserInfo', isPopOpen],
      queryFn: () =>
        axios.get(`http://${Port}/user/readUserInfo`, {
          withCredentials: true,
        }),
      onSuccess: (data: any) => {
        setCurrentImg(data.data.imgs[0].pictureAddress)
      },
    },
  ])

  const setRelease = useMutation(
    (value: boolean) => {
      if (value === false) {
        return axios.post(
          `http://${Port}/releaseRoom/setRelease`,
          {},
          {
            withCredentials: true,
          },
        )
      } else {
        return axios.post(
          `http://${Port}/releaseRoom/setUnRelease`,
          {},
          {
            withCredentials: true,
          },
        )
      }
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(['readUserInfo']) // queryKey 유효성 제거
      },
    },
  )

  return (
    <>
      <Button
        disabled={false}
        sx={{
          fontSize: '18px',
          fontWeight: 'bold',
          width: '188px',
          background: '#FFD400',
          '&:hover': { background: '#DDDDDD' },
        }}
        size="large"
        variant="contained"
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
        방내놓기
        {res[1].data && Number(res[1].data?.data.data[0].isRelease) === 1 ? (
          <SOFdiv release={res[1].data?.data.data[0].isRelease}>on</SOFdiv>
        ) : (
          <SOFdiv release={res[1].data?.data.data[0].isRelease}>off</SOFdiv>
        )}
      </Button>
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
        <Box sx={dropdownSX}>
          <STop>
            <div>
              방을 내놓으시겠습니까?
              <Switch
                checked={!!res[1].data?.data.data[0].isRelease}
                onChange={() => {
                  setRelease.mutate(!!res[1].data?.data.data[0].isRelease)
                  setIsModify(() => {
                    if (!!res[1].data?.data.data[0].isRelease === false)
                      return false
                    else return true
                  })
                }}
              />
            </div>
            {isModify === false &&
            !!res[1].data?.data.data[0].isRelease === true ? (
              <button
                onClick={() => {
                  setIsModify(true)
                }}
              >
                수정
              </button>
            ) : null}
          </STop>
          {!!res[1].data?.data.data[0].isRelease === true ? (
            isModify === true ? (
              <ReleaseRoomModify />
            ) : (
              <ReleaseRoomTrue />
            )
          ) : null}
        </Box>
      </Popover>
    </>
  )
}

export default ReleaseRoom
