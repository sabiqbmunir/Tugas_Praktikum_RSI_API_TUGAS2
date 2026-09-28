import { ReviewRepository, type CreateReviewInput } from '../repositories/reviewRepository.ts';

export class ReviewService {
  constructor(private reviewRepository: ReviewRepository = new ReviewRepository()) {}

  getReviews() {
    return this.reviewRepository.findAllWithUser();
  }

  async createReview(input: CreateReviewInput) {
    if (!Number.isInteger(input.rating) || input.rating < 1 || input.rating > 5) {
      throw new Error('INVALID_REVIEW_RATING');
    }
    return this.reviewRepository.create(input);
  }

  async deleteReview(id: number) {
    const review = await this.reviewRepository.remove(id);
    if (!review) throw new Error('REVIEW_NOT_FOUND');
    return review;
  }
}