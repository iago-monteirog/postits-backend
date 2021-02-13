import BoardSchema from './schema'
import connectToDataBase from '../../utils/connectToDatabase'

export const createBoard = async (user, data) => {
  await connectToDataBase()
  return BoardSchema.create({
    name: data.name,
    owner: user.id,
    createdDate: new Date(),
    updatedDate: new Date(),
  })
}
