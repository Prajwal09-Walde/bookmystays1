import express from "express";
import { createRoom, getRoom, getRooms, updateRoom, updateRoomAvailability } from "../controller/room.js";

const router = express.Router();

//CREATE ROOM
router.post("/hotelid", createRoom);

//UPDATE ROOM
router.put("/availability/:id", updateRoomAvailability);
router.put("/:id", updateRoom);

//DELETE ROOM
router.delete("/:id/hotelid");

//GET ROOM
router.get("find/:id", getRoom);

//GET ROOMS
router.get("/", getRooms);

export default router;