// import { NextResponse } from 'next/server';
// import axios from 'axios';
// import { cookies } from 'next/headers';

// /**
//  * Handles the POST request to authenticate the user and set the access/refresh tokens in cookies.
//  *
//  * @param {Request} req The request object from the Next.js component
//  * @returns {NextResponse} The response object with cookies set or error message
//  */
// export async function GET(req) {
//   const apiUrl = process.env.API_URL;
//   const { searchParams } = new URL(req.url);
//   const supercycle = searchParams.get('supercycle');
//   const mycycleEndpoint = `${apiUrl}api/cycles/me/?supercycle=${supercycle}`;

//   const cookieStore = cookies();
//   const token = cookieStore.get('accessToken')?.value;

//   try {
//     const response = await axios.get(mycycleEndpoint, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     return new NextResponse(JSON.stringify({ nesteddata: response.data }), {
//       status: 201,
//     });
//   } catch (error) {
//     console.log(error.toString());

//     return new NextResponse(JSON.stringify({ error: error.message }), {
//       status: error.response ? error.response.status : 500,
//     });
//   }
// }
