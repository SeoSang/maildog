import { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  const auth = req.headers.get('x-api-key')

  if (!auth || auth !== process.env.NEXT_PUBLIC_API_KEY_BEAXIOS) {
    return new Response('Auth required', {
      status: 401,
    })
  }
}
