import jwt from "jsonwebtoken";
import User from "../models/User.js";


// PROTECT MIDLLEWARE
export const protect = async (req, res, next) => {
    // получение ТОКЕНА
    const token = req.headers.authorization;

    // проверка наличия ТОКЕНА
    if (!token) {
        return res.json({ success: false, message: "not authorized..." })
    }

    // расскодировка и проверка ТОКЕНА
    try {
        const userId = jwt.decode(token, process.env.JWT_SECRET);

        if(!userId) {
            return res.json({ success: false, message: "not authorized..."});
        }

        req.user = await User.findById(userId).select("-password"); //исключает поле password из результата, чтобы вы никогда случайно не отправили хешированный пароль на клиент.
        

        next();
    } catch (error) {
        return res.json({ success: false, message: "not authorized..." })
    }
}

