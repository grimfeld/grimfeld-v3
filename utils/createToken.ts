import CryptoJS from 'crypto-js'

export default function createToken (secret: string, data: { recordId: string, App: string, Key: string }) {
  return `Api-key ${CryptoJS.AES.encrypt(JSON.stringify(data), secret).toString()}`
}