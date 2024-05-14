const mongoose= require('mongoose')

const PromotionMailSchema = new mongoose.Schema ({
    email: String,
    status: {
        type: String,
        enum: ['Subscribed', 'Unsubscribed'],
        default: 'Subscribed'
      },
    });
const PromotionMailModel = mongoose.model("promotionMails", PromotionMailSchema)
module.exports = PromotionMailModel 