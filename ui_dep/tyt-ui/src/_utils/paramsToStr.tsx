export default (params: any): string => {

  let str = ''
  const keys = params ? Object.keys(params) : []
  keys.forEach((key, index) => {
    if (params[key]) {
      str += index == 0 ? `${key}=${params[key]}` : `&${key}=${params[key]}`
    }
  })

  return str
} 