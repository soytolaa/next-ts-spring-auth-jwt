import { headerToken } from "@/app/api/headerToken";
import { User } from "@/types/auth";
import { ApiResponse } from "@/types/next-auth";
import { ProjectRequest, ProjectResponse } from "@/types/project";
import { revalidateTag } from "next/cache";

export async function createProjectService(data: ProjectRequest): Promise<ApiResponse<ProjectResponse>> {
  const { headers } = await headerToken(false);
  const response = await fetch(`${process.env.API_URL}/projects/create`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ ...data }),
  });
  revalidateTag("projects");
  return response.json() as Promise<ApiResponse<ProjectResponse>>;
}

export async function getProjectsService(): Promise<ApiResponse<ProjectResponse[]>> {
  const { headers } = await headerToken(false);
  const response = await fetch(`${process.env.API_URL}/projects`, {
    method: "GET",
    headers: headers,
  });
  return response.json() as Promise<ApiResponse<ProjectResponse[]>>;
}

export async function getUserInProjectService(id: number): Promise<ApiResponse<User[]>> { 
  const { headers } = await headerToken(false);
  const response = await fetch(`${process.env.API_URL}/projects/${id}/project-users`, {
    method: "GET",
    headers: headers,
  });
  return response.json() as Promise<ApiResponse<User[]>>;
}

export async function joinProjectService(code: string): Promise<ApiResponse<boolean>> {
  const { headers } = await headerToken(false);
  const response = await fetch(`${process.env.API_URL}/projects/code?code=${code}`, {
    method: "POST",
    headers: headers,
  });
  return response.json() as Promise<ApiResponse<boolean>>;
}