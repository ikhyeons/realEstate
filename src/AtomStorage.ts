import { atom } from 'recoil'

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
