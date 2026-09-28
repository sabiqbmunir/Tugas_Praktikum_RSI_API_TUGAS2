import { LikeRepository, type LikeInput } from '../repositories/likeRepository.ts';

export class LikeService {
  constructor(private likeRepository: LikeRepository = new LikeRepository()) {}

  createLike(input: LikeInput) {
    return this.likeRepository.create(input);
  }

  async deleteLike(reviewId: number, userId: number) {
    const like = await this.likeRepository.remove(reviewId, userId);
    if (!like) throw new Error('LIKE_NOT_FOUND');
    return like;
  }
}