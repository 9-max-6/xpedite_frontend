import { NextResponse } from 'next/server';
import axios from 'axios';
import { cookies } from 'next/headers';

export async function GET(req) {
  const apiUrl = process.env.API_URL;
  const mycycleEndpoint = `${apiUrl}api/requests/jets/`;

  const cookieStore = cookies();
  const token = cookieStore.get('accessToken')?.value;
  const body = await req.json();

  try {
    const response = await axios.post(mycycleEndpoint, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response);
    return new NextResponse(
      JSON.stringify({
        nesteddata: response.data,
      }),
      {
        status: 201,
      }
    );
  } catch (error) {
    console.log(error.message);

    return new NextResponse(JSON.stringify({ error: error.message }), {
      status: error.response ? error.response.status : 500,
    });
  }
}
