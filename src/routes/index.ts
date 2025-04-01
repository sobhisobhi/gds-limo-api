import { Router } from 'express';
import { getMissionsList, createNewMission } from '../controllers/mission';

const router = Router();

router.post('/missions', getMissionsList);
router.post('/mission', createNewMission);

export default router;