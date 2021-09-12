/* eslint-disable no-case-declarations */

import { NextApiRequest, NextApiResponse } from 'next'

export default async function history(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    switch (req.method) {
      case 'GET':
        try {
          return res.status(200).json({ a: 'success' })
        } catch (e) {
          console.log(e)
        }
        break
      default:
        return res.status(501).json({ alertText: 'Unexpected req Method!' })
    }
  } catch (err: any) {
    if (err?.response?.status) {
      res
        .status(err?.response?.status)
        .json({ alertText: err?.response?.statusText })
      return
    }
    console.log(err)
    return res.status(500).json({ alertText: 'Unexpected Server Error' })
  }
}
