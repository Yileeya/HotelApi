import dayjs from 'dayjs';

export const orderMail = async (roomInfo: any, userName: string, orderDays: string[]) => {
    const roomName = roomInfo.name;
    const start = orderDays[0];
    const end = dayjs(orderDays[orderDays.length - 1]).add(1, 'day').format('YYYY-MM-DD');
    let price = 0;
    let holidayCount = 0;
    let weekdayCount = 0;

    orderDays.forEach(date => {
        const day = dayjs(date).day(); // 取得星期幾 (0 是星期日，6 是星期六)
        if (day === 0 || day === 5 || day === 6) { // 如果是星期五、六或日，則視為假日
            holidayCount++;
        } else { // 否則為平常日
            weekdayCount++;
        }
    });
    price = holidayCount * roomInfo.weekendPrice + weekdayCount * roomInfo.weekdayPrice;
    price = Math.ceil(price * 1.05);
    const formattedPrice = price.toLocaleString('zh-TW', {
        maximumFractionDigits: 0
    });

    return `<p>Dear ${userName}</p>` +
        `<p>Thank you for choosing The House! We have received your reservation for a <b>${roomName}</b> from <b>${start}</b>, to <b>${end}</b>, at a total rate of <b> NT$ ${formattedPrice}</b>.</p>` +
        '<p>Should you have any questions or special requests, please feel free to contact us. We are committed to providing you with the highest quality service to ensure a pleasant and comfortable stay.</p>' +
        '<p>Thank you once again for your reservation! We look forward to welcoming you.</p>' +
        '<p>Best Regards,</p>' +
        '<p>The House Team</p>';
};