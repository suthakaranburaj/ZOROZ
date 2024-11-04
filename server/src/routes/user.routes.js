import {Router} from "express";

import {
    registerUser,
    verifyPhoneOtp,
    verifyEmailOtp,
    loginUser,
    refreshAccessToken,
    logout,
    addUserWishlist,
} from '../controllers/user.controller.js'

import { verifyJWT } from '../middlewares/auth.middleware.js'

const router = Router();

router.route("/register").post(registerUser)
router.route("/verify-phone-number").post(verifyJWT,verifyPhoneOtp)
router.route("/verify-email").post(verifyJWT,verifyEmailOtp)
router.route("/login").post(loginUser)
router.route("/refresh-token").post(refreshAccessToken)
router.route("/logout").post(verifyJWT,logout)
router.route("/product-to-user-wishlist").post(verifyJWT,addUserWishlist)

export default router