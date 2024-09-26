// import { NextRequest, NextResponse } from "next/server";
// import { CollectionPath } from "src/constants/firestore";
// import { ProjectStatus, StageStatus } from "src/interfaces/models/enums";
// import { ProjectModel, Stage } from "src/interfaces/models/project";
// import { UserModel } from "src/interfaces/models/user";
// import { getCollectionRef, getDocRef } from "src/libs/databases/firestore/commons";
// import { updateProject } from "src/libs/databases/firestore/projects";
// import { getProjects } from "src/libs/databases/firestore/projects/getProjects";
// import { errorHandler } from "src/libs/errors/apiError";
// import { chunkArray } from "src/utils/api/queries";

// interface Data {
//     projectId: string;
// }

// const mockData: Partial<ProjectModel> = {
//     totalQuantity: 150,
//     costPerQuantity: 750,
//     stages: [
//         {
//             fundingCost: 0,
//             imageUrl: "",
//             name: "Concept",
//             currentFunding: 0,
//             expireDate: "2024-09-10T12:55:33.361Z",
//             detail: "<p>At this stage we try to build concept about the story </p>",
//             goalFunding: 1,
//             totalSupporter: 0,
//             startDate: "2024-09-10T12:55:33.361Z",
//             stageId: 0,
//             status: 2,
//         },
//         {
//             fundingCost: 0,
//             imageUrl: "",
//             name: "Prototype",
//             currentFunding: 0,
//             expireDate: "2024-09-10T12:55:33.361Z",
//             detail: '<p>This is the prototype so far.<a href="https://docs.google.com/document/d/18BqfqLDomANDd1cjSWNVMDgXeN7tkvj-nEhDEq1euDA/edit" rel="noopener noreferrer" target="_blank">prototype</a></p>',
//             goalFunding: 11250,
//             totalSupporter: 0,
//             startDate: "2024-09-10T12:55:33.361Z",
//             stageId: 1,
//             status: 1,
//         },
//         {
//             fundingCost: 0,
//             imageUrl: "",
//             name: "Production",
//             currentFunding: 0,
//             expireDate: "2024-09-10T12:55:33.361Z",
//             detail: "<p>we will finish the product and deliver the book to your hand</p>",
//             goalFunding: 11250,
//             totalSupporter: 0,
//             startDate: "2024-09-10T12:55:33.361Z",
//             stageId: 2,
//             status: 1,
//         },
//     ],
// };

// function assignRandomFundingCosts(stages: Stage[]) {
//     stages.forEach((stage) => {
//         // Generate a random funding cost as a percentage of the goal funding
//         const randomPercentage = Math.random() * 0.2; // Random value between 0 and 1
//         stage.fundingCost = parseFloat((randomPercentage * stage.goalFunding).toFixed(2)); // Funding cost rounded to two decimal places
//     });

//     return stages;
// }

// // export async function PUT(request: NextRequest) {
// //     try {
// //         const projectCollection = getCollectionRef("/projects");
// //         const querySnapshot = await projectCollection.select("projectId").get();
// //         const projectIds = querySnapshot.docs.map((snapshot) => {
// //             const data = snapshot.data() as Data;
// //             return data.projectId;
// //         });
// //         const chunks = chunkArray<string>(projectIds, 30);
// //         const projectModels: ProjectModel[] = [];
// //         for (const chunk of chunks) {
// //             projectModels.push(...(await getProjects(chunk)));
// //         }
// //         // const projectModels = await getProjects(["4osGMmfA4QCnIgktFEr6"]);
// //         // const stages = mockData.stages;
// //         // const totalCost = mockData.totalQuantity! * mockData.costPerQuantity!;
// //         // const updateStage = assignRandomFundingCosts(stages!);
// //         const promises = projectModels.map((projectModel) => {
// //             const stages = projectModel.stages;
// //             // const totalCost = projectModel.totalQuantity * projectModel.costPerQuantity;
// //             const updateStages = assignRandomFundingCosts(stages);
// //             return updateProject(projectModel.projectId, {
// //                 stages: updateStages,
// //             });
// //         });
// //         await Promise.all(promises);
// //         return NextResponse.json({ message: "Lucky" }, { status: 200 });
// //     } catch (error: unknown) {
// //         return errorHandler(error);
// //     }
// // }

// /**
//  * @swagger
//  * /api:
//  *   patch:
//  *     description: Update all users' roles to 'user'
//  *     responses:
//  *       200:
//  *         description: Successfully updated all users' roles to 'user'
//  *       401:
//  *         description: Unauthorized - Missing or invalid token
//  *       500:
//  *         description: Internal server error
//  */
// export async function PATCH() {
//     try {
//         const querySnapshot = await getCollectionRef(CollectionPath.USER).get();
//         await Promise.all(
//             querySnapshot.docs.map(async (docSnapshot) => {
//                 await docSnapshot.ref.update({ role: "user" });
//             })
//         );
//         return NextResponse.json(
//             { message: "Successfully updated all user roles to 'user'!" },
//             { status: 200 }
//         );
//     } catch (error: unknown) {
//         return errorHandler(error);
//     }
// }

// export async function DELETE(request: NextRequest) {
//     try {
//         const projectCollection = getCollectionRef(CollectionPath.PROJECT);
//         const querySnapshot = await projectCollection.get();
//         await Promise.all(
//             querySnapshot.docs.map(async (snapshot) => {
//                 const projectModel = snapshot.data() as ProjectModel;
//                 const currentStage = projectModel.stages.find(
//                     ({ status }) => status === StageStatus.CURRENT
//                 );
//                 if (!currentStage && projectModel.status === ProjectStatus.RUNNING) {
//                     const projectDocRef = getDocRef(CollectionPath.PROJECT, projectModel.projectId);
//                     await projectDocRef.delete();
//                 }
//             })
//         );

//         return NextResponse.json({ message: "Lucky delete" }, { status: 200 });
//     } catch (error: unknown) {
//         return errorHandler(error);
//     }
// }
