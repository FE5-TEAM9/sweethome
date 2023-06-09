import { FormEvent } from 'react'

const options = (method, param) => ({
  method,
  headers: {
    'content-type': 'application/json',
    'apikey': 'KDT5_nREmPe9B',
    'username': 'KDT5_Team9'
  },
  body: JSON.stringify(param)
})

// Sign-Up 회원가입
const signUp = async (e: FormEvent) => {
  e.preventDefault();
  const res = await fetch(
    'https://asia-northeast3-heropy-api.cloudfunctions.net/api/auth/signup',
    options("POST", { email, password, displayName })
   )
  const data = await res.json()
  console.log(data)
  return data
}

export default signUp