import React, { useState } from 'react'
import { Map, MapMarker, MarkerClusterer } from 'react-kakao-maps-sdk'
import { AIsInfoOn } from '../../AtomStorage'
import { useRecoilState } from 'recoil'

const MapBody: React.FC = () => {
  const [markerData, setMakerData] = useState([
    { id: 1, position: { lat: 35.1807266, lng: 128.0940397 } },
    { id: 2, position: { lat: 35.1817377, lng: 128.0940397 } },
    { id: 3, position: { lat: 35.1827488, lng: 128.0940397 } },
  ])

  const [isInfoOn, setIsInfoOn] = useRecoilState(AIsInfoOn)

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
    >
      <MarkerClusterer
        averageCenter={true} // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
        minLevel={2} // 클러스터 할 최소 지도 레벨
      >
        {markerData.map((data, i) => (
          <MapMarker
            key={data.id}
            clickable={true}
            onClick={(e) => {
              console.log(data.id)
              setIsInfoOn(true)
            }}
            position={data.position}
          ></MapMarker>
        ))}
      </MarkerClusterer>
    </Map>
  )
}

export default MapBody
