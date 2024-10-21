import axios from 'axios';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

/**
 *
 * @param {Request} req
 * @returns
 */
export async function GET(req) {
  const apiUrl = process.env.API_URL;
  const { searchParams } = new URL(req.url);
  const supercycle = searchParams.get('supercycle');
  const mycycleEndpoint = `${apiUrl}api/requests/me/?supercycle=${supercycle}`;

  const cookieStore = cookies();
  const token = cookieStore.get('accessToken')?.value;

  try {
    const response = await axios.get(mycycleEndpoint, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return new NextResponse(JSON.stringify({ nesteddata: response.data }), {
      status: 200,
    });
  } catch (error) {
    console.log(error.toString());

    return new NextResponse(JSON.stringify({ error: error.message }), {
      status: error.response ? error.response.status : 500,
    });
  }
}
