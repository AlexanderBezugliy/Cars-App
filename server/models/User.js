import mongoose from "mongoose";


// userSchema это схема данных, которая определяет структуру и правила для документов в вашей коллекции. 
// Она похожа на план или чертеж, который говорит Mongoose, как должны выглядеть ваши данные.
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, //unique: true (я убрал, потому что пользователи могут вводить одинаковые пароли)
    role: { type: String, enum: ["owner", "user"], default: 'user'},
    image: { type: String, default: '' },

}, { timestamps: true });//Эта опция добавляет два полезных поля к каждому документу: 
//createdAt-дата и время создания документа. 
//updatedAt-дата и время последнего обновления документа.

const User = mongoose.model('User', userSchema);



export default User;