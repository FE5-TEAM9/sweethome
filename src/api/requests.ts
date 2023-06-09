import { FormEvent } from 'react'

// const options = (method, param) => ({
//   method,
//   headers: {
//     'content-type': 'application/json',
//     'apikey': 'KDT5_nREmPe9B',
//     'username': 'KDT5_Team9'
//   },
//   body: JSON.stringify(param)
// })

// Sign-Up 회원가입
interface RequestBody {
  email: string
  password: string
  displayName: string
}

const signUp = async (body: RequestBody) => {
  const res = await fetch(
    'https://asia-northeast3-heropy-api.cloudfunctions.net/api/auth/signup',
    {
      method: "POST",
      headers: {
        'content-type': 'application/json',
        'apikey': 'KDT5_nREmPe9B',
        'username': 'KDT5_Team9'
      },
      body: JSON.stringify(body)
    }
   )
  const data = await res.json()
  console.log(data)
  return data
}

export { signUp }