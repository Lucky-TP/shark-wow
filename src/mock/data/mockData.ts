import { ShowProject } from "src/interfaces/models/common";
export const productList: ShowProject[] = [
    {
        projectId: "1",
        name: "hum yai",
        carouselImageUrls: ["./nuk.jpg"],
        description: "pom chob hee",
        stages: [{
            minimumFunding: 20,
            currentFunding: 5000,
            goalFunding: 10000
        }],
        category:"Food"
    },
    {
        projectId: "2",
        name: "hum lek",
        carouselImageUrls: ["./assets/shark.png"],
        description: "pom gead hee",
        stages: [{
            minimumFunding: 5,
            currentFunding: 2000,
            goalFunding: 10000
        }],
        category:"Food"
    },
    {
        projectId: "3",
        name: "hum noy",
        carouselImageUrls: ["./shark2.jpg"],
        description: "pom doo hee",
        stages: [{
            minimumFunding: 15,
            currentFunding: 9000,
            goalFunding: 10000
        }],
        category:"Technology"
    },
    {
        projectId: "4",
        name: "hum big",
        carouselImageUrls: ["./heart.png"],
        description: "pom doo hee",
        stages: [{
            minimumFunding: 10,
            currentFunding: 7000,
            goalFunding: 10000
        }],
        category:"Technology"
    },

    
    // Add more products as needed
  ];