import mongoose from "mongoose";


const {ObjectId} = mongoose.Schema.Types;

const carSchema = new mongoose.Schema({
    owner: { type: ObjectId, ref: 'User' },//говорит Mongoose, что здесь будет храниться _id другого документа.
    //ref: 'User' создаёт ссылку, которая позволяет вам легко получать данные владельца, 
    //когда вы работаете с автомобилем.
    brand: { type: String, required: true },
    model: { type: String, required: true },
    image: { type: String, required: true },
    year: { type: Number, required: true },//
    category: { type: String, required: true },
    seating_capacity: { type: Number, required: true },//
    fuel_type: { type: String, required: true },
    transmission: { type: String, required: true },
    pricePerDay: { type: Number, required: true },//
    location: { type: String, required: true },
    description: { type: String, required: true },
    isAvaliable: { type: Boolean, default: true },

}, { timestamps: true });////Эта опция добавляет два полезных поля к каждому документу: 
//createdAt-дата и время создания документа. 
//updatedAt-дата и время последнего обновления документа.

const Car = mongoose.model('Car', carSchema);


export default Car;