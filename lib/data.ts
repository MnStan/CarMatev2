// export interface Announcement {
//     id: string;
//     title: string;
//     desc: string;
// }

// export interface AxiomAnnouncements {
//     announcements: Announcement[];
//   }

// let announcements: Announcement[] = [
//     {
//         id: "34d0a0c7-ba0c-445d-b771-54ce4a03b1b5",
//         title: "Opel Corsa",
//         desc: "Samochód Opel Corsa",
//       },
//       {
//         id: "703d4cca-a4c9-499f-bd20-2d687da67b9b",
//         title: "Ford Focus",
//         desc: "Samochód Ford Focus",
//       },
//       {
//         id: "60a5b006-9dbb-4210-8ae9-b277411ace0b",
//         title: "Toyota Corolla",
//         desc: "Samochód Toyota Corolla",
//       },
// ]; 

// export const getAnnouncments = () => announcements;

// export const getAnnouncementById = (id: String) => {
//     return announcements.find((announcement) => announcement.id === id);
// };

export interface User {
  id: String
  email: String
}

let users: User[]

export interface AxiomUsers {
  users: User[];
}