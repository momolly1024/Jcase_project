import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import connectMongo from 'connect-mongo'
import session from 'express-session'
import dotenv from 'dotenv'
import db from './db.js'
import md5 from 'md5'

// 抓PTTCODEJOB
import rp from 'request-promise'
import cheerio from 'cheerio'
import path from 'path'
import multer from 'multer'
import FTPStorage from 'multer-ftp'
import fs from 'fs'
dotenv.config()

const MongoStore = connectMongo(session)

const app = express()
app.use(bodyParser.json())

//  跨域請求的判斷
app.use(cors({
  origin (origin, callback) {
    // 直接開網頁，不是 ajax 時，origin 是 undefined
    if (origin === undefined) {
      callback(null, true)
    } else {
      if (process.env.ALLOW_CORS === 'true') {
        // 開發環境，允許
        callback(null, true)
      } else if (origin.includes('github')) {
        // 非開發環境，但是從 github 過來，允許
        callback(null, true)
      } else {
        // 不是開發也不是從 github 過來，拒絕
        callback(new Error('Not allowed'), false)
      }
    }
  },
  credentials: true
}))

//  session存入DB及cookie設置時間
app.use(session({
  secret: 'pjsecret',
  // 將session存進mongoDB
  store: new MongoStore({
    // 使用mongoose的資料庫連接
    mongooseConnection: db.connection,
    // 設定存入的collection
    collection: process.env.COLLECTION_SESSION
  }),
  // 有效期間
  cookie: {
    // 1000毫秒 = 1秒鐘
    // 1秒*60*30=30分鐘
    maxAge: 1000 * 60 * 30
    // sameSite: 'None',
    // secure: true
  },

  // 是否保存未修改的session
  saveUninitialized: false,
  // 是否每次重設過期時間
  rolling: true
}))

// let storage
// if (process.env.FTP === 'false') {
//   // 開發環境將上傳檔案放本機
//   storage = multer.diskStorage({
//     destination (req, file, cb) {
//       cb(null, 'images/')
//     },
//     filename (req, file, cb) {
//       cb(null, Date.now() + path.extname(file.originalname))
//     }
//   })
// } else {
//   // heroku 將上傳檔案放伺服器
//   storage = new FTPStorage({
//     // 上傳伺服器的路徑
//     basepath: '/',
//     // FTP 設定
//     ftp: {
//       host: process.env.FTP_HOST,
//       secure: false,
//       user: process.env.FTP_USER,
//       password: process.env.FTP_PASSWORD
//     },
//     destination (req, file, options, cb) {
//       cb(null, options.basepath + Date.now() + path.extname(file.originalname))
//     }
//   })
// }

// 啟動 -------------------------------------------
app.listen(process.env.PORT, () => {
  console.log('已啟動')
})

// 註冊帳號 -------------------------------------------
app.post('/users', async (req, res) => {
  if (!req.headers['content-type'].includes('application/json')) {
    res.status(400)
    res.send({ success: false, message: '格式不符' })
    return
  }

  try {
    await db.users.create({
      account: req.body.account,
      password: md5(req.body.password),
      nickname: req.body.nickname,
      email: req.body.email,
      block: req.body.block
    })
    res.status(200)
    res.send({ success: true, message: '' })
  } catch (error) {
    console.log(error)
    if (error.name === 'ValidationError') {
      const key = Object.keys(error.errors)[0]
      const message = error.errors[key].message
      res.status(400)
      res.send({ success: false, message })
    } else {
      res.status(500)
      res.send({ success: false, message: '伺服器錯誤' })
    }
  }
})

// 登入 -----------------------------------------------
app.post('/login', async (req, res) => {
  if (!req.headers['content-type'].includes('application/json')) {
    res.status(400)
    res.send({ success: false, message: '格式不符' })
    return
  }
  try {
    const result = await db.users.find({
      account: req.body.account,
      password: md5(req.body.password)

    })
    if (result.length > 0) {
      req.session.user = result[0].account
      res.status(200)
      res.send({ success: true, message: '' })
    } else {
      res.status(404)
      res.send({ success: false, message: '帳號密碼錯誤' })
    }
  } catch (error) {
    if (error.name === 'ValidationError') {
      // 資料格式錯誤
      const key = Object.keys(error.errors)[0]
      const message = error.errors[key].message
      res.status(400)
      res.send({ success: false, message })
    } else {
      // 伺服器錯誤
      res.status(500)
      res.send({ success: false, message: '伺服器錯誤' })
    }
  }
})

// 登出 -----------------------------------------
app.delete('/logout', async (req, res) => {
  req.session.destroy(error => {
    if (error) {
      res.status(500)
      res.send({
        success: false,
        message: '伺服器錯誤'
      })
    } else {
      res.clearCookie()
      res.status(200)
      res.send({ success: true, message: '' })
    }
  })
})

// 心跳heartbeat設定 -----------------------------------------
app.get('/heartbeat', async (req, res) => {
  let islogin = false
  if (req.session.user !== undefined) {
    islogin = true
  }
  res.status(200)
  res.send(islogin)
})

// 上傳意見 contact頁 -----------------------------------------
app.post('/msg', async (req, res) => {
  if (req.session.user === undefined) {
    res.status(401)
    res.send({ success: false, message: '未登入' })
  } else {
    try {
      const result = await db.contact.create({
        user: req.session.user,
        text: req.body.text,
        process: req.body.process
      })
      res.status(200)
      res.send({ success: true, message: '', text: req.body.text, process: req.body.process, _id: result._id })
    } catch (error) {
      if (error.name === 'ValidationError') {
        // 資料格式錯誤
        const key = Object.keys(error.errors)[0]
        const message = error.errors[key].message
        res.status(400)
        res.send({ success: false, message })
      } else {
        // 伺服器錯誤
        res.status(500)
        res.send({ success: false, message: '伺服器錯誤' })
      }
    }
  }
})
// 查看所有留言
app.get('/msg', async (req, res) => {
  try {
    const result = await db.contact.find()
    res.status(200)
    res.send({ success: true, message: '', result })
  } catch (error) {
    res.status(500)
    res.send({ success: false, message: '伺服器錯誤' })
  }
})

// 上傳CASE -----------------------------------------
app.post('/case', async (req, res) => {
  if (req.session.user === undefined) {
    res.status(401)
    res.send({ success: false, message: '未登入' })
  } else {
    try {
      const result = await db.cases.create({
        user: req.session.user,
        title: req.body.title,
        type: req.body.type,
        budget: req.body.budget,
        description: req.body.description,
        date: req.body.date,
        isedit: req.body.isedit
      })
      res.status(200)
      res.send({
        success: true,
        message: '',
        title: req.body.title,
        _id: result._id,
        type: req.body.type,
        budget: req.body.budget,
        description: req.body.description,
        date: req.body.date,
        isedit: req.body.isedit
      })
    } catch (error) {
      console.log(error)
      if (error.name === 'ValidationError') {
        // 資料格式錯誤
        const key = Object.keys(error.errors)[0]
        const message = error.errors[key].message
        res.status(400)
        res.send({ success: false, message })
      } else {
        // 伺服器錯誤
        res.status(500)
        res.send({ success: false, message: '伺服器錯誤' })
      }
    }
  }
})

// 抓到該使用者的所有提案 -----------------------------------------
app.get('/case/:user', async (req, res) => {
  try {
    const result = await db.cases.find({ user: req.params.user })
    res.status(200)
    res.send({ success: true, message: '', result })
  } catch (error) {
    res.status(500)
    res.send({ success: false, message: '伺服器錯誤' })
  }
})

// 刪除提案---------------------------------------
app.delete('/case/:id', async (req, res) => {
  if (!req.session.user) {
    res.status(401)
    res.send({ success: false, message: '無權限' })
    return
  }
  try {
    let result = await db.cases.findById(req.params.id)
    if (result.user !== req.session.user) {
      res.status(403)
      res.send({ success: false, message: '無權限' })
      return
    }
    // findByIdAndUpdate 預設回傳的是更新前的資料
    // 設定 new true 後會變成回傳新的資料
    result = await db.cases.findByIdAndDelete(req.params.id)
    if (result === null) {
      res.status(404)
      res.send({ success: false, message: '找不到資料' })
    } else {
      res.status(200)
      res.send({ success: true, message: '', result })
    }
  } catch (error) {
    if (error.name === 'CastError') {
      res.status(400)
      res.send({ success: false, message: 'ID 格式錯誤' })
    } else {
      // 伺服器錯誤
      res.status(500)
      res.send({ success: false, message: '伺服器錯誤' })
    }
  }
})
// 修改提案 -------------------------
app.patch('/case/:id', async (req, res) => {
  if (!req.headers['content-type'].includes('application/json')) {
    res.status(400)
    res.send({ success: false, message: '格式不符' })
    return
  }
  // 沒有登入
  if (!req.session.user) {
    res.status(401)
    res.send({ success: false, message: '無權限' })
    return
  }
  try {
    const result = await db.cases.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.status(200)
    res.send({ success: true, message: '', result })
  } catch (error) {
    if (error.name === 'CastError') {
      // ID 格式不是 MongoDB 的格式
      res.status(400)
      res.send({ success: false, message: 'ID 格式錯誤' })
    } else if (error.name === 'ValidationError') {
      // 資料格式錯誤
      const key = Object.keys(error.errors)[0]
      const message = error.errors[key].message
      res.status(400)
      res.send({ success: false, message })
    } else {
      // 伺服器錯誤
      res.status(500)
      res.send({ success: false, message: '伺服器錯誤' })
    }
  }
})

// 抓到所有提案 -----------------------------------------
app.get('/case/', async (req, res) => {
  try {
    const result = await db.cases.find()
    res.status(200)
    res.send({ success: true, message: '', result })
  } catch (error) {
    res.status(500)
    res.send({ success: false, message: '伺服器錯誤' })
  }
})

// 加入收藏CASE清單 ------------------------------
app.post('/like', async (req, res) => {
  if (req.session.user === undefined) {
    res.status(401)
    res.send({ success: false, message: '未登入' })
  } else {
    try {
      const result = await db.likecase.create({
        user: req.session.user,
        caseid: req.body.caseid,
        title: req.body.title,
        type: req.body.type,
        budget: req.body.budget,
        description: req.body.description,
        date: req.body.date
      })
      res.status(200)
      res.send({
        success: true,
        message: '',
        user: req.session.user,
        _id: result._id,
        caseid: req.body._id,
        title: req.body.title,
        type: req.body.type,
        budget: req.body.budget,
        description: req.body.description,
        date: req.body.date
      })
    } catch (error) {
      console.log(error)
      if (error.name === 'ValidationError') {
        // 資料格式錯誤
        const key = Object.keys(error.errors)[0]
        const message = error.errors[key].message
        res.status(400)
        res.send({ success: false, message })
      } else {
        // 伺服器錯誤
        res.status(500)
        res.send({ success: false, message: '伺服器錯誤' })
      }
    }
  }
})

// 顯示個人收藏CASE清單 ------------------------------
app.get('/like/:user', async (req, res) => {
  try {
    const result = await db.likecase.find({ user: req.params.user })
    res.status(200)
    res.send({ success: true, message: '', result })
  } catch (error) {
    res.status(500)
    res.send({ success: false, message: '伺服器錯誤' })
  }
})

// 移除個人收藏CASE -------------------------------------------------
app.delete('/like/:id', async (req, res) => {
  if (!req.session.user) {
    res.status(401)
    res.send({ success: false, message: '無權限' })
    return
  }
  try {
    let result = await db.likecase.findById(req.params.id)
    if (result.user !== req.session.user) {
      res.status(403)
      res.send({ success: false, message: '無權限' })
      return
    }
    result = await db.likecase.findByIdAndDelete(req.params.id)
    if (result === null) {
      res.status(404)
      res.send({ success: false, message: '找不到資料' })
    } else {
      res.status(200)
      res.send({ success: true, message: '', result })
    }
  } catch (error) {
    if (error.name === 'CastError') {
      res.status(400)
      res.send({ success: false, message: 'ID 格式錯誤' })
    } else {
      // 伺服器錯誤
      res.status(500)
      res.send({ success: false, message: '伺服器錯誤' })
    }
  }
})

// 註冊後台帳號 -------------------------------------------
app.post('/admins', async (req, res) => {
  if (!req.headers['content-type'].includes('application/json')) {
    res.status(400)
    res.send({ success: false, message: '格式不符' })
    return
  }

  try {
    await db.admins.create({
      account: req.body.account,
      password: md5(req.body.password),
      block: req.body.block
    })
    res.status(200)
    res.send({ success: true, message: '' })
  } catch (error) {
    console.log(error)
    if (error.name === 'ValidationError') {
      const key = Object.keys(error.errors)[0]
      const message = error.errors[key].message
      res.status(400)
      res.send({ success: false, message })
    } else {
      res.status(500)
      res.send({ success: false, message: '伺服器錯誤' })
    }
  }
})

// 登入後台 -----------------------------------------------
app.post('/loginback', async (req, res) => {
  if (!req.headers['content-type'].includes('application/json')) {
    res.status(400)
    res.send({ success: false, message: '格式不符' })
    return
  }
  try {
    const result = await db.admins.find({
      account: req.body.account,
      password: md5(req.body.password)
    })
    if (result.length > 0) {
      req.session.admin = result[0].account
      res.status(200)
      res.send({ success: true, message: '' })
    } else {
      res.status(404)
      res.send({ success: false, message: '帳號密碼錯誤' })
    }
  } catch (error) {
    if (error.name === 'ValidationError') {
      // 資料格式錯誤
      const key = Object.keys(error.errors)[0]
      const message = error.errors[key].message
      res.status(400)
      res.send({ success: false, message })
    } else {
      // 伺服器錯誤
      res.status(500)
      res.send({ success: false, message: '伺服器錯誤' })
    }
  }
})

// 登出後台 -----------------------------------------
app.delete('/logoutback', async (req, res) => {
  req.session.destroy(error => {
    if (error) {
      res.status(500)
      res.send({
        success: false,
        message: '伺服器錯誤'
      })
    } else {
      res.clearCookie()
      res.status(200)
      res.send({ success: true, message: '' })
    }
  })
})

// 爬 PTT CODE JOB 資料
app.get('/pttcase', async (req, res) => {
  if (req.session.user === undefined) {
    res.status(401)
    res.send({ success: false, message: '未登入' })
  } else {
    try {
      const getData = async () => {
        try {
          const html = await rp('https://www.ptt.cc/bbs/CodeJob/index.html')
          const $ = cheerio.load(html)
          fs.writeFileSync('./aaa.html', html)
          // $('.r-ent .title').each((i, elem) => {
          //   const text = $(this).length
          //   console.log(text)
          // })
          for (let i = 0; i < $('#main-container').find('.r-ent').length; i++) {
            console.log($('#main-container').find('.r-ent').eq(i).find('.title a').text())
            if ($('#main-container').find('.r-ent').eq(i).find('.title a').text().includes('[發案]')) {
              console.log('https://www.ptt.cc' + $('#main-container').find('.r-ent').eq(i).find('.title a').attr('href'))
              const result = await db.pttcase.create({
                title: $('#main-container').find('.r-ent').eq(i).find('.title a').text(),
                href: 'https://www.ptt.cc' + $('#main-container').find('.r-ent').eq(i).find('.title a').attr('href')
              })
              res.status(200)
              return res.send({
                success: true,
                message: '',
                result
              })
            }
          }
        } catch (error) {
          console.log(error.message)
        }
      }
      getData()
    } catch (error) {
      console.log(error)
      if (error.name === 'ValidationError') {
        // 資料格式錯誤
        const key = Object.keys(error.errors)[0]
        const message = error.errors[key].message
        res.status(400)
        res.send({ success: false, message })
      } else {
        // 伺服器錯誤
        res.status(500)
        res.send({ success: false, message: '伺服器錯誤' })
      }
    }
  }
})

// 抓到setting文字 ------------------------------
app.get('/setting/', async (req, res) => {
  try {
    const result = await db.setting.find()
    res.status(200)
    res.send({ success: true, message: '', result })
  } catch (error) {
    res.status(500)
    res.send({ success: false, message: '伺服器錯誤' })
  }
})

// 設定banner文字 ------------------------------
app.post('/setting', async (req, res) => {
  try {
    const result = await db.setting.create({
      bannerTitle: req.body.bannerTitle,
      bannerText: req.body.bannerText

    })
    res.status(200)
    res.send({
      success: true,
      message: '',
      bannerTitle: req.body.bannerTitle,
      bannerText: req.body.bannerText,
      _id: result._id
    })
  } catch (error) {
    if (error.name === 'ValidationError') {
      // 資料格式錯誤
      const key = Object.keys(error.errors)[0]
      const message = error.errors[key].message
      res.status(400)
      res.send({ success: false, message })
    } else {
      // 伺服器錯誤
      res.status(500)
      res.send({ success: false, message: '伺服器錯誤' })
    }
  }
})
// 第二張banner title / text
app.post('/setting02', async (req, res) => {
  try {
    const result = await db.setting02.create({
      bannerTitle02: req.body.bannerTitle02,
      bannerText02: req.body.bannerText02

    })
    res.status(200)
    res.send({
      success: true,
      message: '',
      bannerTitle02: req.body.bannerTitle02,
      bannerText02: req.body.bannerText02,
      _id: result._id
    })
  } catch (error) {
    if (error.name === 'ValidationError') {
      // 資料格式錯誤
      const key = Object.keys(error.errors)[0]
      const message = error.errors[key].message
      res.status(400)
      res.send({ success: false, message })
    } else {
      // 伺服器錯誤
      res.status(500)
      res.send({ success: false, message: '伺服器錯誤' })
    }
  }
})
app.get('/setting02', async (req, res) => {
  try {
    const result = await db.setting02.find()
    res.status(200)
    res.send({ success: true, message: '', result })
  } catch (error) {
    res.status(500)
    res.send({ success: false, message: '伺服器錯誤' })
  }
})

// 第3張banner title / text
app.post('/setting03', async (req, res) => {
  try {
    const result = await db.setting03.create({
      bannerTitle03: req.body.bannerTitle03,
      bannerText03: req.body.bannerText03

    })
    res.status(200)
    res.send({
      success: true,
      message: '',
      bannerTitle03: req.body.bannerTitle03,
      bannerText03: req.body.bannerText03,
      _id: result._id
    })
  } catch (error) {
    if (error.name === 'ValidationError') {
      // 資料格式錯誤
      const key = Object.keys(error.errors)[0]
      const message = error.errors[key].message
      res.status(400)
      res.send({ success: false, message })
    } else {
      // 伺服器錯誤
      res.status(500)
      res.send({ success: false, message: '伺服器錯誤' })
    }
  }
})
app.get('/setting03', async (req, res) => {
  try {
    const result = await db.setting03.find()
    res.status(200)
    res.send({ success: true, message: '', result })
  } catch (error) {
    res.status(500)
    res.send({ success: false, message: '伺服器錯誤' })
  }
})
// 第4張banner title / text
app.post('/setting04', async (req, res) => {
  try {
    const result = await db.setting04.create({
      bannerTitle04: req.body.bannerTitle04,
      bannerText04: req.body.bannerText04

    })
    res.status(200)
    res.send({
      success: true,
      message: '',
      bannerTitle04: req.body.bannerTitle04,
      bannerText04: req.body.bannerText04,
      _id: result._id
    })
  } catch (error) {
    if (error.name === 'ValidationError') {
      // 資料格式錯誤
      const key = Object.keys(error.errors)[0]
      const message = error.errors[key].message
      res.status(400)
      res.send({ success: false, message })
    } else {
      // 伺服器錯誤
      res.status(500)
      res.send({ success: false, message: '伺服器錯誤' })
    }
  }
})
app.get('/setting04', async (req, res) => {
  try {
    const result = await db.setting04.find()
    res.status(200)
    res.send({ success: true, message: '', result })
  } catch (error) {
    res.status(500)
    res.send({ success: false, message: '伺服器錯誤' })
  }
})

// 修改個人資料
app.patch('/users', async (req, res) => {
  if (!req.headers['content-type'].includes('application/json')) {
    res.status(400)
    res.send({ success: false, message: '格式不符' })
    return
  }
  // 沒有登入
  if (!req.session.user) {
    res.status(401)
    res.send({ success: false, message: '無權限' })
    return
  }
  try {
    const result = await db.users.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.status(200)
    res.send({ success: true, message: '', result })
  } catch (error) {
    if (error.name === 'CastError') {
      // ID 格式不是 MongoDB 的格式
      res.status(400)
      res.send({ success: false, message: 'ID 格式錯誤' })
    } else if (error.name === 'ValidationError') {
      // 資料格式錯誤
      const key = Object.keys(error.errors)[0]
      const message = error.errors[key].message
      res.status(400)
      res.send({ success: false, message })
    } else {
      // 伺服器錯誤
      res.status(500)
      res.send({ success: false, message: '伺服器錯誤' })
    }
  }
})

// 抓到所有使用者資訊
app.get('/user', async (req, res) => {
  try {
    const result = await db.users.find()
    res.status(200)
    res.send({ success: true, message: '', result })
  } catch (error) {
    res.status(500)
    res.send({ success: false, message: '伺服器錯誤' })
  }
})
// 抓到所有"後台"使用者資訊
app.get('/admin', async (req, res) => {
  try {
    const result = await db.admins.find()
    res.status(200)
    res.send({ success: true, message: '', result })
  } catch (error) {
    res.status(500)
    res.send({ success: false, message: '伺服器錯誤' })
  }
})

// 設定cooperation 說明 圖片網址 連結----第一區--------------------------
app.post('/cooperation', async (req, res) => {
  try {
    const result = await db.cooperation.create({
      coDescription: req.body.coDescription,
      coImg: req.body.coImg,
      coHref: req.body.coHref
    })
    res.status(200)
    res.send({
      success: true,
      message: '',
      coDescription: req.body.coDescription,
      coImg: req.body.coImg,
      coHref: req.body.coHref,
      _id: result._id
    })
  } catch (error) {
    if (error.name === 'ValidationError') {
      // 資料格式錯誤
      const key = Object.keys(error.errors)[0]
      const message = error.errors[key].message
      res.status(400)
      res.send({ success: false, message })
    } else {
      // 伺服器錯誤
      res.status(500)
      res.send({ success: false, message: '伺服器錯誤' })
    }
  }
})
app.get('/cooperation/', async (req, res) => {
  try {
    const result = await db.cooperation.find()
    res.status(200)
    res.send({ success: true, message: '', result })
  } catch (error) {
    res.status(500)
    res.send({ success: false, message: '伺服器錯誤' })
  }
})
// 設定cooperation 說明 圖片網址 連結----第一區--------------------------
app.post('/cooperation02', async (req, res) => {
  try {
    const result = await db.cooperation02.create({
      coDescription02: req.body.coDescription02,
      coImg02: req.body.coImg02,
      coHref02: req.body.coHref02
    })
    res.status(200)
    res.send({
      success: true,
      message: '',
      coDescription02: req.body.coDescription02,
      coImg02: req.body.coImg02,
      coHref02: req.body.coHref02,
      _id: result._id
    })
  } catch (error) {
    if (error.name === 'ValidationError') {
      // 資料格式錯誤
      const key = Object.keys(error.errors)[0]
      const message = error.errors[key].message
      res.status(400)
      res.send({ success: false, message })
    } else {
      // 伺服器錯誤
      res.status(500)
      res.send({ success: false, message: '伺服器錯誤' })
    }
  }
})
app.get('/cooperation02/', async (req, res) => {
  try {
    const result = await db.cooperation02.find()
    res.status(200)
    res.send({ success: true, message: '', result })
  } catch (error) {
    res.status(500)
    res.send({ success: false, message: '伺服器錯誤' })
  }
})
// 設定cooperation 說明 圖片網址 連結----第一區--------------------------
app.post('/cooperation03', async (req, res) => {
  try {
    const result = await db.cooperation03.create({
      coDescription03: req.body.coDescription03,
      coImg03: req.body.coImg03,
      coHref03: req.body.coHref03
    })
    res.status(200)
    res.send({
      success: true,
      message: '',
      coDescription03: req.body.coDescription03,
      coImg03: req.body.coImg03,
      coHref03: req.body.coHref03,
      _id: result._id
    })
  } catch (error) {
    if (error.name === 'ValidationError') {
      // 資料格式錯誤
      const key = Object.keys(error.errors)[0]
      const message = error.errors[key].message
      res.status(400)
      res.send({ success: false, message })
    } else {
      // 伺服器錯誤
      res.status(500)
      res.send({ success: false, message: '伺服器錯誤' })
    }
  }
})
app.get('/cooperation03/', async (req, res) => {
  try {
    const result = await db.cooperation03.find()
    res.status(200)
    res.send({ success: true, message: '', result })
  } catch (error) {
    res.status(500)
    res.send({ success: false, message: '伺服器錯誤' })
  }
})

// 封鎖前台帳號
app.patch('/users/:id', async (req, res) => {
  if (!req.headers['content-type'].includes('application/json')) {
    res.status(400)
    res.send({ success: false, message: '格式不符' })
    return
  }
  try {
    const result = await db.users.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.status(200)
    res.send({ success: true, message: '', result })
  } catch (error) {
    if (error.name === 'CastError') {
      // ID 格式不是 MongoDB 的格式
      res.status(400)
      res.send({ success: false, message: 'ID 格式錯誤' })
    } else if (error.name === 'ValidationError') {
      // 資料格式錯誤
      const key = Object.keys(error.errors)[0]
      const message = error.errors[key].message
      res.status(400)
      res.send({ success: false, message })
    } else {
      // 伺服器錯誤
      res.status(500)
      res.send({ success: false, message: '伺服器錯誤' })
    }
  }
})
// 刪除前台使用者
app.delete('/users/:id', async (req, res) => {
  try {
    const result = await db.users.findByIdAndDelete(req.params.id)
    if (result === null) {
      res.status(404)
      res.send({ success: false, message: '找不到資料' })
    } else {
      res.status(200)
      res.send({ success: true, message: '', result })
    }
  } catch (error) {
    if (error.name === 'CastError') {
      res.status(400)
      res.send({ success: false, message: 'ID 格式錯誤' })
    } else {
      // 伺服器錯誤
      res.status(500)
      res.send({ success: false, message: '伺服器錯誤' })
    }
  }
})
// 刪除某使用者的所有CASE
app.delete('/usercase/:account', async (req, res) => {
  try {
    const result = await db.cases.find({ account: req.params.user })
    for (let i = 0; i < result.length; i++) {
      if (result[i].user === req.params.account) {
        const delcase = await db.cases.findByIdAndDelete(result[i]._id)
        if (delcase === null) {
          res.status(404)
          res.send({ success: false, message: '找不到資料' })
        } else {
          res.status(200)
          res.send({ success: true, message: '', delcase })
        }
      }
    }
  } catch (error) {
    if (error.name === 'CastError') {
      res.status(400)
      res.send({ success: false, message: 'ID 格式錯誤' })
    } else {
      // 伺服器錯誤
      res.status(500)
      res.send({ success: false, message: '伺服器錯誤' })
    }
  }
})
// 封鎖後台帳號
app.patch('/admins/:id', async (req, res) => {
  if (!req.headers['content-type'].includes('application/json')) {
    res.status(400)
    res.send({ success: false, message: '格式不符' })
    return
  }
  try {
    const result = await db.admins.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.status(200)
    res.send({ success: true, message: '', result })
  } catch (error) {
    if (error.name === 'CastError') {
      // ID 格式不是 MongoDB 的格式
      res.status(400)
      res.send({ success: false, message: 'ID 格式錯誤' })
    } else if (error.name === 'ValidationError') {
      // 資料格式錯誤
      const key = Object.keys(error.errors)[0]
      const message = error.errors[key].message
      res.status(400)
      res.send({ success: false, message })
    } else {
      // 伺服器錯誤
      res.status(500)
      res.send({ success: false, message: '伺服器錯誤' })
    }
  }
})


// 抓到該後台使用者的ID 判斷是否被封鎖
// app.get('/admins/:id', async (req, res) => {
//   try {
//     const result = await db.admins.find()
//     res.status(200)
//     res.send({ success: true, message: '', result })
//   } catch (error) {
//     res.status(500)
//     res.send({ success: false, message: '伺服器錯誤' })
//   }
// })

// 抓該使用者的帳號資料
app.get('/users/:user', async (req, res) => {
  try {
    const result = await db.users.find({ account: req.params.user })
    res.status(200)
    res.send({ success: true, message: '', result })
  } catch (error) {
    res.status(500)
    res.send({ success: false, message: '伺服器錯誤' })
  }
})

// 修改意見的處理進度 -----------------------------------------
app.patch('/msg/:id', async (req, res) => {
  if (!req.headers['content-type'].includes('application/json')) {
    res.status(400)
    res.send({ success: false, message: '格式不符' })
    return
  }
  try {
    const result = await db.contact.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.status(200)
    res.send({ success: true, message: '', result })
  } catch (error) {
    if (error.name === 'CastError') {
      // ID 格式不是 MongoDB 的格式
      res.status(400)
      res.send({ success: false, message: 'ID 格式錯誤' })
    } else if (error.name === 'ValidationError') {
      // 資料格式錯誤
      const key = Object.keys(error.errors)[0]
      const message = error.errors[key].message
      res.status(400)
      res.send({ success: false, message })
    } else {
      // 伺服器錯誤
      res.status(500)
      res.send({ success: false, message: '伺服器錯誤' })
    }
  }
})

// 後台刪除 意見  -----------------------------------------
app.delete('/msg/:id', async (req, res) => {
  try {
    const result = await db.contact.findByIdAndDelete(req.params.id)
    if (result === null) {
      res.status(404)
      res.send({ success: false, message: '找不到資料' })
    } else {
      res.status(200)
      res.send({ success: true, message: '', result })
    }
  } catch (error) {
    if (error.name === 'CastError') {
      res.status(400)
      res.send({ success: false, message: 'ID 格式錯誤' })
    } else {
      // 伺服器錯誤
      res.status(500)
      res.send({ success: false, message: '伺服器錯誤' })
    }
  }
})

// 推進 後台操作紀錄 adminlog -----------------------------------------
// app.post('/log', async (req, res) => {
//   try {
//     const result = await db.adminlog.create({
//       number: req.session.user,
//       title: req.body.title,
//       type: req.body.type,
//       budget: req.body.budget,
//       description: req.body.description,
//       date: req.body.date
//     })
//     res.status(200)
//     res.send({
//       success: true,
//       message: '',
//       title: req.body.title,
//       _id: result._id,
//       type: req.body.type,
//       budget: req.body.budget,
//       description: req.body.description,
//       date: req.body.date
//     })
//   } catch (error) {
//     console.log(error)
//     if (error.name === 'ValidationError') {
//       // 資料格式錯誤
//       const key = Object.keys(error.errors)[0]
//       const message = error.errors[key].message
//       res.status(400)
//       res.send({ success: false, message })
//     } else {
//       // 伺服器錯誤
//       res.status(500)
//       res.send({ success: false, message: '伺服器錯誤' })
//     }
//   }
// })
