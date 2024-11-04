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
router.route('/order/:orderId').get(verifyJWT,getOrderDetails)
router.route('/order/history').get(verifyJWT,getOrderHistory)
router.route('/order/:orderId/status').put(verifyJWT,updateOrderStatus)


export default router
