const express = require('express')
const app = express()
const { MongoClient, ObjectId } = require('mongodb')
const connectUri = 'mongodb://localhost:27017'
const client = new MongoClient(connectUri)

//配置中间件 解析application/json数据
app.use(express.json())

//处理跨域请求
// app.all('*', (req, res, next) => {
//   // google需要配置，否则报错cors error
//   res.setHeader('Access-Control-Allow-Credentials', 'true')
//   // 允许的地址,http://127.0.0.1:9000这样的格式
//   res.setHeader('Access-Control-Allow-Origin', '*')
//   // 允许跨域请求的方法
//   res.setHeader(
//     'Access-Control-Allow-Methods',
//     'POST, GET, OPTIONS, DELETE, PUT'
//   )
//   // 允许跨域请求header携带哪些东西
//   res.header(
//     'Access-Control-Allow-Headers',
//     'Origin, X-Requested-With, Content-Type, Accept, If-Modified-Since'
//   )
//   next()
// })

//获取数据
app.get('/api/getArticles', async (req, res) => {
  try {
    await client.connect()
    const collection = client.db('test').collection('articles')
    let { _page = 1, _size = 10 } = req.query
    _page = parseInt(_page)
    _size = parseInt(_size)

    const ret = await collection
      .find() // 查询数据
      .skip((_page - 1) * _size) // 跳过多少条 10 1 0 2 10 3 20 n
      .limit(_size) // 拿多少条
    const articles = await ret.toArray()
    const articlesCount = await collection.countDocuments()
    res.status(200).json({
      articles,
      articlesCount
    })
  } catch (error) {
    console.log(error)
  }
})

//新增数据 create
app.post('/api/createArticle', async (req, res, next) => {
  try {
    //建立数据库连接
    await client.connect()
    const collection = client.db('test').collection('articles')

    const { article } = req.body
    article.createTime = new Date()
    article.updateTime = new Date()
    //获取数据响应
    const response = await collection.insertOne({ article })
    article._id = response.insertedId
    res.status(200).json({
      article
    })
  } catch (err) {
    next(err)
  }
})

//查询数据 read
app.post('/api/readArticles/:id', async (req, res, next) => {
  try {
    await client.connect()
    const collection = client.db('test').collection('articles')
    const article = await collection.findOne({
      _id: ObjectId(req.params.id)
    })
    res.status(200).json({
      article
    })
  } catch (err) {
    next(err)
  }
})

//修改数据 updae
app.patch(`/api/updateArticles/:id`, async (req, res, next) => {
  try {
    await client.connect()
    const collection = client.db('test').collection('articles')
    console.log(req.body.article, 1133)
    console.log(req.body.article)
    await collection.updateOne(
      {
        _id: ObjectId(req.params.id)
      },
      {
        $set: req.body.article
      }
    )
    const article = await await collection.findOne({
      _id: ObjectId(req.params.id)
    })

    res.status(200).json({
      article
    })
  } catch (err) {
    next(err)
  }
})

//删除数据
app.delete('/api/deleteArticles/:id', async (req, res, next) => {
  try {
    await client.connect()
    const collection = client.db('test').collection('articles')
    await collection.deleteOne({
      _id: ObjectId(req.params.id)
    })
    res.status(200).json({
      status: true,
      msg: 'success'
    })
  } catch (err) {
    next(err)
  }
})

app.use((err, req, res, next) => {
  console.log(err)
  res.status(500).json({ error: err.message })
})
app.disable('etag')
app.listen(3000, () => {
  console.log(`serving is running`)
})
