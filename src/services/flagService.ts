import { FlagRepository } from '../repositories/flagRepository.ts';

export type FlagStatus = 'pending' | 'resolved' | 'dismissed';

export class FlagService {
  constructor(private flagRepository: FlagRepository = new FlagRepository()) {}

  getFlags() {
    return this.flagRepository.findAll();
  }

  async updateStatus(id: number, status: FlagStatus) {
    if (!['pending', 'resolved', 'dismissed'].includes(status)) throw new Error('INVALID_FLAG_STATUS');
    const flag = await this.flagRepository.updateStatus(id, status);
    if (!flag) throw new Error('FLAG_NOT_FOUND');
    return flag;
  }
}