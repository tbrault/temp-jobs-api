import { Request, Response } from "express";

function getNotFoundPage(req: Request, res: Response) {
  return res.status(404).send("This page does not exists");
}

export default getNotFoundPage;
