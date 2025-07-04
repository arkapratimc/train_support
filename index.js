// index.js (now at the root of your project)

/**
 * Handles incoming HTTP requests for the serverless function.
 * @param {import('@vercel/node').VercelRequest} request - The Vercel request object.
 * @param {import('@vercel/node').VercelResponse} response - The Vercel response object.
 */
export default function handler(request, response) {
  // Set the HTTP status code to 200 (OK)
  response.statusCode = 200;

  // Set the Content-Type header to indicate JSON response
  response.setHeader('Content-Type', 'application/json');

  // Send a JSON response with a 'message' field
  response.json({ message: 'Hello, World from Vercel Serverless Function!' });

  // Alternatively, for a plain text response:
  // response.status(200).send('Hello, World from Vercel Serverless Function!');
}
