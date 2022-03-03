const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const knex = require('knex')

const db = knex({
  client: 'mysql',
  connection: {
    host: process.env.MYSQL_HOST || '127.0.0.1',
    port: process.env.MYSQL_PORT || 3306,
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASS || '',
    database: process.env.MYSQL_DB || 'club',
    supportBigNumber: true,
    timezone: '+7:00',
    dateStrings: true,
    charset: 'utf8mb4_unicode_ci',
  },
})
const app = express()
app.use(cors())
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send({ ok: 1 })
})
// login
app.post('/Login', async (req, res) => {
  console.log(req.body)
  try {
    let rows = await db('users')
      .where('firstname', '=', req.body.firstname)
      .where('user_type', '=', req.body.user_type)
    if (rows.length === 0) {
      res.send({
        ok: false,
        message: 'ชื่อหรือรหัสผ่าน ไม่ถูกต้อง',
      })
    } else {
      res.send({
        status: 1,
        datas: rows[0],
      })
    }
  } catch (e) {
    console.log('error')
    console.log(e.message)
    res.send({
      status: 0,
      error: e.message,
    })
  }
})
app.get('/savecheck', async (req, res) => {
  console.log('data=', req.query)
  try {
    let rows = await db('users_student').insert({
      ma: req.body.ma,
    })
  } catch (e) {
    console.log('error')
    console.log(e.message)
    res.send({
      status: 0,
      error: e.message,
    })
  }
})
// app.post('/Save', async (req, res) => {
//   console.log('data=', req.body)
//   try {
//     let row = await db('users').insert({
//       firstname: req.body.username,
//       passwd: req.body.passwd,
//     })
//     res.send({
//       status: 1,
//     })
//   } catch (e) {
//     console.log('error')
//     console.log(e.message)
//     res.send({
//       status: 0,
//       error: e.message,
//     })
//   }
// })
app.get('/list', async (req, res) => {
  console.log('data=', req.query)
  let row = await db('users').where('id', '1')
  res.send({
    value: row,
    status: 'chaiyaphum technical',
  })
})

app.get('/list_std', async (req, res) => {
  console.log('data=', req.query)
  let row = await db('users_student').where('group_id', '100')
  res.send({
    value: row,
    status: 'chaiyaphum technical',
  })
})

app.get('/list1', async (req, res) => {
  console.log('data=', req.query)
  let row = await db('users').where('id', req.query.id)
  res.send({
    value: row[0],
    status: 'chaiyaphum technical',
  })
})

app.listen(7001, () => {
  console.log('ready:7001')
})
