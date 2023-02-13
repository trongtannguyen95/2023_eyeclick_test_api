/*
 Navicat Premium Data Transfer

 Source Server         : MONGO LOCAL
 Source Server Type    : MongoDB
 Source Server Version : 40406
 Source Host           : localhost:27017
 Source Schema         : 2023_eyeclick_test

 Target Server Type    : MongoDB
 Target Server Version : 40406
 File Encoding         : 65001

 Date: 14/02/2023 00:05:44
*/


// ----------------------------
// Collection structure for request_forgot_password
// ----------------------------
db.getCollection("request_forgot_password").drop();
db.createCollection("request_forgot_password");

// ----------------------------
// Collection structure for shop_items
// ----------------------------
db.getCollection("shop_items").drop();
db.createCollection("shop_items");

// ----------------------------
// Documents of shop_items
// ----------------------------
db.getCollection("shop_items").insert([ {
    _id: ObjectId("63ea397e5e3e273f27915e9a"),
    name: "TEST Item 1",
    description: "Test item 1 description",
    image: "https://via.placeholder.com/500x500",
    price: NumberInt("25000"),
    deleted: NumberInt("0"),
    status: NumberInt("0"),
    created: ObjectId("63e799c4ae6491b53e40a025"),
    modified: ObjectId("63e799c4ae6491b53e40a025"),
    createdAt: ISODate("2023-02-13T13:22:06.335Z"),
    updatedAt: ISODate("2023-02-13T13:22:06.335Z"),
    __v: NumberInt("0")
} ]);
db.getCollection("shop_items").insert([ {
    _id: ObjectId("63ea39895e3e273f27915e9c"),
    name: "TEST Item 2",
    description: "Test item 2 description",
    image: "https://via.placeholder.com/500x500",
    price: NumberInt("25000"),
    deleted: NumberInt("0"),
    status: NumberInt("0"),
    created: ObjectId("63e799c4ae6491b53e40a025"),
    modified: ObjectId("63e799c4ae6491b53e40a025"),
    createdAt: ISODate("2023-02-13T13:22:17.724Z"),
    updatedAt: ISODate("2023-02-13T13:22:17.724Z"),
    __v: NumberInt("0")
} ]);
db.getCollection("shop_items").insert([ {
    _id: ObjectId("63ea39925e3e273f27915e9e"),
    name: "TEST Item 3",
    description: "Test item 3 description",
    image: "https://via.placeholder.com/500x500",
    price: NumberInt("20000"),
    deleted: NumberInt("0"),
    status: NumberInt("0"),
    created: ObjectId("63e799c4ae6491b53e40a025"),
    modified: ObjectId("63e799c4ae6491b53e40a025"),
    createdAt: ISODate("2023-02-13T13:22:26.558Z"),
    updatedAt: ISODate("2023-02-13T13:22:26.558Z"),
    __v: NumberInt("0")
} ]);
db.getCollection("shop_items").insert([ {
    _id: ObjectId("63ea399b5e3e273f27915ea0"),
    name: "TEST Item 4",
    description: "Test item 4 description",
    image: "https://via.placeholder.com/500x500",
    price: NumberInt("44000"),
    deleted: NumberInt("0"),
    status: NumberInt("0"),
    created: ObjectId("63e799c4ae6491b53e40a025"),
    modified: ObjectId("63e799c4ae6491b53e40a025"),
    createdAt: ISODate("2023-02-13T13:22:35.53Z"),
    updatedAt: ISODate("2023-02-13T13:22:35.53Z"),
    __v: NumberInt("0")
} ]);
db.getCollection("shop_items").insert([ {
    _id: ObjectId("63ea667aa1d30a95d0dd6a6d"),
    name: "Item 5",
    description: "Description of Item 5",
    image: "https://via.placeholder.com/500x500.png?text=Item+Image+5",
    price: NumberInt("50000"),
    deleted: NumberInt("0"),
    status: NumberInt("1"),
    created: ObjectId("63e799c4ae6491b53e40a025"),
    modified: ObjectId("63e799c4ae6491b53e40a025"),
    createdAt: ISODate("2023-02-13T16:34:02.756Z"),
    updatedAt: ISODate("2023-02-13T16:34:02.756Z"),
    __v: NumberInt("0")
} ]);
db.getCollection("shop_items").insert([ {
    _id: ObjectId("63ea668da1d30a95d0dd6a7d"),
    name: "Item 6",
    description: "Description of Item 6",
    image: "https://via.placeholder.com/500x500.png?text=Item+Image+6",
    price: NumberInt("60000"),
    deleted: NumberInt("0"),
    status: NumberInt("1"),
    created: ObjectId("63e799c4ae6491b53e40a025"),
    modified: ObjectId("63e799c4ae6491b53e40a025"),
    createdAt: ISODate("2023-02-13T16:34:21.708Z"),
    updatedAt: ISODate("2023-02-13T16:34:21.708Z"),
    __v: NumberInt("0")
} ]);
db.getCollection("shop_items").insert([ {
    _id: ObjectId("63ea669aa1d30a95d0dd6a7f"),
    name: "Item 7",
    description: "Description of Item 7",
    image: "https://via.placeholder.com/500x500.png?text=Item+Image+7",
    price: NumberInt("70000"),
    deleted: NumberInt("0"),
    status: NumberInt("1"),
    created: ObjectId("63e799c4ae6491b53e40a025"),
    modified: ObjectId("63e799c4ae6491b53e40a025"),
    createdAt: ISODate("2023-02-13T16:34:34.148Z"),
    updatedAt: ISODate("2023-02-13T16:34:34.148Z"),
    __v: NumberInt("0")
} ]);
db.getCollection("shop_items").insert([ {
    _id: ObjectId("63ea66a5a1d30a95d0dd6a81"),
    name: "Item 8",
    description: "Description of Item 8",
    image: "https://via.placeholder.com/500x500.png?text=Item+Image+8",
    price: NumberInt("80000"),
    deleted: NumberInt("0"),
    status: NumberInt("1"),
    created: ObjectId("63e799c4ae6491b53e40a025"),
    modified: ObjectId("63e799c4ae6491b53e40a025"),
    createdAt: ISODate("2023-02-13T16:34:45.601Z"),
    updatedAt: ISODate("2023-02-13T16:34:45.601Z"),
    __v: NumberInt("0")
} ]);
db.getCollection("shop_items").insert([ {
    _id: ObjectId("63ea675ca1d30a95d0dd6a91"),
    name: "Item 9",
    description: "Description of Item 9",
    image: "https://via.placeholder.com/500x500.png?text=Item+Image+9",
    price: NumberInt("90000"),
    deleted: NumberInt("0"),
    status: NumberInt("1"),
    created: ObjectId("63e799c4ae6491b53e40a025"),
    modified: ObjectId("63e799c4ae6491b53e40a025"),
    createdAt: ISODate("2023-02-13T16:37:48.957Z"),
    updatedAt: ISODate("2023-02-13T16:37:48.957Z"),
    __v: NumberInt("0")
} ]);
db.getCollection("shop_items").insert([ {
    _id: ObjectId("63ea6768a1d30a95d0dd6a93"),
    name: "Item 10",
    description: "Description of Item 10",
    image: "https://via.placeholder.com/500x500.png?text=Item+Image+10",
    price: NumberInt("100000"),
    deleted: NumberInt("0"),
    status: NumberInt("1"),
    created: ObjectId("63e799c4ae6491b53e40a025"),
    modified: ObjectId("63e799c4ae6491b53e40a025"),
    createdAt: ISODate("2023-02-13T16:38:00.11Z"),
    updatedAt: ISODate("2023-02-13T16:38:00.11Z"),
    __v: NumberInt("0")
} ]);
db.getCollection("shop_items").insert([ {
    _id: ObjectId("63ea676fa1d30a95d0dd6a95"),
    name: "Item 11",
    description: "Description of Item 11",
    image: "https://via.placeholder.com/500x500.png?text=Item+Image+11",
    price: NumberInt("110000"),
    deleted: NumberInt("0"),
    status: NumberInt("1"),
    created: ObjectId("63e799c4ae6491b53e40a025"),
    modified: ObjectId("63e799c4ae6491b53e40a025"),
    createdAt: ISODate("2023-02-13T16:38:07.286Z"),
    updatedAt: ISODate("2023-02-13T16:38:07.286Z"),
    __v: NumberInt("0")
} ]);
db.getCollection("shop_items").insert([ {
    _id: ObjectId("63ea6775a1d30a95d0dd6a97"),
    name: "Item 12",
    description: "Description of Item 12",
    image: "https://via.placeholder.com/500x500.png?text=Item+Image+12",
    price: NumberInt("120000"),
    deleted: NumberInt("0"),
    status: NumberInt("1"),
    created: ObjectId("63e799c4ae6491b53e40a025"),
    modified: ObjectId("63e799c4ae6491b53e40a025"),
    createdAt: ISODate("2023-02-13T16:38:13.344Z"),
    updatedAt: ISODate("2023-02-13T16:38:13.344Z"),
    __v: NumberInt("0")
} ]);
db.getCollection("shop_items").insert([ {
    _id: ObjectId("63ea677ba1d30a95d0dd6a99"),
    name: "Item 13",
    description: "Description of Item 13",
    image: "https://via.placeholder.com/500x500.png?text=Item+Image+13",
    price: NumberInt("130000"),
    deleted: NumberInt("0"),
    status: NumberInt("1"),
    created: ObjectId("63e799c4ae6491b53e40a025"),
    modified: ObjectId("63e799c4ae6491b53e40a025"),
    createdAt: ISODate("2023-02-13T16:38:19.161Z"),
    updatedAt: ISODate("2023-02-13T16:38:19.161Z"),
    __v: NumberInt("0")
} ]);
db.getCollection("shop_items").insert([ {
    _id: ObjectId("63ea6784a1d30a95d0dd6a9b"),
    name: "Item 14",
    description: "Description of Item 14",
    image: "https://via.placeholder.com/500x500.png?text=Item+Image+14",
    price: NumberInt("140000"),
    deleted: NumberInt("0"),
    status: NumberInt("1"),
    created: ObjectId("63e799c4ae6491b53e40a025"),
    modified: ObjectId("63e799c4ae6491b53e40a025"),
    createdAt: ISODate("2023-02-13T16:38:28.99Z"),
    updatedAt: ISODate("2023-02-13T16:38:28.99Z"),
    __v: NumberInt("0")
} ]);
db.getCollection("shop_items").insert([ {
    _id: ObjectId("63ea678ba1d30a95d0dd6a9d"),
    name: "Item 15",
    description: "Description of Item 15",
    image: "https://via.placeholder.com/500x500.png?text=Item+Image+15",
    price: NumberInt("160000"),
    deleted: NumberInt("0"),
    status: NumberInt("1"),
    created: ObjectId("63e799c4ae6491b53e40a025"),
    modified: ObjectId("63e799c4ae6491b53e40a025"),
    createdAt: ISODate("2023-02-13T16:38:35.212Z"),
    updatedAt: ISODate("2023-02-13T16:38:35.212Z"),
    __v: NumberInt("0")
} ]);
db.getCollection("shop_items").insert([ {
    _id: ObjectId("63ea6796a1d30a95d0dd6a9f"),
    name: "Item 17",
    description: "Description of Item 17",
    image: "https://via.placeholder.com/500x500.png?text=Item+Image+17",
    price: NumberInt("170000"),
    deleted: NumberInt("0"),
    status: NumberInt("1"),
    created: ObjectId("63e799c4ae6491b53e40a025"),
    modified: ObjectId("63e799c4ae6491b53e40a025"),
    createdAt: ISODate("2023-02-13T16:38:46.296Z"),
    updatedAt: ISODate("2023-02-13T16:38:46.296Z"),
    __v: NumberInt("0")
} ]);
db.getCollection("shop_items").insert([ {
    _id: ObjectId("63ea679da1d30a95d0dd6aa1"),
    name: "Item 18",
    description: "Description of Item 18",
    image: "https://via.placeholder.com/500x500.png?text=Item+Image+18",
    price: NumberInt("180000"),
    deleted: NumberInt("0"),
    status: NumberInt("1"),
    created: ObjectId("63e799c4ae6491b53e40a025"),
    modified: ObjectId("63e799c4ae6491b53e40a025"),
    createdAt: ISODate("2023-02-13T16:38:53.159Z"),
    updatedAt: ISODate("2023-02-13T16:38:53.159Z"),
    __v: NumberInt("0")
} ]);
db.getCollection("shop_items").insert([ {
    _id: ObjectId("63ea67a4a1d30a95d0dd6aa3"),
    name: "Item 19",
    description: "Description of Item 19",
    image: "https://via.placeholder.com/500x500.png?text=Item+Image+19",
    price: NumberInt("190000"),
    deleted: NumberInt("0"),
    status: NumberInt("1"),
    created: ObjectId("63e799c4ae6491b53e40a025"),
    modified: ObjectId("63e799c4ae6491b53e40a025"),
    createdAt: ISODate("2023-02-13T16:39:00.865Z"),
    updatedAt: ISODate("2023-02-13T16:39:00.865Z"),
    __v: NumberInt("0")
} ]);
db.getCollection("shop_items").insert([ {
    _id: ObjectId("63ea67afa1d30a95d0dd6aa5"),
    name: "Item 20",
    description: "Description of Item 20",
    image: "https://via.placeholder.com/500x500.png?text=Item+Image+20",
    price: NumberInt("200000"),
    deleted: NumberInt("0"),
    status: NumberInt("1"),
    created: ObjectId("63e799c4ae6491b53e40a025"),
    modified: ObjectId("63e799c4ae6491b53e40a025"),
    createdAt: ISODate("2023-02-13T16:39:11.463Z"),
    updatedAt: ISODate("2023-02-13T16:39:11.463Z"),
    __v: NumberInt("0")
} ]);
db.getCollection("shop_items").insert([ {
    _id: ObjectId("63ea67f1a1d30a95d0dd6aa7"),
    name: "Item 16",
    description: "Description of Item 16",
    image: "https://via.placeholder.com/500x500.png?text=Item+Image+16",
    price: NumberInt("160000"),
    deleted: NumberInt("0"),
    status: NumberInt("1"),
    created: ObjectId("63e799c4ae6491b53e40a025"),
    modified: ObjectId("63e799c4ae6491b53e40a025"),
    createdAt: ISODate("2023-02-13T16:40:17.104Z"),
    updatedAt: ISODate("2023-02-13T16:40:17.104Z"),
    __v: NumberInt("0")
} ]);

// ----------------------------
// Collection structure for shop_items_i18n
// ----------------------------
db.getCollection("shop_items_i18n").drop();
db.createCollection("shop_items_i18n");

// ----------------------------
// Collection structure for user_activities
// ----------------------------
db.getCollection("user_activities").drop();
db.createCollection("user_activities");

// ----------------------------
// Documents of user_activities
// ----------------------------
db.getCollection("user_activities").insert([ {
    _id: ObjectId("63e79bfe987baf062787b354"),
    module: "users",
    resource: "auth",
    action: "login",
    message: "administrator has successfully logged in",
    resourceId: ObjectId("63e799c4ae6491b53e40a025"),
    data: {
        success: true,
        reuseToken: false,
        username: "administrator"
    },
    userId: ObjectId("63e799c4ae6491b53e40a025"),
    userAgent: {
        ua: "Chrome"
    },
    ipv4: "::ffff:127.0.0.1",
    created: ObjectId("63e799c4ae6491b53e40a025"),
    modified: ObjectId("63e799c4ae6491b53e40a025"),
    createdAt: ISODate("2023-02-11T13:45:34.857Z"),
    updatedAt: ISODate("2023-02-11T13:45:34.857Z"),
    __v: NumberInt("0")
} ]);
db.getCollection("user_activities").insert([ {
    _id: ObjectId("63e8e2f9f8babb7d90e81220"),
    module: "users",
    resource: "auth",
    action: "login",
    message: "administrator has successfully logged in",
    resourceId: ObjectId("63e799c4ae6491b53e40a025"),
    data: {
        success: true,
        reuseToken: false,
        username: "administrator"
    },
    userId: ObjectId("63e799c4ae6491b53e40a025"),
    userAgent: {
        ua: "chrome"
    },
    ipv4: "::ffff:127.0.0.1",
    created: ObjectId("63e799c4ae6491b53e40a025"),
    modified: ObjectId("63e799c4ae6491b53e40a025"),
    createdAt: ISODate("2023-02-12T13:00:41.895Z"),
    updatedAt: ISODate("2023-02-12T13:00:41.895Z"),
    __v: NumberInt("0")
} ]);
db.getCollection("user_activities").insert([ {
    _id: ObjectId("63e8e9d43bd4ed84c8451037"),
    module: "users",
    resource: "auth",
    action: "login",
    message: "administrator login failed",
    resourceId: ObjectId("63e799c4ae6491b53e40a025"),
    data: {
        success: false
    },
    userId: ObjectId("63e799c4ae6491b53e40a025"),
    userAgent: {
        ua: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36",
        browser: {
            name: "Chrome",
            version: "109.0.0.0",
            major: "109"
        },
        engine: {
            name: "Blink",
            version: "109.0.0.0"
        },
        os: {
            name: "Windows",
            version: "10"
        },
        cpu: {
            architecture: "amd64"
        }
    },
    ipv4: "::1",
    created: ObjectId("63e799c4ae6491b53e40a025"),
    modified: ObjectId("63e799c4ae6491b53e40a025"),
    createdAt: ISODate("2023-02-12T13:29:56.14Z"),
    updatedAt: ISODate("2023-02-12T13:29:56.14Z"),
    __v: NumberInt("0")
} ]);
db.getCollection("user_activities").insert([ {
    _id: ObjectId("63e8e9e03bd4ed84c845103b"),
    module: "users",
    resource: "auth",
    action: "login",
    message: "administrator has successfully logged in",
    resourceId: ObjectId("63e799c4ae6491b53e40a025"),
    data: {
        success: true,
        reuseToken: true,
        username: "administrator"
    },
    userId: ObjectId("63e799c4ae6491b53e40a025"),
    userAgent: {
        ua: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36",
        browser: {
            name: "Chrome",
            version: "109.0.0.0",
            major: "109"
        },
        engine: {
            name: "Blink",
            version: "109.0.0.0"
        },
        os: {
            name: "Windows",
            version: "10"
        },
        cpu: {
            architecture: "amd64"
        }
    },
    ipv4: "::1",
    created: ObjectId("63e799c4ae6491b53e40a025"),
    modified: ObjectId("63e799c4ae6491b53e40a025"),
    createdAt: ISODate("2023-02-12T13:30:08.581Z"),
    updatedAt: ISODate("2023-02-12T13:30:08.581Z"),
    __v: NumberInt("0")
} ]);
db.getCollection("user_activities").insert([ {
    _id: ObjectId("63e8ea0c3bd4ed84c845103f"),
    module: "users",
    resource: "auth",
    action: "login",
    message: "administrator has successfully logged in",
    resourceId: ObjectId("63e799c4ae6491b53e40a025"),
    data: {
        success: true,
        reuseToken: true,
        username: "administrator"
    },
    userId: ObjectId("63e799c4ae6491b53e40a025"),
    userAgent: {
        ua: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36",
        browser: {
            name: "Chrome",
            version: "109.0.0.0",
            major: "109"
        },
        engine: {
            name: "Blink",
            version: "109.0.0.0"
        },
        os: {
            name: "Windows",
            version: "10"
        },
        cpu: {
            architecture: "amd64"
        }
    },
    ipv4: "::1",
    created: ObjectId("63e799c4ae6491b53e40a025"),
    modified: ObjectId("63e799c4ae6491b53e40a025"),
    createdAt: ISODate("2023-02-12T13:30:52.682Z"),
    updatedAt: ISODate("2023-02-12T13:30:52.682Z"),
    __v: NumberInt("0")
} ]);
db.getCollection("user_activities").insert([ {
    _id: ObjectId("63e8ea233bd4ed84c8451043"),
    module: "users",
    resource: "auth",
    action: "login",
    message: "administrator has successfully logged in",
    resourceId: ObjectId("63e799c4ae6491b53e40a025"),
    data: {
        success: true,
        reuseToken: true,
        username: "administrator"
    },
    userId: ObjectId("63e799c4ae6491b53e40a025"),
    userAgent: {
        ua: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36",
        browser: {
            name: "Chrome",
            version: "109.0.0.0",
            major: "109"
        },
        engine: {
            name: "Blink",
            version: "109.0.0.0"
        },
        os: {
            name: "Windows",
            version: "10"
        },
        cpu: {
            architecture: "amd64"
        }
    },
    ipv4: "::1",
    created: ObjectId("63e799c4ae6491b53e40a025"),
    modified: ObjectId("63e799c4ae6491b53e40a025"),
    createdAt: ISODate("2023-02-12T13:31:15.857Z"),
    updatedAt: ISODate("2023-02-12T13:31:15.857Z"),
    __v: NumberInt("0")
} ]);
db.getCollection("user_activities").insert([ {
    _id: ObjectId("63e8ea313bd4ed84c8451047"),
    module: "users",
    resource: "auth",
    action: "login",
    message: "administrator has successfully logged in",
    resourceId: ObjectId("63e799c4ae6491b53e40a025"),
    data: {
        success: true,
        reuseToken: true,
        username: "administrator"
    },
    userId: ObjectId("63e799c4ae6491b53e40a025"),
    userAgent: {
        ua: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36",
        browser: {
            name: "Chrome",
            version: "109.0.0.0",
            major: "109"
        },
        engine: {
            name: "Blink",
            version: "109.0.0.0"
        },
        os: {
            name: "Windows",
            version: "10"
        },
        cpu: {
            architecture: "amd64"
        }
    },
    ipv4: "::1",
    created: ObjectId("63e799c4ae6491b53e40a025"),
    modified: ObjectId("63e799c4ae6491b53e40a025"),
    createdAt: ISODate("2023-02-12T13:31:29.685Z"),
    updatedAt: ISODate("2023-02-12T13:31:29.685Z"),
    __v: NumberInt("0")
} ]);
db.getCollection("user_activities").insert([ {
    _id: ObjectId("63e8ea783bd4ed84c845104b"),
    module: "users",
    resource: "auth",
    action: "login",
    message: "administrator has successfully logged in",
    resourceId: ObjectId("63e799c4ae6491b53e40a025"),
    data: {
        success: true,
        reuseToken: true,
        username: "administrator"
    },
    userId: ObjectId("63e799c4ae6491b53e40a025"),
    userAgent: {
        ua: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36",
        browser: {
            name: "Chrome",
            version: "109.0.0.0",
            major: "109"
        },
        engine: {
            name: "Blink",
            version: "109.0.0.0"
        },
        os: {
            name: "Windows",
            version: "10"
        },
        cpu: {
            architecture: "amd64"
        }
    },
    ipv4: "::1",
    created: ObjectId("63e799c4ae6491b53e40a025"),
    modified: ObjectId("63e799c4ae6491b53e40a025"),
    createdAt: ISODate("2023-02-12T13:32:40.029Z"),
    updatedAt: ISODate("2023-02-12T13:32:40.029Z"),
    __v: NumberInt("0")
} ]);
db.getCollection("user_activities").insert([ {
    _id: ObjectId("63e8eac03bd4ed84c845104f"),
    module: "users",
    resource: "auth",
    action: "login",
    message: "administrator has successfully logged in",
    resourceId: ObjectId("63e799c4ae6491b53e40a025"),
    data: {
        success: true,
        reuseToken: true,
        username: "administrator"
    },
    userId: ObjectId("63e799c4ae6491b53e40a025"),
    userAgent: {
        ua: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36",
        browser: {
            name: "Chrome",
            version: "109.0.0.0",
            major: "109"
        },
        engine: {
            name: "Blink",
            version: "109.0.0.0"
        },
        os: {
            name: "Windows",
            version: "10"
        },
        cpu: {
            architecture: "amd64"
        }
    },
    ipv4: "::1",
    created: ObjectId("63e799c4ae6491b53e40a025"),
    modified: ObjectId("63e799c4ae6491b53e40a025"),
    createdAt: ISODate("2023-02-12T13:33:52.638Z"),
    updatedAt: ISODate("2023-02-12T13:33:52.638Z"),
    __v: NumberInt("0")
} ]);
db.getCollection("user_activities").insert([ {
    _id: ObjectId("63e8f177bbcaed1ec73fb04c"),
    module: "users",
    resource: "auth",
    action: "login",
    message: "administrator has successfully logged in",
    resourceId: ObjectId("63e799c4ae6491b53e40a025"),
    data: {
        success: true,
        reuseToken: true,
        username: "administrator"
    },
    userId: ObjectId("63e799c4ae6491b53e40a025"),
    userAgent: {
        ua: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36",
        browser: {
            name: "Chrome",
            version: "109.0.0.0",
            major: "109"
        },
        engine: {
            name: "Blink",
            version: "109.0.0.0"
        },
        os: {
            name: "Windows",
            version: "10"
        },
        cpu: {
            architecture: "amd64"
        }
    },
    ipv4: "::1",
    created: ObjectId("63e799c4ae6491b53e40a025"),
    modified: ObjectId("63e799c4ae6491b53e40a025"),
    createdAt: ISODate("2023-02-12T14:02:31.968Z"),
    updatedAt: ISODate("2023-02-12T14:02:31.968Z"),
    __v: NumberInt("0")
} ]);
db.getCollection("user_activities").insert([ {
    _id: ObjectId("63e8f1a4bbcaed1ec73fb055"),
    module: "users",
    resource: "auth",
    action: "login",
    message: "administrator has successfully logged in",
    resourceId: ObjectId("63e799c4ae6491b53e40a025"),
    data: {
        success: true,
        reuseToken: true,
        username: "administrator"
    },
    userId: ObjectId("63e799c4ae6491b53e40a025"),
    userAgent: {
        ua: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36",
        browser: {
            name: "Chrome",
            version: "109.0.0.0",
            major: "109"
        },
        engine: {
            name: "Blink",
            version: "109.0.0.0"
        },
        os: {
            name: "Windows",
            version: "10"
        },
        cpu: {
            architecture: "amd64"
        }
    },
    ipv4: "::1",
    created: ObjectId("63e799c4ae6491b53e40a025"),
    modified: ObjectId("63e799c4ae6491b53e40a025"),
    createdAt: ISODate("2023-02-12T14:03:16.928Z"),
    updatedAt: ISODate("2023-02-12T14:03:16.928Z"),
    __v: NumberInt("0")
} ]);
db.getCollection("user_activities").insert([ {
    _id: ObjectId("63ea39545e3e273f27915e98"),
    module: "users",
    resource: "auth",
    action: "login",
    message: "administrator has successfully logged in",
    resourceId: ObjectId("63e799c4ae6491b53e40a025"),
    data: {
        success: true,
        reuseToken: false,
        username: "administrator"
    },
    userId: ObjectId("63e799c4ae6491b53e40a025"),
    userAgent: {
        ua: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36",
        browser: {
            name: "Chrome",
            version: "109.0.0.0",
            major: "109"
        },
        engine: {
            name: "Blink",
            version: "109.0.0.0"
        },
        os: {
            name: "Windows",
            version: "10"
        },
        cpu: {
            architecture: "amd64"
        }
    },
    ipv4: "::1",
    created: ObjectId("63e799c4ae6491b53e40a025"),
    modified: ObjectId("63e799c4ae6491b53e40a025"),
    createdAt: ISODate("2023-02-13T13:21:24.362Z"),
    updatedAt: ISODate("2023-02-13T13:21:24.362Z"),
    __v: NumberInt("0")
} ]);
db.getCollection("user_activities").insert([ {
    _id: ObjectId("63ea5567adb8763785a1b2bf"),
    module: "users",
    resource: "auth",
    action: "login",
    message: "administrator has successfully logged in",
    resourceId: ObjectId("63e799c4ae6491b53e40a025"),
    data: {
        success: true,
        reuseToken: true,
        username: "administrator"
    },
    userId: ObjectId("63e799c4ae6491b53e40a025"),
    userAgent: {
        ua: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36",
        browser: {
            name: "Chrome",
            version: "109.0.0.0",
            major: "109"
        },
        engine: {
            name: "Blink",
            version: "109.0.0.0"
        },
        os: {
            name: "Windows",
            version: "10"
        },
        cpu: {
            architecture: "amd64"
        }
    },
    ipv4: "::1",
    created: ObjectId("63e799c4ae6491b53e40a025"),
    modified: ObjectId("63e799c4ae6491b53e40a025"),
    createdAt: ISODate("2023-02-13T15:21:11.862Z"),
    updatedAt: ISODate("2023-02-13T15:21:11.862Z"),
    __v: NumberInt("0")
} ]);
db.getCollection("user_activities").insert([ {
    _id: ObjectId("63ea5660a1d30a95d0dd66be"),
    module: "users",
    resource: "auth",
    action: "login",
    message: "tannguyen has successfully logged in",
    resourceId: ObjectId("63e8fe41d42d7605e199f084"),
    data: {
        success: true,
        reuseToken: false,
        username: "tannguyen"
    },
    userId: ObjectId("63e8fe41d42d7605e199f084"),
    userAgent: {
        ua: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36",
        browser: {
            name: "Chrome",
            version: "109.0.0.0",
            major: "109"
        },
        engine: {
            name: "Blink",
            version: "109.0.0.0"
        },
        os: {
            name: "Windows",
            version: "10"
        },
        cpu: {
            architecture: "amd64"
        }
    },
    ipv4: "::1",
    created: ObjectId("63e8fe41d42d7605e199f084"),
    modified: ObjectId("63e8fe41d42d7605e199f084"),
    createdAt: ISODate("2023-02-13T15:25:20.803Z"),
    updatedAt: ISODate("2023-02-13T15:25:20.803Z"),
    __v: NumberInt("0")
} ]);

// ----------------------------
// Collection structure for user_tokens
// ----------------------------
db.getCollection("user_tokens").drop();
db.createCollection("user_tokens");

// ----------------------------
// Documents of user_tokens
// ----------------------------
db.getCollection("user_tokens").insert([ {
    _id: ObjectId("63e79bfe987baf062787b352"),
    name: "administrator login at 1676123134",
    description: "Chrome",
    deleted: NumberInt("0"),
    status: NumberInt("0"),
    tokenHash: "618dab1616726994db3a1a2d6841d112495dd96a47aa4a0c5621fc4856b002fc",
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZTc5OWM0YWU2NDkxYjUzZTQwYTAyNSIsIm5hbWUiOiJOL0EiLCJ1c2VybmFtZSI6ImFkbWluaXN0cmF0b3IiLCJlbWFpbCI6InN5c3RlbUBzeXN0ZW0uY29tIiwiYXZhcnRhciI6Ik4vQSIsImZ1bGxOYW1lIjoiIiwiaXNBZG1pbmlzdHJhdG9yIjoxLCJpYXQiOjE2NzYxMjMxMzQsImV4cCI6MTY3NjIwOTUzNH0.mxk-HxoJYyjceaRWOoSgnmsurT0eXYm073gJhZh3iIc",
    iat: NumberInt("1676123134"),
    exp: NumberInt("1676209534"),
    ip: "::ffff:127.0.0.1",
    agentInfo: {
        ua: "Chrome"
    },
    created: ObjectId("63e799c4ae6491b53e40a025"),
    modified: ObjectId("63e799c4ae6491b53e40a025"),
    createdAt: ISODate("2023-02-11T13:45:34.838Z"),
    updatedAt: ISODate("2023-02-11T13:45:34.838Z"),
    __v: NumberInt("0")
} ]);
db.getCollection("user_tokens").insert([ {
    _id: ObjectId("63e8e2f9f8babb7d90e8121e"),
    name: "administrator login at 1676206841",
    description: "chrome",
    deleted: NumberInt("0"),
    status: NumberInt("0"),
    tokenHash: "29fbb586ee473b16f2851d6d069db47d4aa814caa6d066d369ced6f1144b8923",
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZTc5OWM0YWU2NDkxYjUzZTQwYTAyNSIsIm5hbWUiOiJOL0EiLCJ1c2VybmFtZSI6ImFkbWluaXN0cmF0b3IiLCJlbWFpbCI6InN5c3RlbUBzeXN0ZW0uY29tIiwiYXZhcnRhciI6Ik4vQSIsImZ1bGxOYW1lIjoiIiwiaXNBZG1pbmlzdHJhdG9yIjoxLCJpYXQiOjE2NzYyMDY4NDEsImV4cCI6MTY3NjI5MzI0MX0.KNimDnf1naTNLQR8-BUjBxifoNSDaBYgNyRIC6um3qE",
    iat: NumberInt("1676206841"),
    exp: NumberInt("1676293241"),
    ip: "::ffff:127.0.0.1",
    agentInfo: {
        ua: "chrome"
    },
    created: ObjectId("63e799c4ae6491b53e40a025"),
    modified: ObjectId("63e799c4ae6491b53e40a025"),
    createdAt: ISODate("2023-02-12T13:00:41.877Z"),
    updatedAt: ISODate("2023-02-12T13:00:41.877Z"),
    __v: NumberInt("0")
} ]);
db.getCollection("user_tokens").insert([ {
    _id: ObjectId("63e8fe41d42d7605e199f086"),
    name: "tannguyen login at 1676213825",
    description: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36",
    deleted: NumberInt("0"),
    status: NumberInt("0"),
    tokenHash: "5d43268ee2758c2bc102f730c893e4c94cae066ecb59ba804c81a1f3885ec16b",
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZThmZTQxZDQyZDc2MDVlMTk5ZjA4NCIsIm5hbWUiOiJUw6JuIE5ndXnhu4VuIiwidXNlcm5hbWUiOiJ0YW5uZ3V5ZW4iLCJlbWFpbCI6InRyb25ndGFuLm5ndXllbjk1QGdtYWlsLmNvbSIsImF2YXJ0YXIiOiJOL0EiLCJmdWxsTmFtZSI6IlTDom4gTmd1eeG7hW4iLCJpc0FkbWluaXN0cmF0b3IiOjAsImlhdCI6MTY3NjIxMzgyNSwiZXhwIjoxNjc2MzAwMjI1fQ.7TmrRT8iqGjPSvbeqRg2nATPIb_iJK1qcJDCy9zXZ_4",
    iat: NumberInt("1676213825"),
    exp: NumberInt("1676300225"),
    ip: "::1",
    agentInfo: {
        ua: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36",
        browser: {
            name: "Chrome",
            version: "109.0.0.0",
            major: "109"
        },
        engine: {
            name: "Blink",
            version: "109.0.0.0"
        },
        os: {
            name: "Windows",
            version: "10"
        },
        cpu: {
            architecture: "amd64"
        }
    },
    created: ObjectId("63e8fe41d42d7605e199f084"),
    modified: ObjectId("63e8fe41d42d7605e199f084"),
    createdAt: ISODate("2023-02-12T14:57:05.653Z"),
    updatedAt: ISODate("2023-02-12T14:57:05.653Z"),
    __v: NumberInt("0")
} ]);
db.getCollection("user_tokens").insert([ {
    _id: ObjectId("63ea39545e3e273f27915e96"),
    name: "administrator login at 1676294484",
    description: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36",
    deleted: NumberInt("0"),
    status: NumberInt("0"),
    tokenHash: "6346c66a4991caac2c5d8a0c008db11749fbbb0bf2bb0bf48fcf792ead0cf364",
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZTc5OWM0YWU2NDkxYjUzZTQwYTAyNSIsIm5hbWUiOiJOL0EiLCJ1c2VybmFtZSI6ImFkbWluaXN0cmF0b3IiLCJlbWFpbCI6InN5c3RlbUBzeXN0ZW0uY29tIiwiYXZhcnRhciI6Ik4vQSIsImZ1bGxOYW1lIjoiIiwiaXNBZG1pbmlzdHJhdG9yIjoxLCJpYXQiOjE2NzYyOTQ0ODQsImV4cCI6MTY3NjM4MDg4NH0.uUFlnl98HT0hjRWGOJBIr1ic-YjbiSlf7ISZtWhZQRs",
    iat: NumberInt("1676294484"),
    exp: NumberInt("1676380884"),
    ip: "::1",
    agentInfo: {
        ua: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36",
        browser: {
            name: "Chrome",
            version: "109.0.0.0",
            major: "109"
        },
        engine: {
            name: "Blink",
            version: "109.0.0.0"
        },
        os: {
            name: "Windows",
            version: "10"
        },
        cpu: {
            architecture: "amd64"
        }
    },
    created: ObjectId("63e799c4ae6491b53e40a025"),
    modified: ObjectId("63e799c4ae6491b53e40a025"),
    createdAt: ISODate("2023-02-13T13:21:24.348Z"),
    updatedAt: ISODate("2023-02-13T13:21:24.348Z"),
    __v: NumberInt("0")
} ]);
db.getCollection("user_tokens").insert([ {
    _id: ObjectId("63ea5660a1d30a95d0dd66bc"),
    name: "tannguyen login at 1676301920",
    description: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36",
    deleted: NumberInt("0"),
    status: NumberInt("0"),
    tokenHash: "7026e21b5d8aed17fcbac6fc77edff1de4b583c634f23114b521e35caed5a795",
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZThmZTQxZDQyZDc2MDVlMTk5ZjA4NCIsIm5hbWUiOiJUw6JuIE5ndXnhu4VuIiwidXNlcm5hbWUiOiJ0YW5uZ3V5ZW4iLCJlbWFpbCI6InRyb25ndGFuLm5ndXllbjk1QGdtYWlsLmNvbSIsImF2YXJ0YXIiOiJOL0EiLCJmdWxsTmFtZSI6IlTDom4gTmd1eeG7hW4iLCJpc0FkbWluaXN0cmF0b3IiOjAsImlhdCI6MTY3NjMwMTkyMCwiZXhwIjoxNjc2Mzg4MzIwfQ.IqfIXqFzo_wwXosNANj1Pxpl3th7S-bRrv63k48cKY4",
    iat: NumberInt("1676301920"),
    exp: NumberInt("1676388320"),
    ip: "::1",
    agentInfo: {
        ua: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36",
        browser: {
            name: "Chrome",
            version: "109.0.0.0",
            major: "109"
        },
        engine: {
            name: "Blink",
            version: "109.0.0.0"
        },
        os: {
            name: "Windows",
            version: "10"
        },
        cpu: {
            architecture: "amd64"
        }
    },
    created: ObjectId("63e8fe41d42d7605e199f084"),
    modified: ObjectId("63e8fe41d42d7605e199f084"),
    createdAt: ISODate("2023-02-13T15:25:20.786Z"),
    updatedAt: ISODate("2023-02-13T15:25:20.786Z"),
    __v: NumberInt("0")
} ]);
db.getCollection("user_tokens").insert([ {
    _id: ObjectId("63ea6a3abdea6b893caaf1f0"),
    name: "test1 login at 1676307002",
    description: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36",
    deleted: NumberInt("0"),
    status: NumberInt("0"),
    tokenHash: "4a3abb0638ef0d20c832954f4082dcb4e4af1beff3ca948ee97b8fb68e38fa55",
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZWE2YTNhYmRlYTZiODkzY2FhZjFlZSIsIm5hbWUiOiJUZXN0IFVzZXIgMSIsInVzZXJuYW1lIjoidGVzdDEiLCJlbWFpbCI6Ik4vQSIsImF2YXJ0YXIiOiJOL0EiLCJmdWxsTmFtZSI6IlRlc3QgVXNlciAxIiwiaXNBZG1pbmlzdHJhdG9yIjowLCJpYXQiOjE2NzYzMDcwMDIsImV4cCI6MTY3NjM5MzQwMn0.I9hoQk3K6PyFg0m75P8FKQYWVZuvyozudnWrz5hdSkA",
    iat: NumberInt("1676307002"),
    exp: NumberInt("1676393402"),
    ip: "::1",
    agentInfo: {
        ua: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36",
        browser: {
            name: "Chrome",
            version: "109.0.0.0",
            major: "109"
        },
        engine: {
            name: "Blink",
            version: "109.0.0.0"
        },
        os: {
            name: "Windows",
            version: "10"
        },
        cpu: {
            architecture: "amd64"
        }
    },
    created: ObjectId("63ea6a3abdea6b893caaf1ee"),
    modified: ObjectId("63ea6a3abdea6b893caaf1ee"),
    createdAt: ISODate("2023-02-13T16:50:02.756Z"),
    updatedAt: ISODate("2023-02-13T16:50:02.756Z"),
    __v: NumberInt("0")
} ]);

// ----------------------------
// Collection structure for users
// ----------------------------
db.getCollection("users").drop();
db.createCollection("users");
db.getCollection("users").createIndex({
    username: NumberInt("1")
}, {
    name: "username_1",
    background: true,
    unique: true
});

// ----------------------------
// Documents of users
// ----------------------------
db.getCollection("users").insert([ {
    _id: ObjectId("63e799c3ae6491b53e40a023"),
    username: "normaluser",
    __v: NumberInt("0"),
    createdAt: ISODate("2023-02-11T13:36:03.945Z"),
    deleted: NumberInt("0"),
    description: "",
    email: "normaluser@normaluser.com",
    isAdministrator: NumberInt("0"),
    name: "",
    password: "$2b$10$7nvMTEUE6Absj0uywc2Q0OMxkvu9SzcVmChRGCp5.nM5//VJZNU7.",
    phone: "0962548587",
    status: NumberInt("1"),
    updatedAt: ISODate("2023-02-11T13:36:03.945Z")
} ]);
db.getCollection("users").insert([ {
    _id: ObjectId("63e799c4ae6491b53e40a025"),
    username: "administrator",
    __v: NumberInt("0"),
    createdAt: ISODate("2023-02-11T13:36:04.005Z"),
    deleted: NumberInt("0"),
    description: "",
    email: "system@system.com",
    isAdministrator: NumberInt("1"),
    name: "",
    password: "$2b$10$xvCceUWwaHkroNdLkAisAOlSG/7xQ7cza7Yvld5sxs0G/C8byOlKO",
    phone: "0962548587",
    status: NumberInt("1"),
    updatedAt: ISODate("2023-02-11T13:36:04.005Z")
} ]);
db.getCollection("users").insert([ {
    _id: ObjectId("63e8fe41d42d7605e199f084"),
    name: "Tân Nguyễn",
    description: "",
    deleted: NumberInt("0"),
    status: NumberInt("1"),
    username: "tannguyen",
    password: "$2b$10$XlMvh5t3Scgojq1whUXDSu33gewiL/3h2PwDPr.qVWj/.HHMr3Igm",
    phone: "0962936465",
    email: "trongtan.nguyen95@gmail.com",
    address: "510 Kinh Duong Vuong",
    isAdministrator: NumberInt("0"),
    createdAt: ISODate("2023-02-12T14:57:05.637Z"),
    updatedAt: ISODate("2023-02-12T14:57:05.637Z"),
    __v: NumberInt("0")
} ]);
