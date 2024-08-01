import { Product } from "src/mock/types/product";

export const productList: Product[] = [
    {
        id: 1,
        title: "OggWay",
        description: "Shark with Turtle",
        creator: "Pich Super Idol",
        creatorImageUrl: "nuk.jpg",
        projectUrl: "https://i.ytimg.com/vi/wfbbWHzKaWw/maxresdefault.jpg",
        productImageUrl: "shark.png",
        daysLeft: 14,
        fundedPercentage: 69,
    },
    {
        id: 2,
        title: "NUK DEV",
        description: "This is description from Nuk",
        creator: "Nuk Company",
        creatorImageUrl: "nuk.jpg",
        projectUrl: "https://i.ytimg.com/vi/wfbbWHzKaWw/maxresdefault.jpg",
        productImageUrl: "shark2.jpg",
        daysLeft: 2,
        fundedPercentage: 100,
    },
    // Add more products as needed
  ];