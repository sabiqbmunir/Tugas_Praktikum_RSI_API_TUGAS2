import { Router } from 'express';
import { LikeController } from '../controllers/likeController.ts';

const likeRouter = Router();
const controller = new LikeController();

likeRouter.post('/', (req, res) => controller.create(req, res));
likeRouter.delete('/:reviewId/:userId', (req, res) => controller.remove(req, res));

export { likeRouter };