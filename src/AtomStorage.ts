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

export const AroomToggle = atom({
  key: 'room/toggle',
  default: 0,
})

export const AoptionFilter = atom<optionFilter>({
  key: 'filter/optionFilter',
  default: {
    optionOn: false,
    year: null,
    month: null,
    additional: [],
  },
})

export const AMapAria = atom({
  key: 'map/mapAria',
  default: {
    sw: { lat: 30, lng: 140 },
    ne: { lat: 40, lng: 120 },
  },
})

export const AModifyStep = atom<'first' | 'second' | 'third'>({
  key: 'releaseRoom/modifyStep',
  default: 'first',
})

export const AModifyData = atom<{
  startYear: string
  startMonth: string
  selectedOption: string[]
  deposit: string
  monthly: string
  doc: string
  addressL: { lat: string; lng: string; address: string }
  detailAddress: string
  formOutData: FormData | null
  inputImages: string[]
}>({
  key: 'release/modify',
  default: {
    startYear: '',
    startMonth: '',
    selectedOption: [],
    deposit: '',
    monthly: '',
    doc: '',
    addressL: { lat: '', lng: '', address: '' },
    detailAddress: '',
    formOutData: new FormData(),
    inputImages: [],
  },
})

export default ASelectedAddredss
