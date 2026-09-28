import type { Request, Response } from 'express';
import { LikeService } from '../services/likeService.ts';

export class LikeController {
  constructor(private service: LikeService = new LikeService()) {}

  create = async (req: Request, res: Response): Promise<Response> => this.respond(res, () => this.service.createLike(req.body), 201);
  remove = async (req: Request, res: Response): Promise<Response> => this.respond(res, () => this.service.deleteLike(Number(req.params.reviewId), Number(req.params.userId)));

  private async respond(res: Response, action: () => Promise<unknown>, status = 200): Promise<Response> {
    try {
      return res.status(status).json({ status: 'success', data: await action() });
    } catch (error) {
      if (error instanceof Error && error.message === 'LIKE_NOT_FOUND') {
        return res.status(404).json({ status: 'fail', message: 'Like tidak ditemukan' });
      }
      return res.status(500).json({ status: 'error', message: 'Terjadi kesalahan pada server', error: error instanceof Error ? error.message : String(error) });
    }
  }
}