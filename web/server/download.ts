const fs = require('fs')
const path = require('path')

const axios = require('axios')

export const downloadImage = async (
  url: string,
  targetPath: string,
  fileMame: string,
) => {
  const writer = fs.createWriteStream(path.resolve(targetPath, fileMame))

  const response = await axios({
    url,
    method: 'GET',
    responseType: 'stream',
  })

  response.data.pipe(writer)

  return new Promise((resolve, reject) => {
    writer.on('finish', () => {
      return resolve(`${fileMame} download success!`)
    })
    // eslint-disable-next-line prefer-promise-reject-errors
    writer.on('error', (err: Error) => reject(err))
  })
}
