import { Request, Response } from "express";
import { Event } from "../entity/Event";

interface EventBody {
  name: string;
  description: string;
  place: string;
  dateHour: string;
  gps: string;
  price: number;
  limit: number;
  typeEvent: string;
}

export const getEvents = async (req: Request, res: Response) => {
  console.log('entrando...');
  try {
    const events = await Event.find();
    console.log('events: --->'), events;
    return res.json(events);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};
export const getEvent = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const event = await Event.findOneBy({ id: parseInt(id) });
  
      if (!event) return res.status(404).json({ message: "Event not found" });
  
      return res.json(event);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      }
    }
  };
export const createEvent = async (req: Request, res: Response) => {
    const {  name, description, place, dateHour, gps, price, limit, typeEvent } = req.body;
    const event = new Event();
    event.name = name;
    event.description = description;
    event.place = place;
    event.dateHour = dateHour;
    event.gps = gps;
    event.price = price;
    event.limit = limit;
    event.typeEvent = typeEvent;
    await event.save();
    return res.json(event);
  };
export const updateEvent = async (req: Request, res: Response) => {
    const { id } = req.params;
  
    try {
      const event = await Event.findOneBy({ id: parseInt(id) });
      if (!event) return res.status(404).json({ message: "Not event found" });
  
      await Event.update({ id: parseInt(id) }, req.body);
  
      return res.sendStatus(204);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      }
    }
  };
  export const deleteEvent = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const result = await Event.delete({ id: parseInt(id) });
  
      if (result.affected === 0)
        return res.status(404).json({ message: "Event not found" });
  
      return res.sendStatus(204);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      }
    }
  };