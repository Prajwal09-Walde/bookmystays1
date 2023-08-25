import Hotel from "../model/Hotel.js";
import Room from "../model/Room.js";

export const createRoom = async (rq, rs, next) => {
    const hotelId = rq.params.hotelid;
    const newRoom = new Room(rq.body);
    try {
        const savedRoom = await newRoom.save();
        try {
            await Hotel.findByIdAndUpdate(hotelId, {
                $push: {rooms: savedRoom._id},
            });
        }catch (err) {
            next (err);
        };
        rs.status(200).json(savedRoom)
    }catch (err) {
        next (err);
    }
};

export const updateRoom = async (rq, rs, next) => {
    try {
        const updatedRoom = await Room.findByIdAndUpdate(
            rq.params.id,
            {$set: rq.body},
            {$new: true},
        )
        rs.status(200).json(updatedRoom);
    }catch (err) {
        next (err);
    }
};

export const updateRoomAvailability = async (rq, rs, next) => {
    try {
        await Room.updateOne(
            {"roomNumbers": rq.params.id},
            {
                $push: {
                    "roomNumbers.$.unavailableDates": rq.body.dates
                },
            }
        );
        rs.status(200).json("Room status has been updated :)");
    }catch (err) {
        next (err);
    }
};

export const deleteRoom = async (rq, rs, next) => {
    const hotelId = rq.params.hotelid;
    try {
        await Room.findByIdAndDelete(rq.params.id);
        try {
            await Hotel.findByIdAndUpdate(hotelId, {
                $pull: {rooms: rq.params.id},
            })
        }catch (err) {
            next (err);
        }
        rs.status(200).json("Room has been updated.");
    }catch (err) {
        next(err);
    }
};

export const getRoom = async (rq, rs, next) => {
    try {
        const room = await Room.findById(rq.params.id);
        rs.status(200).json(room);
    }catch (err) {
        next (err);
    }
};

export const getRooms = async (rq, rs, next) => {
    try {
        const rooms = await Room.find();
        rs.status(200).json(rooms);
    }catch (err) {
        next (err);
    }
};