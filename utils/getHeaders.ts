import createToken from './createToken'

export default function getHeaders (): Headers {

  if (
    !process.env.SECRET_KEY ||
    !process.env.API_RECORD_ID ||
    !process.env.API_APP_NAME ||
    !process.env.API_KEY
  ) throw new Error('Missing environment variables')

  const headers = new Headers()
  headers.append('Content-Type', 'application/json')
  headers.append('Authorization', createToken(process.env.SECRET_KEY, { recordId: process.env.API_RECORD_ID, App: process.env.API_APP_NAME, Key: process.env.API_KEY }))
  return headers
}