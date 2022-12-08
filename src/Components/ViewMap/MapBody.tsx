import React from 'react'
import { Map } from 'react-kakao-maps-sdk'

const MapBody: React.FC = () => {
  return (
    <Map // 지도를 표시할 Container
      center={{
        // 지도의 중심좌표
        lat: 35.1807266,
        lng: 128.0940397,
      }}
      style={{
        // 지도의 크기
        width: '100%',
        height: '100%',
      }}
      level={3} // 지도의 확대 레벨
    />
  )
}

export default MapBody
