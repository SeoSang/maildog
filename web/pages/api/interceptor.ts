import { NextApiRequest, NextApiResponse } from 'next'

export const authorizator =
  (func: (_: NextApiRequest, __: NextApiResponse) => Promise<void>) =>
  (req: NextApiRequest, res: NextApiResponse) => {
    console.log(res.statusCode)
    if (res.statusCode === 401) {
      return res.status(401).json({ message: 'authorization Failed.' })
    }
    return func(req, res)
  }
