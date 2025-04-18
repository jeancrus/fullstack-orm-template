import prisma from "@/prisma";
import { Request, Response } from "express";

class UsersController {
  async index(request: Request, response: Response) {
    const users = await prisma.user.findMany();

    return response.json(users);
  }

  async create(request: Request, response: Response) {
    const { name, email } = request.body;

    const user = await prisma.user.create({
      data: {
        name,
        email,
      },
    });

    return response.status(201).json(user);
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;

    const user = await prisma.user.findUnique({
      where: { id },
    });

    return response.json(user);
  }
}

export { UsersController };
