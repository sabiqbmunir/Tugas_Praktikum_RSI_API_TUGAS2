import { AuditRepository, type CreateAuditInput } from '../repositories/auditRepository.ts';

export interface AuditRequestInput extends Omit<CreateAuditInput, 'metadata'> {
  metadata?: string | Record<string, unknown> | null;
}

export class AuditService {
  constructor(private auditRepository: AuditRepository = new AuditRepository()) {}

  getAuditLogs() {
    return this.auditRepository.findAll();
  }

  createAuditLog(input: AuditRequestInput) {
    return this.auditRepository.create({
      userId: input.userId,
      action: input.action,
      targetTable: input.targetTable,
      targetId: input.targetId,
      metadata: input.metadata == null
        ? null
        : typeof input.metadata === 'string' ? input.metadata : JSON.stringify(input.metadata),
    });
  }
}