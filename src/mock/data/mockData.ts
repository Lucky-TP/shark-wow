import { ShowProject } from "src/interfaces/models/common";
export const productList: ShowProject[] = [
    {
        projectId: "1",
        name: "hum yai",
        images: ["./nuk.jpg"],
        description: "pom chob hee",
        stages: [{
            currentFunding: 5000,
            goalFunding: 10000
        }]
    },
    {
        projectId: "2",
        name: "hum lek",
        images: ["./assets/shark.png"],
        description: "pom gead hee",
        stages: [{
            currentFunding: 2000,
            goalFunding: 10000
        }]
    },
    {
        projectId: "3",
        name: "hum noy",
        images: ["./shark2.jpg"],
        description: "pom doo hee",
        stages: [{
            currentFunding: 9000,
            goalFunding: 10000
        }]
    },
    {
        projectId: "3",
        name: "hum big",
        images: ["./heart.png"],
        description: "pom doo hee",
        stages: [{
            currentFunding: 7000,
            goalFunding: 10000
        }]
    },

    
    // Add more products as needed
  ];