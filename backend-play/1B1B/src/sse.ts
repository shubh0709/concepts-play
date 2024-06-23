import express, { Request, Response } from "express";

const app = express();
const port = 3000; // You can choose any port

let i = 0;
const send = (res: Response) => {
  res.write("data: " + `hello from server ----- [${i++}]\n\n`);

  setTimeout(() => send(res), 1000);
};

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World from TypeScript and Express!");
});

app.get("/stream", (req: Request, res: Response) => {
  res.setHeader("Content-Type", "text/event-stream");
  send(res);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});