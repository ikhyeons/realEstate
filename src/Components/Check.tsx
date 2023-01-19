import React from 'react'
import axios from 'axios'

const Check = () => {
  const checkf = async () => {
    const data = await axios.post(
      'http://localhost:3001/releaseRoom/setRoomContent',
      { userNum: 1, isRelease: 1 },
    )
    console.log(data)
  }
  return (
    <button
      onClick={() => {
        checkf()
      }}
    >
      ㅎㅇ
    </button>
  )
}

export default Check
