import { atom } from 'recoil'

export const ASelectedAddredss = atom({
  key: 'join/selectedAddress',
  default: {
    address: '',
    zonecode: '',
  },
})

export const joinPageNum = atom<0 | 1>({
  key: 'join/joinPage',
  default: 0,
})

export const joinValues = atom({
  key: 'join/joinValue',
  default: {
    email: '',
    password: '',
    address: '',
    zonecode: '',
    detail: '',
  },
})

export const isChatAtom = atom({
  key: 'chat/isChat',
  default: false,
})
