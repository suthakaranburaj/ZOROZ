import {Router} from 'express'
import {
    initiatePayment,
    getPaymentDetails,
    confirmPayment,
} from '../controllers/payment.controller.js'

import { verifyJWT } from '../middlewares/auth.middleware.js'

const router = Router();

router.route('/initiate').post(verifyJWT,initiatePayment)
router.route('/confirm').post(verifyJWT,getPaymentDetails)
router.route('/:orderId').get(verifyJWT,confirmPayment)

export default router
