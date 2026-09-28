import type { Request, Response } from "express";
import { MenuItemService } from "../services/menuItemService.ts";

export class MenuItemController {
  constructor(private service: MenuItemService = new MenuItemService()) {}

  getAll = async (_req: Request, res: Response): Promise<Response> =>
    this.respond(res, async () => this.service.getMenuItems());
  getById = async (req: Request, res: Response): Promise<Response> =>
    this.respond(res, async () =>
      this.service.getMenuItem(Number(req.params.id)),
    );
  create = async (req: Request, res: Response): Promise<Response> =>
    this.respond(res, async () => this.service.createMenuItem(req.body), 201);
  update = async (req: Request, res: Response): Promise<Response> =>
    this.respond(res, async () =>
      this.service.updateMenuItem(Number(req.params.id), req.body),
    );
  remove = async (req: Request, res: Response): Promise<Response> =>
    this.respond(res, async () =>
      this.service.deleteMenuItem(Number(req.params.id)),
    );

  private async respond(
    res: Response,
    action: () => Promise<unknown>,
    status = 200,
  ): Promise<Response> {
    try {
      return res
        .status(status)
        .json({ status: "success", data: await action() });
    } catch (error) {
      if (error instanceof Error && error.message === "MENU_ITEM_NOT_FOUND") {
        return res
          .status(404)
          .json({ status: "fail", message: "Menu tidak ditemukan" });
      }
      return res
        .status(500)
        .json({
          status: "error",
          message: "Terjadi kesalahan pada server",
          error: error instanceof Error ? error.message : String(error),
        });
    }
  }
}
