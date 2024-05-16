import { Schema, model, type Document } from 'mongoose';
import validator from 'validator';
import itemSchema, { IItem } from './schema/item';

export interface IRoom extends Document {
    name: string;
    description: string;
    imageUrlList: string[];
    areaInfo: Number;
    bedInfo: string;
    maxPeople: number;
    price: number;
    // 可使用：1，已刪除：-1
    status: number;
    facilityInfo: IItem[];
    checkIn: string;
    checkOut: string;
    weekdayPrice: number;
    weekendPrice: number;
}

const roomSchema = new Schema<IRoom>(
    {
        name: {
            type: String,
            required: [true, 'name 未填寫']
        },
        description: {
            type: String,
            required: [true, 'description 未填寫']
        },
        imageUrlList: [
            {
                type: String,
                trim: true,
                validate: {
                    validator(value: string) {
                        return validator.isURL(value, { protocols: ['https'] });
                    },
                    message: 'imageUrlList 格式不正確'
                }
            }
        ],
        areaInfo: {
            type: Number,
            required: [true, 'areaInfo 未填寫']
        },
        bedInfo: {
            type: String,
            required: [true, 'bedInfo 未填寫']
        },
        maxPeople: {
            type: Number,
            required: [true, 'maxPeople 未填寫'],
            validate: {
                validator(value: number) {
                    return validator.isInt(`${value}`, { min: 1 });
                },
                message: 'maxPeople 格式不正確'
            }
        },
        checkIn: {
            type: String,
            required: [true, 'checkIn 時段未填寫']
        },
        checkOut:{
            type: String,
            required: [true, 'checkOut 未填寫']
        },
        weekdayPrice:{
            type: Number,
            required: [true, '平日價格 未填寫']
        },
        weekendPrice:{
            type: Number,
            required: [true, '假日價格 未填寫']
        },
        status: {
            type: Number,
            default: 1
        },
        facilityInfo: {
            type: [itemSchema],
            default: []
        }
    },
    {
        versionKey: false,
        timestamps: true
    }
);

export default model('room', roomSchema);
