import { UnknownObj } from 'lib/types'

export const sleep = (delay: number) =>
  new Promise((resolve) => {
    setTimeout(() => resolve(undefined), delay)
  })

export const formatFileSize = (sizeInBytes: number) => {
  const thresh = 1000
  if (Math.abs(sizeInBytes) < thresh) {
    return sizeInBytes + ' B'
  }
  const units = ['KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  let u = -1
  do {
    sizeInBytes /= thresh
    ++u
  } while (Math.abs(sizeInBytes) >= thresh && u < units.length - 1)
  return sizeInBytes.toFixed(1) + ' ' + units[u]
}

export const sliceString = (str: string | null, sliceStart = 100, sliceEnd?: number) => {
  if (!str) return ''
  if (str.length > sliceStart) {
    return str.slice(0, sliceStart) + '...' + (sliceEnd ? str.slice(-Number(sliceEnd)) : '')
  }
  return str
}

export const addZero = (num: number) => ('0' + num).slice(-2)

export const snakeToCamel = (str: string) =>
  str
    .toLowerCase()
    .replace(/([-_][a-z])/g, (group) => group.toUpperCase().replace('-', '').replace('_', ''))

export const safeParseJSON = (obj: string | Array<UnknownObj | string> | UnknownObj) => {
  if (typeof obj === 'string') {
    return JSON.parse(obj)
  } else {
    return obj
  }
}
