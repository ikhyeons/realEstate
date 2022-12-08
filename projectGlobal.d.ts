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
}

export = {}
