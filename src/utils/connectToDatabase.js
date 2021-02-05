import mongoose from 'mongoose'

mongoose.Promise = global.Promise

let isConnect = null

export default async (url = process.env.MONGO_URL) => {
  if (isConnect) return Promise.resolve()

  const db = await mongoose.connect(url, {
    useNewUrlParser: true,
    userCreateIndex: true,
    useUnifiedTopology: true,
  })

  isConnect = db.connections[0].readyState

  return Promise.resolve()
}
