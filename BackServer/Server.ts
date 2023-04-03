import { NextFunction, Request, Response } from 'express'
import { Socket } from 'socket.io'
const cors = require('cors')
const express = require('express')
const app = express()
const http = require('http')

import mysqlSession from 'express-session'
import { sessionConfig } from '../secretKeysB'
import getConnection from './dbConnection'
import { FieldPacket, RowDataPacket } from 'mysql2'
const createChatF = require('./Routers/chat')

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

interface chatRoom extends RowDataPacket {
  chatRoomNum: number
  roomAddress: string
  chatParticipant: number
  chatOther: number
  chatRoomroomMakeDate: string
}

type docValueMysql = DocValue & RowDataPacket

interface chatRcv {
  roomNum: string
  data: string
}

interface replyRcv {
  docNum: string
  data: string
}

app.use(mysqlSession(sessionConfig))

app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://118.39.194.152:3000",
      "http://203.232.200.71:3000",
      "http://222.235.130.176:3000",
    ],
    credentials: true,
  })
);

<<<<<<< HEAD
const server = http.createServer(app).listen(3001, function () {
  console.log('Express server listening')
})
=======
const server = http.createServer(app).listen(4004, function () {
  console.log("Express server listening");
});
>>>>>>> 6ced4d79582782d7566d63f7dbcf1e21bb02237f

const ios = require("express-socket.io-session"); // 소켓 내에서 세션데이터 접근 가능하도록하는 모듈

const io = require("socket.io")(server, {
  cors: {
    origin: ["*"],
    credentials: true,
  },
});

const docSocket = io.of("/doc");
const chatSocket = io.of("/chat");

const session = require("./Routers/session");
const user = require("./Routers/user");
const releaseRoom = require("./Routers/releaseRoom");
const document = require("./Routers/document");
const reply = require("./Routers/reply");
const chat = require("./Routers/chatRouter");

app.use("/session", session);
app.use("/user", user);
app.use("/releaseRoom", releaseRoom);
app.use("/document", document);
app.use("/reply", reply);
app.use("/chat", chat);

app.get("/", (req: Request, res: Response) => {
  res.sendFile(
    "C:/Users/Administrator/Desktop/release/성익현/realEstate/dist/index.html"
  );
});

app.get("/main.js", (req: Request, res: Response) => {
  res.sendFile(
    "C:/Users/Administrator/Desktop/release/성익현/realEstate/dist/main.js"
  );
});

//소켓 통신

chatSocket.use(ios(mysqlSession(sessionConfig), { autoSave: true })); // 모듈과 세션 연결
docSocket.use(ios(mysqlSession(sessionConfig), { autoSave: true })); // 모듈과 세션 연결

<<<<<<< HEAD
chatSocket.on('connection', async (socket: Socket) => {
  const connection = await getConnection()
  const [data]: [
    chatRoom[],
    FieldPacket[],
  ] = await connection.query(
    'select * from chatRoom where chatParticipant = ?',
    [socket.handshake.session.Uid],
  )
=======
chatSocket.on("connection", async (socket: any) => {
  const connection = await getConnection();
  const [data]: any = await connection.query(
    "select * from chatRoom where chatParticipant = ?",
    [socket.handshake.session.Uid]
  );
>>>>>>> 6ced4d79582782d7566d63f7dbcf1e21bb02237f
  socket.join([
    ...data.map((data, i: number) => data.chatRoom),
    String(socket.handshake.session.Uid),
  ]);

<<<<<<< HEAD
  socket.on('sendChat', async (rcv: chatRcv) => {
    const [data]: [
      chatRoom[],
      FieldPacket[],
    ] = await connection.query(
      'select * from chatRoom where chatParticipant = ?',
      [socket.handshake.session.Uid],
    )
=======
  socket.on("sendChat", async (rcv: any) => {
    const [data]: any = await connection.query(
      "select * from chatRoom where chatParticipant = ?",
      [socket.handshake.session.Uid]
    );
>>>>>>> 6ced4d79582782d7566d63f7dbcf1e21bb02237f
    socket.join([
      ...data.map((data, i: number) => data.chatRoom),
      String(socket.handshake.session.Uid),
    ]);

    await createChatF(rcv.roomNum, socket.handshake.session.Uid, rcv.data);

    socket.broadcast.to(rcv.roomNum).emit("sendChat", {
      data: rcv.data,
      roomNum: rcv.roomNum,
      time: new Date(),
    });
  });

<<<<<<< HEAD
  socket.on('createChat', async (rcv) => {
    socket.join(String(rcv))
    socket.broadcast.to(String(rcv)).emit('createChat')
    socket.leave(String(rcv))
  })
})

docSocket.on('connection', async (socket: Socket) => {
  const connection = await getConnection()
  const [data]: [
    docValueMysql[],
    FieldPacket[],
  ] = await connection.query(
    'SELECT * FROM document WHERE docWriter = ? AND del = 0',
    [socket.handshake.session.Uid],
  )
=======
  socket.on("createChat", async (rcv: any) => {
    socket.join(String(rcv));
    socket.broadcast.to(String(rcv)).emit("createChat");
    socket.leave(String(rcv));
  });
});

docSocket.on("connection", async (socket: any) => {
  const connection = await getConnection();
  const [data]: any = await connection.query(
    "SELECT * FROM document WHERE docWriter = ? AND del = 0",
    [socket.handshake.session.Uid]
  );
>>>>>>> 6ced4d79582782d7566d63f7dbcf1e21bb02237f
  socket.join([
    ...data.map((data, i: number) => String(data.docNum)),
    String(socket.handshake.session.Uid),
  ]);

<<<<<<< HEAD
  socket.on('writeReply', async (rcv: replyRcv) => {
    socket.join(String(rcv.docNum))
    socket.broadcast.to(String(rcv.docNum)).emit('writeReply', {
      data: rcv.data,
      docNum: rcv.docNum,
      time: new Date(),
    })
    socket.leave(String(rcv.docNum))
  })

  socket.on('createReply', async (rcv: number) => {
    socket.join(String(rcv))
    socket.broadcast.to(String(rcv)).emit('createReply')
    socket.leave(String(rcv))
  })
})
=======
  socket.on("writeReply", async (rcv: any) => {
    socket.join(Number(rcv.docNum));
    socket.broadcast.to(Number(rcv.docNum)).emit("writeReply", {
      data: rcv.data,
      docNum: rcv.docNum,
      time: new Date(),
    });
    socket.leave(Number(rcv.docNum));
  });

  socket.on("createReply", async (rcv: any) => {
    socket.join(String(rcv));
    socket.broadcast.to(String(rcv)).emit("createReply");
    socket.leave(String(rcv));
  });
});
>>>>>>> 6ced4d79582782d7566d63f7dbcf1e21bb02237f
