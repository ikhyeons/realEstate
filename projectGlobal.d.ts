import { RowDataPacket } from 'mysql2'

declare global {
  interface CardPropsStateProp {
    data: CardPropsState
  }

  interface CardPropsState {
    id: number
    value: string
    location: string
    content: string
    date: string
    pictureAddress: string
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

  interface DocValue {
    docNum: number | null
    docTitle: string | ''
    docContent: string | ''
    userName: string | ''
    makeDate: string | ''
    view: number | null
  }
}

export = {}
