import express, { Request, Response } from "express";

const app = express();
const port = 3000; // You can choose any port

const jobs: any = {};

const updateJob = (jobId: string, prg: number) => {
  jobs[jobId] = prg;
  console.log(`updated ${jobId} to ${prg}`);

  if (prg == 100) return;

  setTimeout(() => updateJob(jobId, prg + 10), 3000);
};

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World from TypeScript and Express!");
});

app.post("/submit", (req: Request, res: Response) => {
  const jobId = `job:${Date.now()}`;
  jobs[jobId] = 0;
  updateJob(jobId, 0);
  res.end("\n\n" + jobId + "\n\n");
});

app.get("/checkStatus", (req: Request, res: Response) => {
  console.log(jobs[req.query.jobId as any]);
  res.end("\n\nJobStatus: " + jobs[req.query.jobId as any] + "%\n\n");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

// urls to use:
// curl -X POST http://localhost:3000/submit
// curl -X GET http://localhost:3000/checkstatus?jobId=job:1719135968441
