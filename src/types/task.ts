
import { Priority, Status } from "./enums/Status";
import { LocalDate, LocalDateTime } from "@js-joda/core";
export interface TaskRequest {
  name: string;
  description: string;
  status: Status;
  priorityStatus: Priority;
  projectId: number;
  assignees: number [];
  assignedAt?: string;
  dueAt?: string;
}

export interface TaskResponse {
  id: number;
  name: string;
  description: string;
  status: Status;
  priorityStatus: Priority;
  projectId: number;
  assignees: number[];
  assignedAt?: LocalDate;
  dueAt?: LocalDate;
  createdAt: LocalDateTime;
  updatedAt: LocalDateTime;
}