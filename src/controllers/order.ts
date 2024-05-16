import type { RequestHandler } from 'express';
import createHttpError from 'http-errors';
import OrderModel from '@/models/order';
import { getTransporter } from '@/controllers/verify';
import { orderMail } from '@/utils/mailContent';

export const getAllOrderList: RequestHandler = async (_req, res, next) => {
    try {
        const result = await OrderModel.find().populate({
            path: 'roomId'
        });

        res.send({
            status: true,
            result
        });
    } catch (error) {
        next(error);
    }
};

export const getUserOrderList: RequestHandler = async (req, res, next) => {
    try {
        const result = await OrderModel.find({
            orderUserId: req.user?._id
        }).populate({
            path: 'roomId'
        });

        res.send({
            status: true,
            result
        });
    } catch (error) {
        next(error);
    }
};

export const getOrderById: RequestHandler = async (req, res, next) => {
    try {
        const result = await OrderModel.findById(req.params.id).populate({
            path: 'roomId'
        });
        if (!result) {
            throw createHttpError(404, '此訂單不存在');
        }

        res.send({
            status: true,
            result
        });
    } catch (error) {
        next(error);
    }
};

export const createOneOrder: RequestHandler = async (req, res, next) => {
    try {
        const { roomId, peopleNum, userInfo, days } = req.body;
        const roomInfo = (req as any).roomInfo;

        const result = await OrderModel.create({
            roomId,
            peopleNum,
            userInfo,
            days
        });

        await result.populate({
            path: 'roomId'
        });

        res.send({
            status: true,
            result: '成功'
        });

        const mailContent = await orderMail(roomInfo, userInfo.name, days);
        const transporter = await getTransporter();
        await transporter.sendMail({
            from: process.env.EMAILER_USER,
            to: userInfo.email,
            subject: '[Test] The House Room Reservation Confirmation',
            html: mailContent
        });
    } catch (error) {
        next(error);
    }
};

export const updateOrderById: RequestHandler = async (req, res, next) => {
    try {
        const { roomId, checkInDate, checkOutDate, peopleNum, userInfo } = req.body;

        const result = await OrderModel.findOneAndUpdate(
            {
                _id: req.params.id
            },
            {
                roomId,
                checkInDate,
                checkOutDate,
                peopleNum,
                userInfo
            },
            {
                new: true,
                runValidators: true
            }
        ).populate({
            path: 'roomId'
        });
        if (!result) {
            throw createHttpError(404, '此訂單不存在');
        }

        res.send({
            status: true,
            result
        });
    } catch (error) {
        next(error);
    }
};

export const deleteOrderByUser: RequestHandler = async (req, res, next) => {
    try {
        const result = await OrderModel.findOneAndUpdate(
            {
                _id: req.params.id,
                orderUserId: req.user?._id
            },
            {
                status: -1
            },
            {
                new: true,
                runValidators: true
            }
        ).populate({
            path: 'roomId'
        });
        if (!result) {
            throw createHttpError(404, '此訂單不存在');
        }

        res.send({
            status: true,
            result
        });
    } catch (error) {
        next(error);
    }
};

export const deleteOrderByAdmin: RequestHandler = async (req, res, next) => {
    try {
        const result = await OrderModel.findOneAndUpdate(
            {
                _id: req.params.id
            },
            {
                status: -1
            },
            {
                new: true,
                runValidators: true
            }
        ).populate({
            path: 'roomId'
        });
        if (!result) {
            throw createHttpError(404, '此訂單不存在');
        }

        res.send({
            status: true,
            result
        });
    } catch (error) {
        next(error);
    }
};
