import server from "../server";

export default async function handler(req: any, res: any) {
  try {
    const url = `https://${req.headers.host}${req.url}`;

    const request = new Request(url, {
      method: req.method,
      headers: req.headers as any,
      body: ["GET", "HEAD"].includes(req.method) ? undefined : req,
    });

    const response = await server.fetch(request, {}, {});

    res.statusCode = response.status;

    response.headers.forEach((value, key) => {
      res.setHeader(key, value);
    });

    const body = Buffer.from(await response.arrayBuffer());
    res.end(body);
  } catch (err) {
    console.error(err);
    res.statusCode = 500;
    res.end("Internal Server Error");
  }
}