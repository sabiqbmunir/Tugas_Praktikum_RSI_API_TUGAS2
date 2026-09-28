import { Router } from 'express';
import { ReviewController } from '../controllers/reviewController.ts';

const reviewRouter = Router();
const controller = new ReviewController();

reviewRouter.get('/', (req, res) => controller.getAll(req, res));
reviewRouter.post('/', (req, res) => controller.create(req, res));
reviewRouter.delete('/:id', (req, res) => controller.remove(req, res));

export { reviewRouter };