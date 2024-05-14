const mongoose= require('mongoose')

const CouponsSchema = new mongoose.Schema ({
    couponCode: String,
    couponDiscount: String,
    activeDate: String,
    expiryDate: String
    });
const CouponModel = mongoose.model("coupons", CouponsSchema)
module.exports = CouponModel 