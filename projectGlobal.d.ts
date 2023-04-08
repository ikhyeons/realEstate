import { RowDataPacket } from 'mysql2'
import internal from 'stream'

declare global {
  //공용
  interface mutationData {
    data: {
      result: 0 | 1 | 2 | 3 | 4
    }
  }

  // 채팅 영역
  interface IChatData {
    makeDate: string
    cnt: number
    chatContent: string
  }
  //알람 체크안된 댓글
  interface unCheckedReply {
    data: {
      result: number
      data: unCheckedReplys[]
    }
  }
  interface unCheckedReplys {
    docNum: number
    docTitle: string
    docContent: string
    docWriter: number
    view: number
    makeDate: string
    del: number
    cnt: number
    userName: string
    replyContent: string
    RmakeDate: string
  }
  //알람 채팅방
  interface chatRoom {
    data: {
      result: number
      data: innerChatRoom[]
    }
  }

  interface innerChatRoom {
    chatRoomNum: number
    roomAddress: string
    chatParticipant: number
    chatOther: number
    chatRoom: string
    roomMakeDate: string
    username: string
    chatContent: string
    makeDate: string
    cnt: number
  }
  //헤더 챗
  interface chats {
    data: {
      result: number
      data: {
        chatNum: number
        chatRoomNum: string
        chatWriter: number
        chatContent: string
        makeDate: string
        checked: number
        my: number
      }[]
    }
  }

  //헤더영역
  interface kakaoAddress {
    data: {
      meta: {
        total_count: number
        pageable_count: number
        is_end: boolean
        same_name: {
          region: string[]
          keyword: string
          selected_region: string
        }
      }
      documents: Iaddress[]
    }
  }

  interface Iaddress {
    id: string
    place_name: string
    category_name: string
    category_group_code: string
    category_group_name: string
    phone: string
    address_name: string
    road_address_name: string
    x: string
    y: string
    place_url: string
    distance: string
  }

  interface headerUserInfo {
    data: {
      result: number
      data: {
        userName: string
        userAddress: string
        roomDate: string
        roomDeposit: number
        roomMonthly: number
        roomDoc: string
        roomAddress: string
        roomDetailAddress: string
        roomLat: number
        roomLng: number
        isRelease: number
        roomOption: string
      }[]
      imgs: {
        pictureNum: number
        userNum: number
        pictureAddress: string
      }[]
    }
  }

  //사이드바 영역
  interface IroomData {
    data: {
      result: 0
      data: {
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
      }[]
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
