import axios from 'axios';
/**
 *
 * @param {request object from the next js component} req
 * @param {response object from the backend} res
 */
export default async function handler(req, res) {
  const token = req.cookies.token;
  if (!token) {
    res.status(401).json({
      error: 'Unauthorized',
    });
  }

  //   if token is present make call to the backend
  const apiUrl = process.env.API_URL;
  const userEndPoint = `${apiUrl}/users`;

  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  //   api call to fetch user from token
  axios
    .get(userEndPoint, { headers })
    .then((response) => {
      const user = response.data;
      res.status(200).json({
        user: user,
      });
    })
    .catch((error) => {
      res.status(error.response.status).json({
        error: error.message,
      });
    });
}
