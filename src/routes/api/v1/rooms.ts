import { Router } from 'express';
import * as RoomController from '@/controllers/room';

const router = Router();

router.get(
    /**
     * #swagger.description  = "取得房型列表"
     * #swagger.responses[200] = {
            schema: {
                "status": true,
                "result": [
                    { $ref: '#/definitions/RoomSimpleResponses' }
                ]
            }
        }
     */
    '/',
    RoomController.getRoomList
);

router.get(
    /**
     * #swagger.description  = "取得房型詳細資料。注意: result 的 facilityInfo 會全部列出，swagger只會列出一筆。"
     * #swagger.responses[200] = {
            schema: {
                "status": true,
                "bookedDays": { $ref: '#/definitions/RoomBookedDays' },
                "result": { $ref: '#/definitions/RoomDetailResponses' }
            }
        }
     * #swagger.responses[404] = {
            schema: {
                "status": false,
                "message": "此房型不存在",
            }
        }
     */
    '/:id',
    RoomController.getRoomById
);

export default router;
