import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { generateOTP } from "../utils/otpHelper/generateOtp.js";
import { sendEmailOtp } from "../utils/otpHelper/sendEmailOtp.js";
import { sendSmsOtp } from "../utils/otpHelper/sendSmsOtp.js";
const generateAccessAndRefereshTokens = async (userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return { accessToken, refreshToken }


    } catch (error) {
        return new ApiError(500, "Something went wrong while generating referesh and access token")
    }
}

const registerUser = asyncHandler(async(req, res) =>{
    console.log(req.body);
    console.log("Hi")
    const{email, name, password, phoneNumber, address  } = req.body;
    const emailOtp = generateOTP();
    // const phoneNumberOtp = generateOTP();

    await sendEmailOtp(email, emailOtp);

    if([email,name, password, phoneNumber].some((field) => field?.trim() === "")){
        return res
        .status(400)
        .json( new ApiError(400,"All fields are required !!"))
    }

    const existedUser = await User.findOne({
        $or: [{ phoneNumber }, { email }]
    })

    if(existedUser){
        return res
        .status(400)
        .json( new ApiError(400,"User with this Phone Number or Email already exist !!"))
    }

    const user = await User.create({
        email,
        name,
        password,
        phoneNumber,
        address,
        emailOtp,
        emailVerified: false,
        phoneVerified: false
    })
    const createdUser = await User.findById(user?._id).select(
        "-password -refreshToken"
    )
    const {accessToken, refreshToken} = await generateAccessAndRefereshTokens(user._id);
    if (!accessToken || !refreshToken) {
        return res.status(500).json(new ApiError(500, "Failed to generate tokens"));
    }

    if (!createdUser) {
        return res
        .status(500)
        .json( new ApiError(500, "Something went wrong while registering the user"));
    }

    return res.status(201).json(
        new ApiResponse(
            200,
            {
                user:createdUser,accessToken,refreshToken
            }, 
            "User registered Successfully")
    )

})

const verifyPhoneOtp = asyncHandler(async(req, res)=>{
    const { userId, otp } = req.body;

    if(!userId || !otp){
        return res
        .status(400)
        .json( new ApiError(400, "UserId or OTP is missing !!"));
    }

    const user = await User.findById(userId);

    if(!user){
        return res
        .status(404)
        .json( new ApiError(404, "User not found !!"))
    }

    if(user?.phoneNumberOtp === otp){
        user.phoneNumber = true;
        user.phoneNumberOtp = undefined;

        await user.save();

        return res
        .status(200)
        .json( new ApiResponse(200, "Phone number verified successfully !"));
    }
    else{
        return res
        .status(500)
        .json( new ApiError(500, "Invalid OTP !"));
    }
})

const verifyEmailOtp = asyncHandler(async(req,res)=>{
    const {userId,otp} = req.body;

    if(!userId || !otp){
        return res
        .status(400)
        .json(new ApiError(400,"UserId or OTP is missing !!"));
    }

    const user = await User.findById(userId);

    if(!user){
        return res
        .status(404)
        .json(new ApiError(404, "User Not found !"))
    }

    if(user.emailOtp == otp){
        user.emailVerified = true;
        user.emailOtp = undefined;

        await user.save();

        return res
        .status(200)
        .json(new ApiResponse(200, "Email verified Successfully !"));
    }
    else{
        return res
        .status(500)
        .json(new ApiError(500,"Invalid Otp !"))
    }
});

const loginUser = asyncHandler(async(req,res)=>{
    const {userCredential, password } = req.body

    if(!userCredential){
        return res
        .status(400)
        .json(new ApiError(400,"Phone number or username is required !"))
    }

    if(!password){
        return res
        .status(400)
        .json(new ApiError(400,"Password is required !"))
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    let searchCriteria = {};

    if (emailRegex.test(userCredential)) {
        searchCriteria.email = userCredential;
    } else {
        searchCriteria.phoneNumber = userCredential;
    }

    // console.log(searchCriteria.phoneNumber)
    // console.log(searchCriteria.email)
    const user = await User.findOne(searchCriteria);
    if (!user) {
        return res
        .status(404)
        .json( new ApiError(404, "User does not exist"));
    }

    const isPasswordValid = await user.isPasswordCorrect(password)
    if (!isPasswordValid) {
        return res
            .status(401)
            .json( new ApiError(401, "Invalid user credentials"))
    }

    const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(user._id)

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    user: loggedInUser, accessToken, refreshToken
                },
                "User logged In Successfully"
            )
        )

});

const logout = asyncHandler(async(req,res)=>{
    await User.findByIdAndUpdate(
        req.user.id,
        {
            $unset: {
                refreshToken:1
            }
        },
        {
            new:true
        }
    )

    const options ={
        httpOnly:true,
        secure:true
    }

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "User logged Out"))
});

const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

    if (!incomingRefreshToken) {
        return res
        .status(401)
        .json( new ApiError(401, "unauthorized request"));
    }

    try {
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )

        const user = await User.findById(decodedToken?._id)

        if (!user) {
            return res
            .status(401)
            .json( new ApiError(401, "Invalid refresh token"));
        }

        if (incomingRefreshToken !== user?.refreshToken) {
            return res
            .status(401)
            .json( new ApiError(401, "Refresh token is expired or used"));
        }

        const options = {
            httpOnly: true,
            secure: true
        }

        const { accessToken, newRefreshToken } = await generateAccessAndRefereshTokens(user._id)

        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", newRefreshToken, options)
            .json(
                new ApiResponse(
                    200,
                    { accessToken, refreshToken: newRefreshToken },
                    "Access token refreshed"
                )
            )
    } catch (error) {
        return res
        .status(401)
        .json( new ApiError(401, error?.message || "Invalid refresh token"));
    }

});

const addUserWishlist = asyncHandler(async(req,res)=>{

    const {productId} = req.body;
    // console.log(productId);
    if(!productId){
        return res
        .status(400)
        .json(new ApiError(400,"Product Id is missing !"));
    }

    const userId = req.user?._id;
    if(!userId){
        return res
        .status(400)
        .json(new ApiError(400,"userId is missing !"));
    }

    const updatedUser = await User.findByIdAndUpdate(
        userId,
        {
            $addToSet: {wishlist : productId}
        },
        { new:true }
    ).lean();

    // const isProductInWishlist = updatedUser.wishlist?.includes(productId);
    // if (!isProductInWishlist) {
    //     return res
    //         .status(200)
    //         .json(new ApiResponse(200, "Product is already added to the Wishlist!"));
    // }
    // console.log("Updated User:", updatedUser);
    // console.log("Updated User Wishlist:", updatedUser?.wishlist);

    return res
    .status(201)
    .json(new ApiResponse(201,updatedUser.wishlist,"Product added to the Wishlist successfully!"));
});

export {
    generateAccessAndRefereshTokens,
    registerUser,
    verifyPhoneOtp,
    verifyEmailOtp,
    loginUser,
    logout,
    refreshAccessToken,
    addUserWishlist,
}