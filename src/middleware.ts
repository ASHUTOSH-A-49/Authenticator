import { NextResponse, NextRequest } from 'next/server'
 //middlewares plays crucial role in development 
// This function can be marked `async` if using `await` inside


export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  const token = request.cookies.get('token')?.value || ''

  const isPublicPath = path === '/login' || path === '/signup' || path === '/verifyemail'

  // console.log('➡️ Request path:', path)
  // console.log('🪪 Token:', token)
  // console.log('🌐 isPublic:', isPublicPath)

  if (isPublicPath && token) {
    // console.log('🔁 Redirect: already logged in → home')
    return NextResponse.redirect(new URL('/', request.url))
  }

  if (!isPublicPath && !token) {
    // console.log('🔒 Redirect: not logged in → login')
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next|api|static|favicon.ico).*)'],
}

 


//matches all routes except Next.js internals and lets you control access based on token presence
