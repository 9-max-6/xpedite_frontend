import { NextResponse } from 'next/server';
import axios from 'axios';
import { serialize } from 'cookie';

/**
 * Handles the POST request to authenticate the user and set the access/refresh tokens in cookies.
 *
 * @param {Request} req The request object from the Next.js component
 * @returns {NextResponse} The response object with cookies set or error message
 */
export async function POST(req) {
  const apiUrl = process.env.API_URL;
  const userEndPoint = `${apiUrl}api/token/`;

  // logs
  console.log('Incoming Request Method:', req.method);
  console.log('Incoming Request Headers:', req.headers);
  console.log('Incoming Request Body:', req.body);
  console.log('API URL:', apiUrl);

  // Get the email and password from the request body
  const body = await req.json();
  const { email, password } = body;

  try {
    // API call to authenticate the user
    const response = await axios.post(userEndPoint, { email, password });
    const { access, refresh } = response.data;

    // Set cookies using Next.js headers
    const responseHeaders = new Headers();
    responseHeaders.append(
      'Set-Cookie',
      serialize('accessToken', access, {
        httpOnly: true, // Prevents JavaScript access to the cookie
        secure: process.env.NODE_ENV !== 'development', // Use secure in production
        maxAge: 600 * 15, // 15 minutes (access token expiry)
        path: '/', // Cookie is valid on the entire site
      })
    );
    responseHeaders.append(
      'Set-Cookie',
      serialize('refreshToken', refresh, {
        httpOnly: true, // Prevents JavaScript access to the cookie
        secure: process.env.NODE_ENV !== 'development', // Use secure in production
        maxAge: 60 * 60 * 24 * 30, // 30 days (refresh token expiry)
        path: '/', // Cookie is valid on the entire site
      })
    );

    // Return a success response with cookies
    return new NextResponse(
      JSON.stringify({ message: 'Signed in successfully' }),
      {
        status: 200,
        headers: responseHeaders,
      }
    );
  } catch (error) {
    console.log(error.toString());

    // Handle errors and return error response with status code and message
    return new NextResponse(JSON.stringify({ error: error.message }), {
      status: error.response ? error.response.status : 500,
    });
  }
}
