import {Router} from 'express'
import {
    addItemToCart,
    removeItemFromCart,
    viewCart,
    clearCart,
} from '../controllers/cart.controller.js'

import { verifyJWT } from '../middlewares/auth.middleware.js'

const router = Router();

router.route('/add').post(verifyJWT,addItemToCart)
router.route('/remove/:itemId').delete(verifyJWT,removeItemFromCart)
router.route('/view').get(verifyJWT,viewCart)
router.route('/clear').delete(verifyJWT,clearCart)

export default router
