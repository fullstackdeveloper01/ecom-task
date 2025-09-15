export const products = [
    {
        id: 1,
        name: "Wireless Headphones",
        price: 2999,
        image: "https://placehold.co/300x300?text=Headphones",
        description: "High-quality wireless headphones with noise cancellation",
        category: "Electronics"
    },
    {
        id: 2,
        name: "Smart Watch",
        price: 19999,
        image: "https://placehold.co/300x300?text=Smart+Watch",
        description: "Feature-rich smartwatch with health monitoring",
        category: "Electronics"
    },
    {
        id: 3,
        name: "Coffee Maker",
        price: 8999,
        image: "https://placehold.co/300x300?text=Coffee+Maker",
        description: "Automatic coffee maker with timer",
        category: "Home"
    },
    {
        id: 4,
        name: "Running Shoes",
        price: 12999,
        image: "https://placehold.co/300x300?text=Running+Shoes",
        description: "Comfortable running shoes for athletes",
        category: "Sports"
    },
    {
        id: 5,
        name: "Laptop Backpack",
        price: 4999,
        image: "https://placehold.co/300x300?text=Backpack",
        description: "Durable laptop backpack with multiple compartments",
        category: "Accessories"
    },
    {
        id: 6,
        name: "Bluetooth Speaker",
        price: 3999,
        image: "https://placehold.co/300x300?text=Speaker",
        description: "Portable Bluetooth speaker with great sound",
        category: "Electronics"
    },
    {
        id: 7,
        name: "Yoga Mat",
        price: 2999,
        image: "https://placehold.co/300x300?text=Yoga+Mat",
        description: "Non-slip yoga mat for comfortable practice",
        category: "Sports"
    },
    {
        id: 8,
        name: "Desk Lamp",
        price: 2499,
        image: "https://placehold.co/300x300?text=Desk+Lamp",
        description: "LED desk lamp with adjustable brightness",
        category: "Home"
    },
    {
        id: 9,
        name: "Water Bottle",
        price: 1499,
        image: "https://placehold.co/300x300?text=Water+Bottle",
        description: "Insulated water bottle keeps drinks cold for 24 hours",
        category: "Accessories"
    },
    {
        id: 10,
        name: "Wireless Mouse",
        price: 1999,
        image: "https://placehold.co/300x300?text=Mouse",
        description: "Ergonomic wireless mouse for comfortable use",
        category: "Electronics"
    },
    {
        id: 11,
        name: "Phone Case",
        price: 999,
        image: "https://placehold.co/300x300?text=Phone+Case",
        description: "Protective phone case with stylish design",
        category: "Accessories"
    },
    {
        id: 12,
        name: "Book Stand",
        price: 1799,
        image: "https://placehold.co/300x300?text=Book+Stand",
        description: "Adjustable book stand for comfortable reading",
        category: "Home"
    }
];

export const formatPrice = (price) => {
    return new Intl.NumberFormat("ja-JP", {
        style: "currency",
        currency: "JPY"
    }).format(price);
};
