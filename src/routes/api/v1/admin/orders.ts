import { Router } from 'express';
import * as OrderController from '@/controllers/order';
import { checkOrder } from '@/middlewares';

const router = Router();

router.get(
    /**
     * #swagger.description  = "取得所有訂單列表。
     * start: 2024-07-20，end: 2024-07-31，user: 用戶名、電話或電子郵件的關鍵字進行模糊搜尋。"
     * #swagger.responses[200] = {
            schema: {
                "status": true,
                "result": [
                    { $ref: '#/definitions/OrderResponses' },
                ]
            }
        }
     */
    '/',
    OrderController.getAllOrderList
);

router.put(
    /**
     * #swagger.description  = "修改訂單"
     * #swagger.parameters['body'] = {
            in: 'body',
            required: true,
            schema: { $ref: '#/definitions/OrderBody' },
        }
     * #swagger.responses[200] = {
            schema: {
                "status": true,
                "result": { $ref: '#/definitions/OrderResponses' },
            }
        }
     * #swagger.responses[400] = {
            schema: {
                "status": false,
                "message": "checkInDate 格式錯誤",
            }
        }
     * #swagger.responses[404] = {
            schema: {
                "status": false,
                "message": "此訂單不存在",
            }
        }
     */
    '/:id',
    checkOrder,
    OrderController.updateOrderById
);

router.delete(
    /**
     * #swagger.description  = "刪除訂單"
     * #swagger.responses[200] = {
            schema: {
                "status": true,
                "result": "已刪除訂單",
            }
        }
     * #swagger.responses[404] = {
            schema: {
                "status": false,
                "message": "此訂單不存在",
            }
        }
     */
    '/:id',
    OrderController.deleteOrderByAdmin
);

router.patch(
    /**
     * #swagger.description  = "訂單 Checkin / Checkout。api 路由為 /checkin/:id 或是 /checkout/:id"
     * #swagger.responses[200] = {
            schema: {
                "status": true,
                "result": "Checkin 成功",
            }
        }
     * #swagger.responses[404] = {
            schema: {
                "status": false,
                "message": "此訂單不存在",
            }
        }
     */
    '/:action/:id',
    OrderController.updateOrderCheckInAndOut
);

export default router;
