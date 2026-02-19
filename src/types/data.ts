/* Shared types for the TRILOBIT data layer */

export interface CalEvent {
  id: string;
  title: string;
  date: string; // "YYYY-MM-DD" format for localStorage serialization
  time: string;
  duration: string;
  location: string;
  description: string;
  type: "regular" | "expedition" | "special";
  spotsLeft?: number;
  poster?: string | null;
  attendees?: { name: string; avatar: string }[];
  photoAlbumUrl?: string;
}

export interface Child {
  id: string;
  name: string;
  age: number;
  programId: string; // references Program.id
  programName: string; // denormalized for quick display
  since: string; // e.g. "Září 2025"
  avatar: string; // single letter
  note: string;
}

export interface Program {
  id: string;
  name: string;
  age: string;
  type: string;
  season: string;
  description: string;
  location: string;
  frequency: string;
  duration: string;
  whatKidsDo: string[];
  forParents: string[];
  detail: {
    schedule: string;
    leader: string;
    maxKids: number;
    price: string;
    whatToBring: string[];
    typicalDay: string;
    goals: string[];
  };
}
