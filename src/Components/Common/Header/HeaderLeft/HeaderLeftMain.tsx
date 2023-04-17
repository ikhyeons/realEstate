import { useState } from 'react'
import styled from 'styled-components'

import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Popover from '@mui/material/Popover'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'

import SearchMain from './SearchMain'
import { useRecoilState } from 'recoil'
import { AoptionFilter, AroomToggle } from '../../../../AtomStorage'

const SBoxLeft = styled.div`
  width: 360px;
`

const SBoxRight = styled.div`
  width: 240px;
  position: relative;
`

const SDateRange = styled.div`
  display: flex;
  align-items: center;
  margin: 5px 0;
`

const SBtnWrap = styled.div`
  position: relative;
  margin-right: 5px;
  width: 118px;
`

const SBtnUnderbar = styled.div`
  position: absolute;
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin-left: 6px;
  bottom: 2px;
`

const SRoomBar = styled.div<{ now: number; key: number }>`
  width: 30%;
  height: 3px;
  background: ${(prop) => (prop.now ? 'yellow' : 'white')};
  border: ${(prop) => (prop.now ? '1px solid yellow' : '1px solid white')};
`

const SOptionBar = styled.div`
  width: 80%;
  height: 3px;
  background: lightgreen;
  border: 1px solid lightgreen;
`

const SMoreOptions = styled.div`
  display: flex;
  align-items: center;
  margin: 5px 0;
`

const SSelectedList = styled.span`
  margin: 0 6px;
`

const SDeleteButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`
let now = new Date() // 현재 날짜 및 시간
let year = now.getFullYear() // 연도

const HeaderLeft = () => {
  const Month: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  const Year: number[] = [
    year,
    year + 1,
    year + 2,
    year + 3,
    year + 4,
    year + 5,
    year + 6,
    year + 7,
    year + 8,
  ]
  const Options: string[] = [
    '원룸',
    '투룸',
    '세탁기',
    '침대',
    '책상',
    '전자레인지',
    '가스레인지',
    '옷장',
  ]
  const [isPopOpen, setIsPopOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [roomToggle, setRoomToggle] = useRecoilState(AroomToggle)
  const [nowlist] = useState([0, 1, 2])
  const [optionFilter, setOptionFilter] = useRecoilState(AoptionFilter)
  const [nowAdditional, setNowAdditional] = useState<string[]>([])

  const muiMenuBtnStyle = {
    fontSize: '18px',
    fontWeight: 'bold',
    width: '120px',
    background: 'none',
    margin: '0 5px',
    '&:hover': { background: 'none' },
  }

  const muiEndBtnStyle = {
    fontSize: '12px',
    fontWeight: 'bold',
    width: '100px',
    background: '#FFD400',
    position: 'absolute',
    right: '0px',
    bottom: '0px',
    '&:hover': { background: '#DDDDDD' },
  }

  const muiRstBtnStyle = {
    fontSize: '12px',
    fontWeight: 'bold',
    width: '100px',
    background: '#FFD400',
    position: 'absolute',
    right: '105px',
    bottom: '0px',
    '&:hover': { background: '#DDDDDD' },
  }
  return (
    <>
      <SearchMain />
      <SBtnWrap>
        <Button /*mui 버튼*/
          disabled={false} /*버튼 작동, 미작동 설정*/
          sx={muiMenuBtnStyle}
          size="large"
          variant="contained" /*버튼 모양 결정*/
          onClick={() => {
            setRoomToggle((prev) => {
              if (prev === 0) return 1
              else if (prev === 1) return 2
              else return 0
            })
          }}
        >
          {roomToggle === 0 ? '전체' : roomToggle === 1 ? '원룸' : '투룸'}
        </Button>
        <SBtnUnderbar>
          {nowlist.map((data, i) =>
            data === roomToggle ? (
              <SRoomBar key={i} now={1}></SRoomBar>
            ) : (
              <SRoomBar key={i} now={0}></SRoomBar>
            ),
          )}
        </SBtnUnderbar>
      </SBtnWrap>

      <SBtnWrap>
        <Button
          onClick={(event: React.MouseEvent<HTMLElement>) => {
            setAnchorEl(event.currentTarget) //지금 클릭된 버튼을 anchorEl에 저장함
            setIsPopOpen((prev) => !prev) //isPopOpen은 팝업창을 열림, 닫음을 결정함, 이전값이 열림이면 닫힘으로, 닫힘이면 열림으로
          }}
          disabled={false}
          sx={muiMenuBtnStyle}
          size="large"
          variant="contained"
        >
          옵션선택
        </Button>
        <SBtnUnderbar>
          {optionFilter.optionOn ? <SOptionBar /> : null}
        </SBtnUnderbar>
      </SBtnWrap>
      <Popover
        sx={{ marginTop: '12px' }}
        open={isPopOpen} /*isPopOpen이 true면 열림, 아니면 닫힘*/
        onClose={() =>
          setIsPopOpen(false)
        } /*isPopOpen을 false로 바꾸어 닫히게 하는 함수*/
        anchorEl={anchorEl} /*어느 버튼에 종속할 건지 결정*/
        anchorOrigin={{
          /*클릭했을 때 튀어나오는 위치*/
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Box sx={{ display: 'flex', padding: '10px', width: '600px' }}>
          <SBoxLeft>
            <SDateRange>
              기간 : &nbsp;
              <Select
                sx={{ width: '100px', height: '40px' }}
                value={optionFilter.year}
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                label="Start Month"
                onChange={(e) => {
                  console.log(e.target.value)
                  setOptionFilter((prev) => ({
                    ...prev,
                    year: e.target.value as number,
                  }))
                }}
              >
                {Year.map((data) => (
                  <MenuItem key={data} value={data}>
                    {data}
                  </MenuItem>
                ))}
              </Select>
              <Select
                sx={{ width: '80px', height: '40px' }}
                value={optionFilter.month}
                label="Start Month"
                onChange={(e) => {
                  setOptionFilter((prev) => ({
                    ...prev,
                    month: e.target.value as number,
                  }))
                }}
              >
                {Month.map((data) => (
                  <MenuItem key={data} value={data}>
                    {data}
                  </MenuItem>
                ))}
              </Select>
            </SDateRange>
            <SMoreOptions>
              추가 옵션 : &nbsp;
              <Select
                sx={{ width: '145px', height: '40px' }}
                label="Start Month"
                onChange={(e) => {
                  setNowAdditional((prev) => {
                    if (prev.includes(e.target.value as string)) return prev
                    return [...prev, e.target.value as string]
                  })
                }}
              >
                {Options.map((data) => (
                  <MenuItem key={data} value={data}>
                    {data}
                  </MenuItem>
                ))}
              </Select>
            </SMoreOptions>
          </SBoxLeft>
          <SBoxRight>
            {nowAdditional.map((data, i) => {
              return (
                <SSelectedList>
                  {data}
                  <SDeleteButton
                    onClick={() => {
                      setNowAdditional((prev) =>
                        prev.filter((data2) => data !== data2),
                      )
                    }}
                  >
                    x
                  </SDeleteButton>
                </SSelectedList>
              )
            })}
            <Button
              onClick={() => {
                setOptionFilter({
                  optionOn: false,
                  year: null,
                  month: null,
                  additional: [],
                })
                setNowAdditional([])
              }}
              sx={muiRstBtnStyle}
              size="large"
              variant="contained"
            >
              초기화
            </Button>
            <Button
              onClick={() => {
                if (optionFilter.month && optionFilter.year) {
                  setOptionFilter((prev) => ({
                    ...prev,
                    optionOn: true,
                    additional: nowAdditional,
                  }))
                  setIsPopOpen(false)
                } else {
                  alert('선택하지 않은 옵션이 있습니다.')
                }
              }}
              sx={muiEndBtnStyle}
              size="large"
              variant="contained"
            >
              완료
            </Button>
          </SBoxRight>
        </Box>
      </Popover>
    </>
  )
}

export default HeaderLeft
