import { useState } from 'react'
import styled from 'styled-components'

import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Popover from '@mui/material/Popover'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'

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
var now = new Date() // 현재 날짜 및 시간
var year = now.getFullYear() // 연도

const HeaderLeft: React.FC = () => {
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
  const Options: string[] = ['세탁기', '침대', '책상']
  const [isPopOpen, setIsPopOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [startMonth, setStartMonth] = useState<number>()
  const [endMonth, setEndMonth] = useState<number>()
  const [startYear, setStartYear] = useState<number>()
  const [endYear, setEndYear] = useState<number>()

  const [selectedOptions, setSelectedOptions] = useState<string[]>([])

  const canBeOpen = isPopOpen && Boolean(anchorEl) // isPopOpen이 true가 되었는가 and 해당 html요소가 있는가? 둘다 참일경우 true
  const id = canBeOpen ? 'spring-popper' : undefined //만약 둘다 참이면 아이디에 spring-popper가 생김

  return (
    <>
      <input type="text" placeholder="Search" />
      <Button /*mui 버튼*/
        disabled={false} /*버튼 작동, 미작동 설정*/
        sx={{
          fontSize: '18px',
          fontWeight: 'bold',
          width: '120px',
          background: 'none',
          margin: '0 5px',
          '&:hover': { background: 'none' },
        }}
        size="large"
        variant="contained" /*버튼 모양 결정*/
      >
        원룸
      </Button>
      <Button /*mui 버튼*/
        disabled={false} /*버튼 작동, 미작동 설정*/
        sx={{
          fontSize: '18px',
          fontWeight: 'bold',
          width: '120px',
          background: 'none',
          margin: '0 5px',
          '&:hover': { background: 'none' },
        }}
        size="large"
        variant="contained" /*버튼 모양 결정*/
      >
        투룸
      </Button>
      <Button
        onClick={(event: React.MouseEvent<HTMLElement>) => {
          /*클릭 했을 때*/
          setAnchorEl(
            event.currentTarget,
          ) /*지금 클릭된 버튼을 anchorEl에 저장함*/
          setIsPopOpen(
            (prev) => !prev,
          ) /*isPopOpen은 팝업창을 열림, 닫음을 결정함, 이전값이 열림이면 닫힘으로, 닫힘이면 열림으로*/
        }}
        disabled={false}
        sx={{
          fontSize: '18px',
          fontWeight: 'bold',
          width: '130px',
          background: '#FFD400',
          '&:hover': { background: '#DDDDDD' },
        }}
        size="large"
        variant="contained"
      >
        옵션선택
      </Button>
      <Popover
        id={id} /*해당 팝업의 아이디*/
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
                value={startYear}
                label="Start Month"
                onChange={(e) => {
                  setStartYear(e.target.value as number)
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
                value={startMonth}
                label="Start Month"
                onChange={(e) => {
                  setStartMonth(e.target.value as number)
                }}
              >
                {Month.map((data) => (
                  <MenuItem key={data} value={data}>
                    {data}
                  </MenuItem>
                ))}
              </Select>
              &nbsp;~&nbsp;
              <Select
                sx={{ width: '100px', height: '40px' }}
                value={endYear}
                label="Start Month"
                onChange={(e) => {
                  setEndYear(e.target.value as number)
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
                value={endMonth}
                label="End Month"
                onChange={(e) => {
                  setEndMonth(e.target.value as number)
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
                  setSelectedOptions((prev) => [
                    ...prev,
                    e.target.value as string,
                  ])
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
            {selectedOptions.map((data, i) => {
              return (
                <SSelectedList>
                  {data}
                  <SDeleteButton>x</SDeleteButton>
                </SSelectedList>
              )
            })}
            <Button
              sx={{
                fontSize: '12px',
                fontWeight: 'bold',
                width: '100px',
                background: '#FFD400',
                position: 'absolute',
                right: '90px',
                bottom: '0px',
                '&:hover': { background: '#DDDDDD' },
              }}
              size="large"
              variant="contained"
            >
              초기화
            </Button>
            <Button
              sx={{
                fontSize: '12px',
                fontWeight: 'bold',
                width: '80px',
                background: '#FFD400',
                position: 'absolute',
                right: '0px',
                bottom: '0px',
                '&:hover': { background: '#DDDDDD' },
              }}
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
