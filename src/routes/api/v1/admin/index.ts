import { Router } from 'express';
import { isAdmin } from '@/middlewares';
import culinaryRouter from './culinary';
import newsRouter from './news';
import ordersRouter from './orders';
import roomsRouter from './rooms';
import * as UserController from '@/controllers/user';

const router = Router();

router.post(
    /**
     * #swagger.tags = ['Admin/Login' - 管理員登入]
     * #swagger.description  = "管理員登入"
     * #swagger.parameters['body'] = {
            in: 'body',
            required: true,
            schema: {
                email: "timmothy.ramos@example.com",
                password: "Dirt5528295",
            }
        }
     * #swagger.responses[200] = {
            description: '登入成功',
            schema: {
                "status": true,
                "token": "eyJhbGciOiJI....",
                "result": {
                    "name": "Admin",
                    "email": "admin@gmail.com",
                    "verificationToken": "",
                    "_id": "66aa49a6b8be7260049b9e58",
                    "createdAt": "2024-07-31T14:26:46.452Z",
                    "updatedAt": "2024-07-31T14:26:46.452Z"
                }
            }
        }
     * #swagger.responses[400] = {
            description: '登入失敗',
            schema: {
                "status": false,
                "message": "密碼錯誤",
            }
        }
     * #swagger.responses[404] = {
            schema: {
                "status": false,
                "message": "此使用者不存在",
            }
        }
     */
    '/login',
    UserController.login
);

router.use(isAdmin);

router.use(
    /**
     * #swagger.tags = ['Admin/News - 最新消息管理']
     */
    '/news',
    newsRouter
);

router.use(
    /**
     * #swagger.tags = ['Admin/Culinary - 美味佳餚管理']
     */
    '/culinary',
    culinaryRouter
);

router.use(
    /**
     * #swagger.tags = ['Admin/Rooms - 房型管理']
     */
    '/rooms',
    roomsRouter
);

router.use(
    /**
     * #swagger.tags = ['Admin/Orders - 訂單管理']
     */
    '/orders',
    ordersRouter
);

export default router;
