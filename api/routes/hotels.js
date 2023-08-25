import express from "express";
import { countByCity, countByType, createHotel, deleteHotel, getHotel, getHotels, updateHotel } from "../controller/hotel.js";

const router = express.Router();

/*CREATE HOTEL*/
router.post("/", createHotel);

/*UPDATE HOTEL*/
router.put("/:id", updateHotel);

/*DELETE HOTEL*/
router.delete("/:id", deleteHotel);

/*GET HOTEL*/
router.get("/find/:id", getHotel);

/*GET HOTELS*/
router.get("/", getHotels);
router.get("/countByCity", countByCity);
router.get("/countByType", countByType);

export default router;