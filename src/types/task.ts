import { Priority, Status } from "./enums/Status";
import { LocalDateTime } from "@js-joda/core";
export interface TaskRequest {
  name: string;
  description: string;
  status: Status;
  priorityStatus: Priority;
  projectId: number;
  assignees: number[];
  assignedAt?: LocalDateTime;
  dueAt?: LocalDateTime;
}

export interface TaskResponse {
  id: number;
  name: string;
  description: string;
  status: Status;
  priorityStatus: Priority;
  projectId: number;
  assignees: number[];
  assignedAt?: LocalDateTime;
  dueAt?: LocalDateTime;
  createdAt: LocalDateTime;
  updatedAt: LocalDateTime;
}