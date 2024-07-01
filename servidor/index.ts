import express, { Request, Response } from 'express';
import cors from "cors"

const app = express();
const PORT = 3000;
app.use(cors());

app.use(express.static('public'));

app.get('/time', (req: Request, res: Response) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  const sendTime = () => {
    const now = new Date();
    const time = now.toLocaleTimeString();
    res.write(`data: ${time}\n\n`);
  };

  const intervalId = setInterval(sendTime, 1000);
  
  res.on('close', () => {
    clearInterval(intervalId);

    res.end();
  });
});



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
