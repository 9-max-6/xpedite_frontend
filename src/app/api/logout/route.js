import { NextResponse } from 'next/server';
import { serialize } from 'cookie';

/**
 * Handles the POST request to log out the user by deleting the cookies.
 *
 * @param {Request} req The request object from the Next.js component
 * @returns {NextResponse} The response object with cookies deleted or error message
 */
export async function POST(req) {
  try {
    const responseHeaders = new Headers();

    responseHeaders.append(
      'Set-Cookie',
      serialize('accessToken', '', {
        httpOnly: true,
        path: '/',
        expires: new Date(0),
      })
    );
    responseHeaders.append(
      'Set-Cookie',
      serialize('refreshToken', '', {
        httpOnly: true,
        secure: true,
        path: '/',
        expires: new Date(0),
      })
    );

    return new NextResponse(
      JSON.stringify({ message: 'Logged out successfully' }),
      {
        status: 200,
        headers: responseHeaders,
      }
    );
  } catch (error) {
    console.error(error.toString());

    return new NextResponse(JSON.stringify({ error: error.message }), {
      status: error.response ? error.response.status : 500,
    });
  }
}
