import type { Request, Response } from 'express';
import { AuditService } from '../services/auditService.ts';

export class AuditController {
  constructor(private service: AuditService = new AuditService()) {}

  getAll = async (_req: Request, res: Response): Promise<Response> => this.respond(res, () => this.service.getAuditLogs());
  create = async (req: Request, res: Response): Promise<Response> => this.respond(res, () => this.service.createAuditLog(req.body), 201);

  private async respond(res: Response, action: () => Promise<unknown>, status = 200): Promise<Response> {
    try {
      return res.status(status).json({ status: 'success', data: await action() });
    } catch (error) {
      return res.status(500).json({ status: 'error', message: 'Terjadi kesalahan pada server', error: error instanceof Error ? error.message : String(error) });
    }
  }
}