import { NextApiRequest, NextApiResponse } from 'next'

import { authorizator } from '@/pages/api/interceptor'
import { getBreedImageUrlsById } from '@/server/dog/dogapi'
import { BreedImageParam } from '@/server/dog/dogapi/type'
import { sendMail } from '@/server/mail'
import { generatePhotoFrame, PhotoParam } from '@/server/mail/html'

const mail = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    let result
    switch (req.method) {
      case 'POST': // send mail
        const {
          imageParam,
          breedIdList,
          fromEmail = '"MailDog ð" <foo@example.com>',
          targetEmail,
        }: {
          imageParam: BreedImageParam
          breedIdList?: number[]
          fromEmail: string
          targetEmail: string
        } = req.body
        if (!targetEmail || (!imageParam?.breed_id && !breedIdList)) {
          return res.status(400).json({ message: 'Wrong parameter !' })
        }
        let photoParams: PhotoParam[] = []
        if (breedIdList && breedIdList?.length > 0) {
          for (const breedId of breedIdList) {
            const _imageUrls = await getBreedImageUrlsById({
              ...imageParam,
              breed_id: breedId,
            })
            photoParams = [
              ...photoParams,
              ..._imageUrls.map((imageUrl) => ({ imageUrl, breedId })),
            ]
          }
        } else {
          const __imageUrls = await getBreedImageUrlsById(imageParam)
          if (imageParam.breed_id) {
            photoParams = __imageUrls.map((imageUrl) => ({
              imageUrl,
              breedId: imageParam.breed_id ?? 1,
            }))
          }
        }
        if (!photoParams || photoParams.length === 0) {
          result = {
            message: `Photo Param Generate Fail!`,
          }
          return res.status(401).json(result)
        }
        await sendMail(fromEmail, targetEmail, photoParams)
        result = {
          message: `Email was sent to ${targetEmail}`,
          example: generatePhotoFrame(photoParams, 'image'),
        }
        return res.status(200).json(result)
      default:
        return res.status(501).json({ message: 'Unexpected request Method!' })
    }
  } catch (err) {
    console.log(err)
    return res.status(500).send('Unexpected Server Error')
  }
}

export default authorizator(mail)
