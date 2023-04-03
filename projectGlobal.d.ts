import { RowDataPacket } from 'mysql2'
import internal from 'stream'

declare global {
  interface CardPropsStateProp {
    data: CardPropsState
  }

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

  interface CardPropsState {
    id: number
    value: string
    location: string
    content: string
    date: string
    pictureAddress: string
    options: string[]
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
    docWriter: string
    del?: number
  }
}

export = {}
