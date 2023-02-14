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


