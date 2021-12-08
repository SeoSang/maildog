import { NextApiRequest, NextApiResponse } from 'next'
import { BreedImageParam } from '@/server/dog/dogapi/type'
import { sendMail } from '@/server/mail'
import { getBreedImageUrlsById } from '@/server/dog/dogapi'
import { generatePhotoFrame } from '@/server/mail/html'
import { authorizator } from '@/pages/api/interceptor'

const mail = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    let result
    switch (req.method) {
      case 'POST': // send mail
        const {
          imageParam,
          fromEmail,
          targetEmail,
        }: {
          imageParam: BreedImageParam
          fromEmail: string
          targetEmail: string
        } = req.body
        if (!fromEmail || !targetEmail || !imageParam?.breed_id) {
          return res.status(400).json({ message: 'Wrong parameter !' })
        }
        const imageUrls = await getBreedImageUrlsById(imageParam)
        await sendMail(fromEmail, targetEmail, imageUrls)
        result = {
          message: `Email was sent to ${targetEmail}`,
          example: generatePhotoFrame(imageUrls, 'image'),
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
