import {Router} from 'express'
import {
    initiatePayment,
    getPaymentDetails,
    confirmPayment,
} from '../controllers/payment.controller.js'

import { verifyJWT } from '../middlewares/auth.middleware.js'

const router = Router();

router.route('/initiate').post(verifyJWT,initiatePayment)
router.route('/confirm/:paymentId').post(verifyJWT,confirmPayment)
router.route('/:paymentId').get(verifyJWT,getPaymentDetails)

export default router
