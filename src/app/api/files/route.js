import axios from 'axios';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

/**
 *
 * @param {*} req
 * @returns
 */
export async function GET(req) {
  const apiUrl = process.env.API_URL;
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  const supercycleEndpoint = `${apiUrl}api/files/${id}/bin/`;

  const cookieStore = cookies();
  const token = cookieStore.get('accessToken')?.value;

  try {
    const response = await axios.get(supercycleEndpoint, {
      responseType: 'arraybuffer',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const res = new NextResponse(response.data);
    res.headers.set('Content-Type', 'application/pdf');
    res.headers.set(
      'Content-Disposition',
      `attachment; filename="${
        response.headers['content-disposition']?.split('filename=')[1] ||
        'download.pdf'
      }"`
    );

    return res;
  } catch (error) {
    console.log(error.toString());

    return new NextResponse(JSON.stringify({ error: error.message }), {
      status: error.response ? error.response.status : 500,
    });
  }
}
