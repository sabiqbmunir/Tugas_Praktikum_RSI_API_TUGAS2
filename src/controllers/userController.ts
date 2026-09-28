import type { Request, Response } from "express";
import { UserService } from "../services/userService.ts";

export class UserController {
  constructor(private userService: UserService = new UserService()) {}

  getUsers = async (_req: Request, res: Response): Promise<Response> => {
    try {
      return res
        .status(200)
        .json({ status: "success", data: await this.userService.getUsers() });
    } catch (error) {
      return this.handleError(res, error);
    }
  };

  createUser = async (req: Request, res: Response): Promise<Response> => {
    try {
      const user = await this.userService.createUser(req.body);
      return res.status(201).json({ status: "success", data: user });
    } catch (error) {
      return this.handleError(res, error);
    }
  };

  private handleError(res: Response, error: unknown): Response {
    if (error instanceof Error && error.message.startsWith("INVALID_USER_")) {
      return res.status(400).json({ status: "fail", message: error.message });
    }
    return res.status(500).json({
      status: "error",
      message: "Terjadi kesalahan pada server",
      error: error instanceof Error ? error.message : String(error),
    });
  }
}
