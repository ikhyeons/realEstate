import { atom } from 'recoil'
import io, { Socket } from 'socket.io-client'
import Port from '../port'

const chatSocket = io(`ws://${Port}/chat`, { transports: ['websocket'] })
const repSocket = io(`ws://${Port}/doc`, { transports: ['websocket'] })
export const ASelectedAddredss = atom({
  key: 'join/selectedAddress',
  default: {
    address: '',
    zonecode: '',
  },
})

export const AjoinPageNum = atom<0 | 1>({
  key: 'join/joinPage',
  default: 0,
})

export const AjoinValues = atom({
  key: 'join/joinValue',
  default: {
    userName: '',
    userID: '',
    password: '',
    address: '',
    zonecode: '',
    detail: '',
  },
})

export const AisChatAtom = atom({
  key: 'chat/isChat',
  default: false,
})

export const AIsInfoOn = atom({
  key: 'viewMap/isInfoOn',
  default: false,
})

export const AisAlarmPopOpen = atom({
  key: 'alarm/isAlarmPopOpen',
  default: false,
})

export const AselectedPoint = atom({
  key: 'map/selectedPoint',
  default: { lat: 35.1807266, lng: 128.0940397 },
})

export const AisModify = atom<boolean>({
  key: 'doc/docModify',
  default: false,
})

export const AdocValue = atom<DocValue>({
  key: 'doc/docValue',
  default: {
    docNum: null,
    docTitle: '',
    docContent: '',
    userName: '',
    makeDate: '',
    docWriter: 0,
    view: null,
  },
})

export const ARIsModify = atom<boolean>({
  key: 'roomRelease/roomModify',
  default: false,
})

export const AcurrentImg = atom<string>({
  key: 'roomRelease/currentImg',
  default: '',
})

export const AroomModifyAddressAndL = atom({
  key: 'roomRelease/modifyAddressAL',
  default: {
    address: '',
    lng: '',
    lat: '',
  },
})

export const AcurrentRoomId = atom({
  key: 'viewMap/currentRoomId',
  default: '',
})

export const AcurrentChatRoomId = atom({
  key: 'chat/currentChatRoomId',
  default: '',
})

export const ARcvChatToggle = atom({
  key: 'chat/RcvChat',
  default: 0,
})

export const ARcvReplyToggle = atom({
  key: 'reply/RcvReply',
  default: 0,
})

export const AchatSocket = atom({
  key: 'socket/chat',
  //'',
  default: () => {
    return chatSocket
  },
})

export const AreplySocket = atom({
  key: 'socket/reply',
  //'',
  default: () => {
    return repSocket
  },
})

export default ASelectedAddredss
