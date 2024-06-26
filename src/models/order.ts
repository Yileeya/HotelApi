import { Schema, model, type Document } from 'mongoose';
import validator from 'validator';

export interface IOrder extends Document {
    roomId: Schema.Types.ObjectId;
    days: string[];
    peopleNum: number;
    userInfo: {
        name: string;
        phone: string;
        email: string;
    };
}

const orderSchema = new Schema<IOrder>(
    {
        roomId: {
            type: Schema.Types.ObjectId,
            ref: 'room',
            required: [true, 'roomId 未填寫']
        },
        days: {
            type: [String],
            required: [true, 'days 未填寫']
        },
        peopleNum: {
            type: Number,
            required: [true, 'peopleNum 未填寫'],
            validate: {
                validator(value: number) {
                    return validator.isInt(`${value}`, { min: 1 });
                },
                message: 'peopleNum 格式不正確'
            }
        },
        userInfo: {
            type: new Schema({
                name: {
                    type: String,
                    required: [true, 'name 未填寫']
                },
                phone: {
                    type: String,
                    required: [true, 'phone 未填寫']
                },
                email: {
                    type: String,
                    required: [true, 'email 未填寫']
                }
            }, { _id: false }),
            required: [true, 'userInfo 未填寫']
        }
    },
    {
        versionKey: false,
        timestamps: true
    }
);

export default model('order', orderSchema);
