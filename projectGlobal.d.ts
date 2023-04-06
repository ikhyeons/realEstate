import { RowDataPacket } from 'mysql2'
import internal from 'stream'

declare global {
  //공용
  interface mutationData {
    data: {
      result: 0 | 1 | 2 | 3 | 4
    }
  }
  //사이드바 영역
  interface IroomData {
    data: {
      result: 0
      data: [
        {
          userNum: number
          roomDeposit: number
          roomMonthly: number
          roomAddress: string
          roomDetailAddress: string
          roomLat: number
          roomLng: number
          roomDate: string
          roomDoc: string
          roomPicture: string
          roomOption: string[]
        },
      ]
    }
  }

  interface ISidebarCard {
    id: number
    value: string
    location: string
    content: string
    date: string
    pictureAddress: string
    options: string[]
  }

  interface ISidebarCardProp {
    data: ISidebarCard
  }
  //map 마커 타입
  interface IMapMarker {
    id: string
    position: { lat: number; lng: number }
  }
  //방 정보 모달 영역
  //roomInfo GET Data
  interface IRoomInfo {
    data: {
      result: number
      data: {
        roomDate: string
        roomDeposit: number
        roomMonthly: number
        roomDoc: string
        roomAddress: string
        roomDetailAddress: string
      }[]
      imgs: {
        pictureNum: number
        userNum: number
        pictureAddress: string
      }[]
      options: {
        optionNum: number
        userNum: number
        roomOption: string
      }[]
    }
  }

  //releaseRoomInfo GET Data
  interface IReleaseRoomInfo {
    data: {
      result: number
      data: [
        {
          roomDate: string
          roomDeposit: number
          roomMonthly: number
          roomDoc: string
          roomAddress: string
          roomDetailAddress: string
        },
      ]
      imgs: [
        {
          pictureNum: number
          userNum: number
          pictureAddress: string
        },
      ]
      options: {
        optionNum: number
        userNum: number
        roomOption: string
      }[]
    }
  }

  //doc 영역
  interface docCnt {
    data: { result: number; data: number }
  }
  interface IdocData {
    title: string
    content: string
  }

  interface DocValue {
    docNum: number | null
    docTitle: string | ''
    docContent: string | ''
    userName: string | ''
    makeDate: string | ''
    view: number | null
    docWriter: number
    del?: number
  }

  interface readDocData {
    data: {
      result: number
      data: DocValue
    }
  }

  interface IDocRowData {
    docNum: number
    docTitle: string
    userName: string
    view: number
    makeDate: string
  }

  interface IDocList {
    data: {
      result: number
      data: IDocRowData[]
    }
  }
  // reply 영역

  interface IReplyInfo {
    repNum: number
    docNum: number
    userName: string
    replyContent: string
    makeDate: string
  }

  interface IReplys {
    data: {
      result: 0
      data: IReplyInfo[]
    }
  }

  //
  interface Iaddress {
    address_name: string
    category_group_code: string
    category_group_name: string
    category_name: string
    distance: string
    id: string
    phone: string
    place_name: string
    place_url: string
    road_address_name: string
    x: string
    y: string
  }

  interface addressCompleteData {
    address: string
    zonecode: string
  }

  interface JoinValue {
    userName: string
    userID: string
    password: string
    address: string
    zonecode: string
    detail: string
  }
}

export = {}
