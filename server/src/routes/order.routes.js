import {Router} from 'express'
import {
    placeOrder,
    getOrderDetails,
    getOrderHistory,
    updateOrderStatus,
} from '../controllers/order.controller.js'

import { verifyJWT } from '../middlewares/auth.middleware.js'

const router = Router();

router.route('/place').post(verifyJWT,placeOrder)
router.route('/:orderId').get(verifyJWT,getOrderDetails)
router.route('/:userId/history').get(verifyJWT,getOrderHistory)
router.route('/:orderId/status').patch(verifyJWT,updateOrderStatus)


export default router
