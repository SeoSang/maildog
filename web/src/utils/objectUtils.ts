export const isEmptyObject = (obj: any): boolean => {
  return !obj || Object.keys(obj).length === 0
}

export const isNotEmptyObject = (obj: any) => {
  return !isEmptyObject(obj)
}

export const parseJSON = (str: string): Object => {
  try {
    return JSON.parse(str)
  } catch (e: any) {
    return {}
  }
}

export const stringifyJSON = (json: object): string => {
  try {
    return JSON.stringify(json)
  } catch (e: any) {
    return ''
  }
}

export const mapObjectValueToJSON = (object: any, targetKeys: string[]) => {
  targetKeys.forEach((key) => {
    if (object[key] && typeof object[key] === 'string') {
      object[key] = parseJSON(object[key])
    }
  })
}
