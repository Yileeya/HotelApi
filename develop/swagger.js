import swaggerAutogenous from 'swagger-autogen';
import path from 'path';

const doc = {
    info: {
        title: 'Freyja 旅館 API 系統 | 六角學院',
        description: `打破影音課程售後不理，我們在線上等著你。\n注意事項：登入成功後請點「Authorize」輸入 Token。\n\n範例程式碼 :

    fetch('/api/v1/home/news', { method: 'GET' })
        .then(response => response.json())
        .then(res => {
            // { status: 'true', result: [{...}] }
            console.log(res);
        });
    `
    },
    securityDefinitions: {
        bearerAuth: {
            type: 'apiKey',
            in: 'header',
            name: 'authorization',
            description: '請加上 API Token'
        }
    },
    // 參考 : https://swagger-autogen.github.io/docs/swagger-2/schemas-and-definitions
    definitions: {
        CulinaryBody: {
            title: '修改 - 海霸',
            description: '修改 - 以新鮮海產料理聞名...',
            diningTime: 'SUN-MON 11:00-20:30',
            image: '修改 - https://fakeimg.pl/300/'
        },
        CulinaryResponses: {
            _id: '653e30dafa27fbbeb053501b',
            title: '海霸',
            description: '以新鮮海產料理聞名...',
            diningTime: 'SUN-MON 11:00-20:30',
            image: 'https://fakeimg.pl/300/',
            createdAt: '2023-10-29T10:15:54.811Z',
            updatedAt: '2023-10-29T10:15:54.811Z'
        },
        NewsBody: {
            title: '秋季旅遊，豪華享受方案',
            description: '秋天就是要來場豪華的旅遊...',
            image: 'https://fakeimg.pl/300/'
        },
        NewsResponses: {
            _id: '6523e9f23a22dd8d8207ef7c',
            title: '秋季旅遊，豪華享受方案',
            description: '秋天就是要來場豪華的旅遊...',
            image: 'https://fakeimg.pl/300/',
            createdAt: '2023-10-09T11:54:26.586Z',
            updatedAt: '2023-10-09T11:54:26.586Z'
        },
        RoomBody: {
            name: '尊爵雙人房',
            description: '享受高級的住宿體驗，尊爵雙人房提供給您舒適寬敞的空間和精緻的裝潢。',
            imageUrl: 'https://fakeimg.pl/300/',
            imageUrlList: ['https://fakeimg.pl/300/', 'https://fakeimg.pl/300/', 'https://fakeimg.pl/300/'],
            areaInfo: '24坪',
            bedInfo: '一張大床',
            maxPeople: 4,
            price: 10000,
            layoutInfo: [{ title: '市景', isProvide: true }],
            facilityInfo: [{ title: '平面電視', isProvide: true }],
            amenityInfo: [{ title: '衛生紙', isProvide: true }]
        },
        RoomResponses: {
            name: '尊爵雙人房',
            description: '享受高級的住宿體驗，尊爵雙人房提供給您舒適寬敞的空間和精緻的裝潢。',
            imageUrl: 'https://fakeimg.pl/300/',
            imageUrlList: ['https://fakeimg.pl/300/', 'https://fakeimg.pl/300/', 'https://fakeimg.pl/300/'],
            areaInfo: '24坪',
            bedInfo: '一張大床',
            maxPeople: 4,
            price: 10000,
            status: 1,
            layoutInfo: [{ title: '市景', isProvide: true }],
            facilityInfo: [{ title: '平面電視', isProvide: true }],
            amenityInfo: [{ title: '衛生紙', isProvide: true }],
            _id: '653e4661336cdccc752127a0',
            createdAt: '2023-10-29T11:47:45.641Z',
            updatedAt: '2023-10-29T11:47:45.641Z'
        },
        RoomSimpleResponses: {
            '_id': '66379dab572d47f89cd1100f',
            'name': 'Single Room',
            'imageUrl': 'https://images.unsplash.com/photo-1424847262089-18a6858bd7e2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        },
        RoomBookedDays: ['2024-08-20', '2024-08-21', '2024-08-22', '2024-10-23', '2024-10-24'],
        FacilityInfo: [{ title: 'Mini bar', isProvide: false }, { title: 'Wifi', isProvide: true }, { title: 'AC', isProvide: true }, { title: 'Room Service', isProvide: false }, { title: 'Sofa', isProvide: false }, { title: 'Scenery', isProvide: false }, { title: 'Breakfast', isProvide: true }],
        RoomDetailResponses: {
            '_id': '66379dab572d47f89cd1100f',
            'name': 'Single Room',
            'description': 'Single Room is only reserved for one guest. There is a bedroom with a single size bed and a private bathroom. Everything you need prepared for you: sheets and blankets, towels, soap and shampoo, hairdryer are provided. In the room there is AC and of course WiFi.',
            'imageUrlList': [
                'https://images.unsplash.com/photo-1424847262089-18a6858bd7e2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            ],
            'areaInfo': 15,
            'bedInfo': 'Single',
            'maxPeople': 1,
            'checkIn': '15:00 ~ 21:00',
            'checkOut': '10:00',
            'weekdayPrice': 1099,
            'status': 1,
            'facilityInfo': { $ref: '#/definitions/FacilityInfo' },
            'weekendPrice': 1300
        },
        OrderUserInfo: {
            name: 'Joanne Chen',
            phone: '0912345678',
            email: 'example@gmail.com'
        },
        OrderBody: {
            roomId: '66379dab572d47f89cd1100f',
            peopleNum: 1,
            userInfo: { $ref: '#/definitions/OrderUserInfo' },
            days: ['2024-08-11', '2024-08-12']
        },
        OrderResponses: {
            userInfo: { $ref: '#/definitions/OrderUserInfo' },
            _id: '653e335a13831c2ac8c389bb',
            roomId: { $ref: '#/definitions/RoomResponses' },
            checkInDate: '2023-06-17T16:00:00.000Z',
            checkOutDate: '2023-06-18T16:00:00.000Z',
            peopleNum: 2,
            orderUserId: '6533f0ef4cdf5b7f762747b0',
            status: 0,
            createdAt: '2023-10-29T10:26:34.498Z',
            updatedAt: '2023-10-29T10:26:34.498Z'
        }
    }
};

const outputFile = `${path.resolve()}/develop/swagger_output.json`;

swaggerAutogenous(outputFile, ['src/app/index.ts'], doc);
