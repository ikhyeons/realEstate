import { useState } from 'react'
import {
  Map,
  MapMarker,
  MarkerClusterer,
  ZoomControl,
} from 'react-kakao-maps-sdk'
import { AIsInfoOn, AoptionFilter, AroomToggle } from '../../AtomStorage'
import { useRecoilState } from 'recoil'
import { AselectedPoint, AcurrentRoomId } from '../../AtomStorage'
import { useQuery } from 'react-query'
import axios from 'axios'
import Port from '../../../port'
import { useCookies } from 'react-cookie'

const MapBody = () => {
  const isContainFilterOptions = (
    selectedOptions: string[],
    roomOptions: string[],
  ) => {
    return !selectedOptions
      .map((data, i) => roomOptions.includes(data))
      .includes(false)
  }

  const compareDateWithStandardf = (
    needYear: number,
    roomYear: number,
    needMonth: number,
    roomMonth: number,
  ) => {
    console.log(needYear, roomYear, needMonth, roomMonth)
    if ((needYear == roomYear && needMonth >= roomMonth) || needYear > roomYear)
      return false
    else return true
  }
  const [cookies] = useCookies(['isLogin'])
  const [roomToggle, setRoomToggle] = useRecoilState(AroomToggle)
  const [optionFilter, setOptionFilter] = useRecoilState(AoptionFilter)

  const readRooms = useQuery<IroomData>(
    ['readRooms', cookies, roomToggle, optionFilter],
    () => axios.get(`http://${Port}/user/readRooms`, { withCredentials: true }),
    {
      onSuccess: (data) => {
        setMakerData(
          data.data.data.map((data: any, i: number) => ({
            id: data.userNum,
            position: { lat: data.roomLat, lng: data.roomLng },
          })),
        )
      },
      select: (data) => {
        switch (roomToggle) {
          case 0:
            return {
              ...data,
              data: {
                ...data.data,
                data: data.data.data.filter((data) =>
                  optionFilter.optionOn === true
                    ? compareDateWithStandardf(
                        optionFilter.year!,
                        Number(data.roomDate.split('.')[0]),
                        optionFilter.month!,
                        Number(data.roomDate.split('.')[1]),
                      ) &&
                      isContainFilterOptions(
                        optionFilter.additional!,
                        data.roomOption,
                      )
                    : data,
                ),
              },
            }

          case 1:
            return {
              ...data,
              data: {
                ...data.data,
                data: data.data.data.filter((data) =>
                  optionFilter.optionOn === true
                    ? data.roomOption.includes('원룸') &&
                      compareDateWithStandardf(
                        optionFilter.year!,
                        Number(data.roomDate.split('.')[0]),
                        optionFilter.month!,
                        Number(data.roomDate.split('.')[1]),
                      ) &&
                      isContainFilterOptions(
                        optionFilter.additional!,
                        data.roomOption,
                      )
                    : data.roomOption.includes('원룸'),
                ),
              },
            }

          default:
            return {
              ...data,
              data: {
                ...data.data,
                data: data.data.data.filter((data) =>
                  optionFilter.optionOn === true
                    ? data.roomOption.includes('투룸') &&
                      compareDateWithStandardf(
                        optionFilter.year!,
                        Number(data.roomDate.split('.')[0]),
                        optionFilter.month!,
                        Number(data.roomDate.split('.')[1]),
                      ) &&
                      isContainFilterOptions(
                        optionFilter.additional!,
                        data.roomOption,
                      )
                    : data.roomOption.includes('투룸'),
                ),
              },
            }
        }
      },
    },
  )

  console.log(readRooms.data)

  const [markerData, setMakerData] = useState<IMapMarker[]>([])

  const [, setIsInfoOn] = useRecoilState(AIsInfoOn)
  const [selectedPoint] = useRecoilState(AselectedPoint)
  const [, setCurrentRoomId] = useRecoilState(AcurrentRoomId)

  return (
    <Map // 지도를 표시할 Container
      center={selectedPoint}
      style={{
        // 지도의 크기
        width: '100%',
        height: '100%',
      }}
      level={3} // 지도의 확대 레벨
      isPanto={true} // 지도 부드럽게 이동
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
              setCurrentRoomId(String(data.id))
              setIsInfoOn(true)
            }}
            position={data.position}
          ></MapMarker>
        ))}
      </MarkerClusterer>
      <ZoomControl position={kakao.maps.ControlPosition.TOPRIGHT} />
    </Map>
  )
}

export default MapBody
