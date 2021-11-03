export const isEmptyObject = (obj: any): boolean => {
  return !obj || Object.keys(obj).length === 0
}

export const isNotEmptyObject = (obj: any) => {
  return !isEmptyObject(obj)
}

export const parseJSON = (str: string): any => {
  try {
    return JSON.parse(str)
  } catch (e: any) {
    return null
  }
}

export const stringifyJSON = (json: object): any => {
  try {
    return JSON.stringify(json)
  } catch (e: any) {
    return ''
  }
}
