import { NextResponse, NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

//   we will declare which paths are public and which paths are not public 
  const isPublic = path==='/login' || path==='/signup'
//   login and signup paths should not be visible to somebody who has tokens

const token = request.cookies.get('token')?.value || ''
// token may be or may not be there that's why we have used the optional value '?'

if(isPublic && token){
    return NextResponse.redirect(new URL('/',request.nextUrl))
}

if(!isPublic && !token){
    return NextResponse.redirect(new URL('/login',request.nextUrl))
}


  
}
 
export const config = {
  matcher: [
    '/',
    '/profile',
    '/login',
    '/signup',
  ]
}