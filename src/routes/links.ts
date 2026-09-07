import { Router, type Request, type Response } from "express";
import prisma from "../database";
import { z } from "zod";

export const linksRouter = Router();

const ALPHABET =
  "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

function generateShortId(length: number) {
    let result = "";
    for (let i = 0; i < length; i++) {
        result += ALPHABET.charAt(Math.floor(Math.random() * ALPHABET.length));
    }
    return result;
}

const linkSchema = z.object({
    url: z.url(),
});

linksRouter.post("/api/links", async (req: Request, res: Response) => {
    const parsedLink = linkSchema.safeParse(req.body);
    if (!parsedLink.success) {
        return res.status(400).json({error: "URL is required"})
    }

    let result = generateShortId(6);
    for (let i = 0; i < 10; i++) {
        const existingLink = await prisma.link.findUnique({ where: { code: result } });
        if (!existingLink) break;
        result = generateShortId(6);
    }

    const link = await prisma.link.create({
        data: {code: result, longURL: parsedLink.data.url},
    });

    const shortUrl = `${process.env.SHORT_URL}/${link.code}`;
    return res.status(201).json ({ code: link.code, shortUrl });
});

linksRouter.get("/:shortId", async (req: Request, res: Response) => {
    const { shortId } = req.params;
    const link = await prisma.link.findUnique({ where: { code: shortId as string } });
    if (!link) {
        return res.status(404).json({ error: "Link not found" });
    }
    await prisma.link.update({
        where: {code: shortId as string},
        data: { clicks: {increment: 1}}
    })
    return res.redirect(link.longURL);
});