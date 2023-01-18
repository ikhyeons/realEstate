const express = require('express')
import { Request, Response } from 'express'
const router = express.Router()

router.get('/setRelease', (req: Request, res: Response) => {
  res.send('gd')
})

router.get('/setRoomContent', (req: Request, res: Response) => {
  res.send('gd')
})

router.get('/setRoomPic', (req: Request, res: Response) => {
  res.send('gd')
})

router.get('/setRoomOption', (req: Request, res: Response) => {
  res.send('gd')
})

module.exports = router
