//serrver.js
import express from "express";
//для автоматической загрузки переменных окружения из файла .env в системные переменные
import "dotenv/config";
// middleware cors которое позволяет вашему фронтенду делать запросы к этому серверу, даже если они находятся на разных доменах
import cors from "cors";
import connectDB from "./configs/db.js";
import userRouter from "./routes/userRoutes.js";
import ownerRouter from "./routes/ownerRoutes.js";
import bookingRouter from "./routes/bookingRoutes.js";



// INITIALIZE Express App
// Инициализирует приложение Express теперь переменная app представляет ваш сервер и вы можете использовать её для настройки маршрутов и middleware
const app = express();
// Connected Data base
await connectDB();

// MIDDLEWARE
// Подключает middleware cors. Это добавляет в заголовки ответов сервера информацию, которая разрешает запросы с других доменов
app.use(cors());
// Подключает встроенное middleware Express, oно позволяет серверу парсить JSON-данные, которые приходят в теле запроса (например, когда вы отправляете данные из формы). Без этого, сервер не сможет понять и обработать JSON-данные.
app.use(express.json());

// Маршруты и запуск сервера
// '/' указывает, что маршрут будет отвечать на запросы к корневому URL (например, localhost:5000/)
app.get('/', (req, res) => res.send("Server is running!"));
app.use('/api/user', userRouter);
app.use('/api/owner', ownerRouter);
app.use('/api/bookings', bookingRouter);


// Определяет порт, на котором будет работать сервер. Он пытается использовать порт из переменных окружения (.env), если он задан. Если нет, он использует порт 3000 по умолчанию.
const PORT = process.env.PORT || 3000;
// Запускает сервер. Он "слушает" (listen) входящие запросы на указанном порту. Когда сервер успешно запускается, в консоль выводится сообщение.
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));