import Hotel from "../model/Hotel.js";

export const createHotel = async (rq, rs, next) => {
    const newHotel = new Hotel(rq.body);
    try {
        const savedHotel = await newHotel.save();
        rs.status(200).json(savedHotel)
    }catch (err) {
        next (err);
    }
};

export const updateHotel = async (rq, rs, next) => {
    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(
            rq.params.id,
            {$set: rq.body},
            {$new: true},
        )
        rs.status(200).json(updatedHotel);
    }catch (err) {
        next (err);
    }
};

export const deleteHotel = async (rq, rs, next) => {
    try {
        await Hotel.findByIdAndDelete(rq.params.id);
        rs.status(200).json("Hotel has been updated");
    }catch (err) {
        next (err);
    }
};

export const getHotel = async (rq, rs, next) => {
    try {
        const hotel = await Hotel.findById(rq.params.id);
        rs.status(200).json(hotel);
    }catch (err) {
        next (err);
    }
};

export const getHotels = async (rq, rs, next) => {
    const {...otherDetails} = rq.query;
    try {
        const hotels = await Hotel.find({
            ...otherDetails
        }).limit();
        rs.status(200).json(hotels);
    }catch (err) {
        next (err);
    }
};

export const countByCity = async (rq, rs, next) => {
    const cities = rq.query.cities?.split(",");
    try {
        const list = await Promise.all(
            cities.map((city) => {
                return Hotel.countDocuments({city: city});
            })
        );
        rs.status(200).json(list);
    }catch (err) {
        next(err);
    };
};

export const countByType = async (rq, rs, next) => {
    try {
        const hotelsCount = await Hotel.countDocuments({type: "hotels"});
        const apartmentsCount = await Hotel.countDocuments({type: "apartments"});
        const resortsCount = await Hotel.countDocuments({type: "resorts"});
        const villasCount = await Hotel.countDocuments({type: "villas"});
        const cottagesCount = await Hotel.countDocuments({type: "cottages"});
        const vacationHomesCount = await Hotel.countDocuments({type: "vacation homes"});
        const guestHousesCount = await Hotel.countDocuments({type: "guest houses"});
        const motelsCount = await Hotel.countDocuments({type: "motels"}); 

        rs.status(200).json([
            {type: "hotels", count: hotelsCount},
            {type: "apartments", count: apartmentsCount},
            {type: "resorts", count: resortsCount},
            {type: "villas", count: villasCount},
            {type: "cottages", count: cottagesCount},
            {type: "vacation homes", count: vacationHomesCount},
            {type: "guest houses", count: guestHousesCount},
            {type: "motels", count: motelsCount},
        ]);
    }catch (err) {
        next(err);
    }
}