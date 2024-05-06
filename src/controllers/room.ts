import type { RequestHandler } from 'express';
import createHttpError from 'http-errors';
import RoomModel from '@/models/room';
import OrderModel from '@/models/order'

export const getRoomList: RequestHandler = async (_req, res, next) => {
    try {
        const result = await RoomModel.find({ status: 1 })
            .select('_id name imageUrlList')
            .then(rooms => {
                return rooms.map(room => {
                    return {
                        _id: room._id,
                        name: room.name,
                        imageUrl: room.imageUrlList.length > 0 ? room.imageUrlList[0] : ''
                    };
                });
            });
        res.send({
            status: true,
            result
        });
    } catch (error) {
        next(error);
    }
};

export const getRoomById: RequestHandler = async (req, res, next) => {
    try {
        const result = await RoomModel.findOne({
            _id: req.params.id,
            status: 1
        });
        if (!result) {
            throw createHttpError(404, '此房型不存在');
        }

        // 查詢與該房間相關的所有訂單
        const orders = await OrderModel.find({ roomId: req.params.id });

        // 獲取所有訂單中的預訂日期
        const bookedDays: string[] = orders.reduce<string[]>((acc, order) => {
            acc.push(...order.days);
            return acc;
        }, []);

        // 篩選出從今天開始的 90 天內的預訂日期
        const today = new Date();
        today.setHours(0, 0, 0, 0); // 將時間設置為午夜

        const futureDates = bookedDays.filter(date => {
            const bookingDate = new Date(date);
            return bookingDate >= today && bookingDate <= new Date(today.getTime() + 90 * 24 * 60 * 60 * 1000);
        });

        // 移除重複的日期
        const uniqueBookedDays = [...new Set(futureDates)];

        res.send({
            status: true,
            result,
            bookedDays: uniqueBookedDays
        });
    } catch (error) {
        next(error);
    }
};

export const createOneRoom: RequestHandler = async (req, res, next) => {
    try {
        const {
            name,
            description,
            imageUrl,
            imageUrlList,
            areaInfo,
            bedInfo,
            maxPeople,
            price,
            layoutInfo,
            facilityInfo,
            amenityInfo
        } = req.body;

        const result = await RoomModel.create({
            name,
            description,
            imageUrl,
            imageUrlList,
            areaInfo,
            bedInfo,
            maxPeople,
            price,
            layoutInfo,
            facilityInfo,
            amenityInfo
        });

        res.send({
            status: true,
            result
        });
    } catch (error) {
        next(error);
    }
};

export const updateRoomById: RequestHandler = async (req, res, next) => {
    try {
        const {
            name,
            description,
            imageUrl,
            imageUrlList,
            areaInfo,
            bedInfo,
            maxPeople,
            price,
            layoutInfo,
            facilityInfo,
            amenityInfo
        } = req.body;

        const result = await RoomModel.findByIdAndUpdate(
            req.params.id,
            {
                name,
                description,
                imageUrl,
                imageUrlList,
                areaInfo,
                bedInfo,
                maxPeople,
                price,
                layoutInfo,
                facilityInfo,
                amenityInfo
            },
            {
                new: true,
                runValidators: true
            }
        );
        if (!result) {
            throw createHttpError(404, '此房型不存在');
        }

        res.send({
            status: true,
            result
        });
    } catch (error) {
        next(error);
    }
};

export const deleteRoomById: RequestHandler = async (req, res, next) => {
    try {
        const result = await RoomModel.findByIdAndUpdate(
            req.params.id,
            {
                status: -1
            },
            {
                new: true,
                runValidators: true
            }
        );
        if (!result) {
            throw createHttpError(404, '此房型不存在');
        }

        res.send({
            status: true,
            result
        });
    } catch (error) {
        next(error);
    }
};
