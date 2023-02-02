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
    period: {
      start: string
      end: string
    }
  }

  interface addressCompleteData {
    address: string
    zonecode: string
  }

  interface JoinValue {
    email: string
    password: string
    address: string
    zonecode: string
    detail: string
  }
}

export = {}
