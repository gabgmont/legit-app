import crypto from 'crypto'

const secret = process.env.KEY_ENCRYPTION_SECRET!

export function encrypt(text: string) {
  console.log("Encrypting text:", secret)
  const iv = crypto.randomBytes(16)
  const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(secret, 'hex'), iv)
  const encrypted = Buffer.concat([cipher.update(text), cipher.final()])
  return iv.toString('hex') + ':' + encrypted.toString('hex')
}

export function decrypt(data: string) : `0x${string}` {
  const [ivHex, encryptedHex] = data.split(':')
  const iv = Buffer.from(ivHex, 'hex')
  const encryptedText = Buffer.from(encryptedHex, 'hex')
  const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(secret, 'hex'), iv)
  const decrypted = Buffer.concat([decipher.update(encryptedText), decipher.final()])
  return decrypted.toString('utf-8') as `0x${string}`
}
