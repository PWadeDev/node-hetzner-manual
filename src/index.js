import { createServer } from "node:http";
import { parse } from "node:url";

const port = 3000;

const handlers = {
  GET: {
    "/": (_req, res) => {
      console.log("Serving root HTML page");

      res.writeHead(200, { "Content-Type": "text/html" });
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
    },

    "/books": (_req, res) => {
      console.log("Serving book list");

      const books = [
        { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald" },
        { id: 2, title: "1984", author: "George Orwell" },
        { id: 3, title: "To Kill a Mockingbird", author: "Harper Lee" },
        { id: 4, title: "Brave New World", author: "Aldous Huxley" },
      ];

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(books, null, 2));
    },
  },
};

const server = createServer((req, res) => {
  const { pathname } = parse(req.url, true);
  const method = req.method;

  console.log(`Incoming request: ${method} ${pathname}`);

  const routeHandler = handlers[method]?.[pathname];

  if (routeHandler) {
    routeHandler(req, res);
  } else {
    console.log("Route not found");

    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Not Found" }));
  }
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
