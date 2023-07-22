import { Booking } from './../entity/Booking';
import { Request, Response } from "express";
import { Event } from './../entity/Event';
import { getManager } from 'typeorm';

interface BookingBody {
    eventId: Event;
    place: string;
    dateHour: Date;
    gps: string;
    price: number;
}

export const getBookings = async (req: Request, res: Response) => {
    console.log('entrando...');
    try {
        const bookings = await Booking.find();
        console.log('bookings: --->'), bookings;
        return res.json(bookings);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
};
export const getBooking = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const booking = await Booking.findOneBy({ id: parseInt(id) });

        if (!booking) return res.status(404).json({ message: "Booking not found" });

        return res.json(booking);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
};
export const createBooking = async (req: Request, res: Response) => {
    const { place, dateHour, gps, price, eventId } = req.body;
    const booking = new Booking();
    booking.place = place;
    booking.dateHour = dateHour;
    booking.gps = gps;
    booking.price = price;
    booking.event = eventId;
    await booking.save();
    return res.json(booking);
};
export const checkLimit = async (req: Request, res: Response) => {
    const { place, dateHour, gps, price, eventId } = req.body;
    const entityManager = getManager();
    const event = await entityManager.findOne(Event, eventId);

    if (!event) {
        return res.status(404).json({ message: 'event not found' });
    }
    if (event.limit !== 0) {
        const bookingsCount = await entityManager
            .createQueryBuilder(Booking, 'booking')
            .where('booking.eventId = :eventId', { eventId: event.id })
            .getCount();

        if (bookingsCount >= event.limit) {
            return res.status(400).json({ message: 'event has reached its booking limit' });
        }
        const booking = new Booking();
        booking.place = place;
        booking.dateHour = dateHour;
        booking.gps = gps;
        booking.price = price;
        booking.event = event;
        // Set other booking properties

        await entityManager.save(booking);

        return res.status(201).json({ message: 'Booking created successfully' });
    }
}
export const updateBooking = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const booking = await Booking.findOneBy({ id: parseInt(id) });
        if (!booking) return res.status(404).json({ message: "Not event found" });

        await Booking.update({ id: parseInt(id) }, req.body);

        return res.sendStatus(204);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
};
export const deleteBooking = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const result = await Booking.delete({ id: parseInt(id) });

        if (result.affected === 0)
            return res.status(404).json({ message: "Booking not found" });

        return res.sendStatus(204);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
};