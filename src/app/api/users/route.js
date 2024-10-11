// import { NextResponse } from 'next/server';
// import axios from 'axios';

// export async function GET(req) {
//   const apiUrl = process.env.API_URL;
//   const userEndPoint = `${apiUrl}/users/me`;

//   // Extract the cookies from the incoming request
//   const cookieHeader = req.headers.get('cookie');
//   console.log(`Bearer ${cookieHeader.access}`);

//   try {
//     // Make the API call to the Django backend, attaching the cookie to the request
//     const response = await axios.get(userEndPoint, {
//       headers: {
//         // Pass the cookie in the request headers to authenticate the user
//         Authorization: `Bearer ${cookieHeader.access}`,
//       },
//     });

//     // Return the user data from the backend
//     const user = response.data;
//     return NextResponse.json({ user });
//   } catch (error) {
//     // Handle any errors from the backend request
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }
