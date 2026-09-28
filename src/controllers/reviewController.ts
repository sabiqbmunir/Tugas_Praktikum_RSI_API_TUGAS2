import type { Request, Response } from 'express';
import { ReviewService } from '../services/reviewService.ts';

export class ReviewController {
  constructor(private service: ReviewService = new ReviewService()) {}

  getAll = async (_req: Request, res: Response): Promise<Response> => this.respond(res, () => this.service.getReviews());
  create = async (req: Request, res: Response): Promise<Response> => this.respond(res, () => this.service.createReview(req.body), 201);
  remove = async (req: Request, res: Response): Promise<Response> => this.respond(res, () => this.service.deleteReview(Number(req.params.id)));

  private async respond(res: Response, action: () => Promise<unknown>, status = 200): Promise<Response> {
    try {
      return res.status(status).json({ status: 'success', data: await action() });
    } catch (error) {
      if (error instanceof Error && error.message === 'REVIEW_NOT_FOUND') {
        return res.status(404).json({ status: 'fail', message: 'Ulasan tidak ditemukan' });
      }
      if (error instanceof Error && error.message === 'INVALID_REVIEW_RATING') {
        return res.status(400).json({ status: 'fail', message: 'Rating harus berupa bilangan bulat 1 sampai 5' });
      }
      return res.status(500).json({ status: 'error', message: 'Terjadi kesalahan pada server', error: error instanceof Error ? error.message : String(error) });
    }
  }
}