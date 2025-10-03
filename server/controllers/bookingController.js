import Booking from "../models/Booking.js"
import Car from "../models/Car.js"

// Function to Check Availability of Car for a given Date
const checkAvailability = async (car, pickupDate, returnDate) => {
    const booking = await Booking.find({
        car,
        pickupDate: {$lte: returnDate},
        returnDate: {$gte: pickupDate}
    })

    return booking.length === 0
}

// API to Chack Availability of Cars for the given Date and location
export const chackAvailabilityOfCar = async (req, res) => {
    try {
        const { location, pickupDate, returnDate } = req.body;

        //Находим все машины в нашей локации
        const cars = await Car.find({
            // location,
            location: { $regex: new RegExp(`^${location}$`, 'i') },
            isAvaliable: true
        })

        // Проверяем доступность каждой машины 
        const availableCarsPromises = cars.map(async (car) => {
            const isAvaliable = await checkAvailability(car._id, pickupDate, returnDate);

            return { ...car._doc, isAvaliable: isAvaliable }
        }) 

        //Дожидаемсся всех проверок
        let availableCars = await Promise.all(availableCarsPromises);
        // фильтруем и оставляем только доступные (isAvaliable === true)
        availableCars = availableCars.filter((car) => car.isAvaliable === true)

        res.json({ success: true, availableCars })

    } catch (error) {
        console.log(error.mesage)
        res.json({ success: false, message: error.message })
    }
}

// API to Create Booking
export const createBooking = async (req, res) => {
    try {
        const { _id } = req.user;
        const { car, pickupDate, returnDate } = req.body;

        //финальная проверка доступности isAvaliable
        const isAvaliable = await checkAvailability(car, pickupDate, returnDate);

        if (!isAvaliable) {
            return res.json({ success: false, message: "Car is not available"})
        }

        //получаем данные машин для расчета цен
        const carData = await Car.findById(car);

        //считаем цену 
        const picked = new Date(pickupDate);
        const returned = new Date();
        const noOfDays = Math.ceil((returned - picked) / (1000 * 60 * 60 * 24));
        const price = carData.pricePerDay * noOfDays;

        // СОЗДАЕМ запись в базе данных
        await Booking.create({
            car, 
            owner: carData.owner, 
            user: _id, 
            pickupDate, 
            returnDate, 
            price
        })

        res.json({ success: true, message: "Booking Created"})

    } catch (error) {
        console.log(error.mesage)
        res.json({ success: false, message: error.message })
    }
} 

// API to List User Bookings
export const getUserBookings = async (req, res) => {
    try {
        const { _id } = req.user;

        const bookings = await Booking.find({ user: _id }).populate("car").sort({ createdAt: -1 });

        res.json({ success: true, bookings })

    } catch (error) {
        console.log(error.mesage)
        res.json({ success: false, message: error.message })
    }
}

// API to get Owner Bookings 
export const getOwnerBookings = async (req, res) => {
    try {
        if (req.user.role !== 'owner') {
            return res.json({ success: false, message: "Unauthorized"})
        }

        const bookings = await Booking.find({owner: req.user._id}).populate("car user").select("-user.password").sort({createdAt: -1})

        res.json({ success: true, bookings: bookings}) //message: bookings

    } catch (error) {
        console.log(error.mesage)
        res.json({ success: false, message: error.message })
    }
}

// API to change booking status
export const changeBookingStatus = async (req, res) => {
    try {
        const { _id } = req.user;
        const { bookingId, status } = req.body;

        const booking = await Booking.findById(bookingId)

        if (booking.owner.toString() !== _id.toString()) {
            return res.json({ success: false, message: "Unauthorized" })
        }

        booking.status = status;

        await booking.save();

        res.json({ success: true, message: "Status Updated" })

    } catch (error) {
        console.log(error.mesage)
        res.json({ success: false, message: error.message })
    }
}
