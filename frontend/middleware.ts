export { default } from 'next-auth/middleware'

export const config = {
    matcher: ['/dashboard/:path*', '/coach/:path*', '/discover/:path*', '/connections/:path*', '/feed/:path*', '/sessions/:path*', '/rooms/:path*', '/projects/:path*', '/teams/:path*', '/profile/:path*', '/skill-gap/:path*'],
}
