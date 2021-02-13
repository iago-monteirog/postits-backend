import { createUser, loginService, userAuthorizer } from './service'
import {
  created, serverError, badRequest, ok,
} from '../../utils/responses'

const AUTHORIZATION_KEY = 'authorization'

export const createAccount = async (event) => {
  try {
    const body = JSON.parse(event.body)
    const token = await createUser(body)
    return created({ [AUTHORIZATION_KEY]: token })
  } catch (error) {
    if (error.code === 11000) return badRequest('email exists')

    return serverError(error)
  }
}

export const login = async (event) => {
  try {
    const body = JSON.parse(event.body)
    const token = await loginService(body)
    return ok({ [AUTHORIZATION_KEY]: token })
  } catch (error) {
    if (error.message === 'password_incorrect') return badRequest('password_incorrect')
    return serverError(error)
  }
}

export const authorizer = async ({ authorizationToken, methodArn }) => {
  try {
    const policy = await userAuthorizer(authorizationToken, methodArn)
    return policy
  } catch (error) {
    return serverError(error)
  }
}
