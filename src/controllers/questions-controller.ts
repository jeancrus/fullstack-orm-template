import prisma from "@/prisma";
import { Request, Response } from "express";

class QuestionsController {
  async index(request: Request, response: Response) {
    const { title, user_id } = request.query;

    const questions = await prisma.questions.findMany({
      where: {
        title: {
          contains: title as string,
          mode: "insensitive",
        },
        userId: user_id as string,
      },
      include: {
        user: true,
      },
      orderBy: {
        title: "asc",
      },
    });

    return response.json(questions);
  }

  async create(request: Request, response: Response) {
    const { title, content, user_id } = request.body;

    const question = await prisma.questions.create({
      data: {
        title,
        content,
        userId: user_id,
      },
    });

    return response.status(201).json(question);
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const { title, content } = request.body;

    await prisma.questions.update({
      where: { id },
      data: { title, content },
    });

    return response.json();
  }

  async remove(request: Request, response: Response) {
    const { id } = request.params;

    await prisma.questions.delete({
      where: { id },
    });

    return response.json();
  }
}

export { QuestionsController };
