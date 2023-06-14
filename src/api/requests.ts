

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
interface SignUpBody {
  email: string
  password: string
  displayName: string
}

const signUp = async (body: SignUpBody) => {
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

// Add-Products 상품등록
interface AddProductsBody {
  title: string
  price: number
  description: string
  tags?: string
  thumbnailBase64?: string 
  photoBase64?: string 
  discountRate?: number 
}

const addProducts = async (body: AddProductsBody) => {
  const res = await fetch(
    'https://asia-northeast3-heropy-api.cloudfunctions.net/api/products',
    {
      method: "POST",
      headers: {
        'content-type': 'application/json',
        'apikey': 'KDT5_nREmPe9B',
        'username': 'KDT5_Team9',
        'masterKey': true
      },
      body: JSON.stringify(body)
    }
   )
  const data = await res.json()
  console.log(data)
  return data
}

export { signUp, addProducts }