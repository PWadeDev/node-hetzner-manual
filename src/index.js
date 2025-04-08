import { createServer } from "node:http";

const port = 3000;

const server = createServer((req, res) => {
  // Set response HTTP headers
  res.writeHead(200, { "Content-Type": "text/html" });

  // Send basic HTML content
  res.end(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Hello</title>
      </head>
      <body>
        <h1>Hello World</h1>
      </body>
    </html>
  `);
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
