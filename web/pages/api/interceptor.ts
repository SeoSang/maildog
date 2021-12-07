import { NextApiRequest, NextApiResponse } from 'next'

// export const authenticator = (req: NextApiRequest) => {
//   if (req.statusCode === 401) {
//     return new Response('Auth required', {
//       status: 401,
//       headers: {
//         'WWW-Authenticate': 'Basic realm="Secure Area"',
//       },
//     })
//   }
//   return null
// }

export const authorizator =
  (func: (_: NextApiRequest, __: NextApiResponse) => Promise<void>) =>
  (req: NextApiRequest, res: NextApiResponse) => {
    if (res.statusCode === 401) {
      return res.status(401).json({ message: 'authorization Failed.' })
    }
    return func(req, res)
  }
