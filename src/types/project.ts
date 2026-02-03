import { User } from "./auth";

export interface ProjectRequest {
  name: string;
  description: string;
}

export interface ProjectResponse {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  createdBy: number;
  membersCount : number;
}