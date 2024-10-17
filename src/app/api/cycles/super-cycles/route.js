import { NextResponse } from 'next/server';
import axios from 'axios';
import { cookies } from 'next/headers';
import { parse } from 'cookie';

/**
 * Handles the POST request to authenticate the user and set the access/refresh tokens in cookies.
 *
 * @param {Request} req The request object from the Next.js component
 * @returns {NextResponse} The response object with cookies set or error message
 */
export async function POST(req) {
  const apiUrl = process.env.API_URL;
  const supercycleEndpoint = `${apiUrl}api/cycles/super-cycles/`;

  const cookieStore = cookies();
  const token = cookieStore.get('accessToken')?.value;

  const body = await req.json();
  const { title } = body;

  try {
    const response = await axios.post(
      supercycleEndpoint,
      { title },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return new NextResponse(JSON.stringify({ nesteddata: response.data }), {
      status: 201,
    });
  } catch (error) {
    console.log(error.toString());

    return new NextResponse(JSON.stringify({ error: error.message }), {
      status: error.response ? error.response.status : 500,
    });
  }
}