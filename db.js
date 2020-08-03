import dotenv from 'dotenv'
import mongoose from 'mongoose'
import beautifyUnique from 'mongoose-beautiful-unique-validation'
import validator from 'validator'
dotenv.config()
const Schema = mongoose.Schema
mongoose.connect(process.env.DBURL, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.plugin(beautifyUnique)

// 前台使用者帳號
const userSchema = new Schema({
  account: {
    type: String,
    minlength: [4, '帳號必須四個字以上'],
    maxlength: [20, '帳號必須二十個字以下'],
    unique: '帳號已使用',
    required: [true, '請輸入帳號']
  },
  password: {
    type: String,
    required: [true, '請輸入密碼']
  },
  nickname: {
    type: String,
    required: [true, '請輸入暱稱']
  },
  email: {
    type: String,
    require: [true, '信箱必填'],
    validate: {
      validator (value) {
        return validator.isEmail(value)
      },
      message: '信箱格式錯誤'
    }
  },
  block: {
    type: Boolean,
    require: [true, 'block']
  }
}, {
  versionKey: false
})
// 案件
const caseSchema = new Schema({
  user: {
    type: String,
    required: [true, '沒有使用者名稱']
  },
  title: {
    type: String,
    maxlength: [50, '標題必須50個字以下'],
    required: [true, '標題必填']
  },
  type: {
    type: String,
    required: [true, '請選案件類型']
  },
  budget: {
    type: String,
    maxlength: [99, '超過字數限制'],
    required: [true, '請填入預算']
  },
  description: {
    type: String,
    maxlength: [200, '說明必須200個字以下'],
    required: [true, '請填寫說明欄位']
  },
  date: {
    type: String,
    required: [true, '沒有提案日期']
  },
  isedit: {
    type: Boolean,
    required: [true, 'isedit']
  }
}, {
  versionKey: false
})
// 聯繫我們意見
const contactSchema = new Schema({
  user: {
    type: String,
    required: [true, '沒有使用者名稱']
  },
  text: {
    type: String,
    minlength: [5, '內容須大於5字'],
    maxlength: [60, '內容須小於60字']
  },
  process: {
    type: Boolean,
    require: [true, 'process']
  }
})
// 收藏清單
const likecaseSchema = new Schema({
  user: {
    type: String,
    required: [true, '沒有使用者名稱']
  },
  caseid: {
    type: String,
    required: [true, '沒有caseID']
  },
  title: {
    type: String,
    required: [true, 'title']
  },
  type: {
    type: String
  },
  budget: {
    type: String
  },
  description: {
    type: String,
    required: [true, 'description']
  },
  date: {
    type: String,
    required: [true, 'date']
  }
})
// 後台帳號
const adminSchema = new Schema({
  account: {
    type: String,
    minlength: [4, '帳號必須四個字以上'],
    maxlength: [20, '帳號必須二十個字以下'],
    unique: '帳號已使用',
    required: [true, '請輸入帳號']
  },
  password: {
    type: String,
    required: [true, '請輸入密碼']
  },
  block: {
    type: Boolean,
    require: [true, 'block']
  }
}, {
  versionKey: false
})

// PTT CODeJOB
const pttcaseSchema = new Schema({
  title: {
    type: String,
    required: [true, '沒有使用者名稱']
  },
  href: {
    type: String
  }
})

// 首頁文案 第一張~第四張
const settingSchema = new Schema({
  bannerTitle: {
    type: String,
    required: [true, 'bannerTitle']
  },
  bannerText: {
    type: String,
    required: [true, 'bannerText']
  }
})
const setting02Schema = new Schema({
  bannerTitle02: {
    type: String,
    required: [true, 'bannerTitle02']
  },
  bannerText02: {
    type: String,
    required: [true, 'bannerText02']
  }
})
const setting03Schema = new Schema({
  bannerTitle03: {
    type: String,
    required: [true, 'bannerTitle02']
  },
  bannerText03: {
    type: String,
    required: [true, 'bannerText02']
  }
})
const setting04Schema = new Schema({
  bannerTitle04: {
    type: String,
    required: [true, 'bannerTitle02']
  },
  bannerText04: {
    type: String,
    required: [true, 'bannerText02']
  }
})

// 後台操作紀錄
const adminlogSchema = new Schema({
  number: {
    type: String,
    required: [true, '沒有number']
  },
  admin: {
    type: String,
    required: [true, '沒有admin']
  },
  what: {
    type: String,
    maxlength: [50, '標題必須50個字以下'],
    required: [true, '操作項目']
  },
  who: {
    type: String,
    required: [true, '對誰操作']
  },
  date: {
    type: String,
    required: [true, '沒有提案日期']
  }
}, {
  versionKey: false
})

// 合作區塊說明coDescription、coImg、coHref 第一區-------------------------------------
const cooperationSchema = new Schema({
  coDescription: {
    type: String,
    required: [true, 'coDescription']
  },
  coImg: {
    type: String,
    required: [true, 'coImg']
  },
  coHref: {
    type: String,
    required: [true, 'coHref']
  }
})
const cooperation02Schema = new Schema({
  coDescription02: {
    type: String,
    required: [true, 'coDescription']
  },
  coImg02: {
    type: String,
    required: [true, 'coImg']
  },
  coHref02: {
    type: String,
    required: [true, 'coHref']
  }
})
const cooperation03Schema = new Schema({
  coDescription03: {
    type: String,
    required: [true, 'coDescription']
  },
  coImg03: {
    type: String,
    required: [true, 'coImg']
  },
  coHref03: {
    type: String,
    required: [true, 'coHref']
  }
})
const users = mongoose.model(process.env.COLLECTION_USER, userSchema)
const cases = mongoose.model(process.env.COLLECTION_CASE, caseSchema)
const contact = mongoose.model(process.env.COLLECTION_MSG, contactSchema)
const likecase = mongoose.model(process.env.COLLECTION_LIKE, likecaseSchema)
const admins = mongoose.model(process.env.COLLECTION_ADMIN, adminSchema)
const pttcase = mongoose.model(process.env.COLLECTION_PTT, pttcaseSchema)
const setting = mongoose.model(process.env.COLLECTION_SETTING, settingSchema)
const setting02 = mongoose.model(process.env.COLLECTION_SETTING02, setting02Schema)
const setting03 = mongoose.model(process.env.COLLECTION_SETTING03, setting03Schema)
const setting04 = mongoose.model(process.env.COLLECTION_SETTING04, setting04Schema)
const cooperation = mongoose.model(process.env.COLLECTION_COOP, cooperationSchema)
const cooperation02 = mongoose.model(process.env.COLLECTION_COOP02, cooperation02Schema)
const cooperation03 = mongoose.model(process.env.COLLECTION_COOP03, cooperation03Schema)
const adminlog = mongoose.model(process.env.COLLECTION_LOG, adminlogSchema)

const connection = mongoose.connection

export default {
  users,
  cases,
  contact,
  likecase,
  admins,
  pttcase,
  setting,
  setting02,
  setting03,
  setting04,
  cooperation,
  cooperation02,
  cooperation03,
  adminlog,
  connection
}
