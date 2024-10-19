import { NextResponse } from 'next/server';
import axios from 'axios';
import { cookies } from 'next/headers';

export async function POST(req) {
  const apiUrl = process.env.API_URL;
  const { searchParams } = new URL(req.url);
  const supercycle = searchParams.get('supercycle');
  const mycycleEndpoint = `${apiUrl}api/requests/?supercycle=${supercycle}`;

  const cookieStore = cookies();
  const token = cookieStore.get('accessToken')?.value;
  const body = await req.formData(); // Change here

  // If you want to log the contents of body
  const data = {};
  body.forEach((value, key) => {
    data[key] = value;
  });

  console.log(data);

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

export async function GET(req) {
  const apiUrl = process.env.API_URL;
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  const mycycleEndpoint = `${apiUrl}api/requests/${id}/`;

  const cookieStore = cookies();
  const token = cookieStore.get('accessToken')?.value;

  try {
    const response = await axios.get(mycycleEndpoint, {
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