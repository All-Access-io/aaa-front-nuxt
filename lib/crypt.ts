import crypto from 'crypto-es'

export function crypt() {
  return {
    md5(str: string) {
      return crypto.MD5(str).toString()
    },
  }
}
