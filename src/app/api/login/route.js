import axios from 'axios';
import { NextResponse } from 'next/server';
import { serialize } from 'cookie';

/**
 * Handles the POST request to authenticate the user and set the access/refresh tokens in cookies.
 *
 * @param {Request} req The request object from the Next.js component
 * @returns {NextResponse} The response object with cookies set or error message
 */
export async function POST(req) {
  const apiUrl = process.env.API_URL;
  const tokenEndPoint = `${apiUrl}api/token/`;

  const body = await req.json();
  const { email, password } = body;

  try {
    const response = await axios.post(tokenEndPoint, { email, password });
    const { access, refresh } = response.data;

    const responseHeaders = new Headers();
    responseHeaders.append(
      'Set-Cookie',
      serialize('accessToken', access, {
        httpOnly: true,
        secure: process.env.environment == 'production',
        maxAge: 60 * 60 * 24 * 30,
        path: '/',
      })
    );
    responseHeaders.append(
      'Set-Cookie',
      serialize('refreshToken', refresh, {
        httpOnly: true,
        secure: true,
        maxAge: 60 * 60 * 24 * 30,
        path: '/',
      })
    );

    return new NextResponse(
      JSON.stringify({ message: 'Signed in successfully' }),
      {
        status: 200,
        headers: responseHeaders,
      }
    );
  } catch (error) {
    console.log(error.toString());

    return new NextResponse(JSON.stringify({ error: error.message }), {
      status: error.response ? error.response.status : 500,
    });
  }
}
