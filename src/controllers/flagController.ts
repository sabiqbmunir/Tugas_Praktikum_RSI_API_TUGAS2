import type { Request, Response } from 'express';
import { FlagService } from '../services/flagService.ts';

export class FlagController {
  constructor(private service: FlagService = new FlagService()) {}

  getAll = async (_req: Request, res: Response): Promise<Response> => this.respond(res, () => this.service.getFlags());
  updateStatus = async (req: Request, res: Response): Promise<Response> => this.respond(res, () => this.service.updateStatus(Number(req.params.id), req.body.status));

  private async respond(res: Response, action: () => Promise<unknown>): Promise<Response> {
    try {
      return res.status(200).json({ status: 'success', data: await action() });
    } catch (error) {
      if (error instanceof Error && error.message === 'FLAG_NOT_FOUND') {
        return res.status(404).json({ status: 'fail', message: 'Laporan tidak ditemukan' });
      }
      if (error instanceof Error && error.message === 'INVALID_FLAG_STATUS') {
        return res.status(400).json({ status: 'fail', message: 'Status harus pending, resolved, atau dismissed' });
      }
      return res.status(500).json({ status: 'error', message: 'Terjadi kesalahan pada server', error: error instanceof Error ? error.message : String(error) });
    }
  }
}