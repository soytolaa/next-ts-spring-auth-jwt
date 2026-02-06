import { headerToken } from "@/app/api/headerToken";
import { User } from "@/types/auth";
import { ApiResponse } from "@/types/next-auth";
import { ProjectRequest, ProjectResponse } from "@/types/project";

export async function createProjectService(data: ProjectRequest): Promise<ApiResponse<ProjectResponse>> {
  const { headers } = await headerToken(true);
  const response = await fetch(`${process.env.API_URL}/projects/create`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ ...data }),
  });
  console.log("Create Project Service Response", JSON.stringify(data));
  return response.json() as Promise<ApiResponse<ProjectResponse>>;
}

export async function getProjectsService(): Promise<ApiResponse<ProjectResponse[]>> {
  const { headers } = await headerToken(true);
  const response = await fetch(`${process.env.API_URL}/projects`, {
    method: "GET",
    headers: headers,
  });
  return response.json() as Promise<ApiResponse<ProjectResponse[]>>;
}

export async function getUserInProjectService(id: number): Promise<ApiResponse<User[]>> { 
  const { headers } = await headerToken(true);
  const response = await fetch(`${process.env.API_URL}/projects/${id}/project-users`, {
    method: "GET",
    headers: headers,
  });
  return response.json() as Promise<ApiResponse<User[]>>;
}

export async function joinProjectService(code: string): Promise<ApiResponse<boolean>> {
  const { headers } = await headerToken(true);
  const response = await fetch(`${process.env.API_URL}/projects/code?code=${code}`, {
    method: "POST",
    headers: headers,
  });
  return response.json() as Promise<ApiResponse<boolean>>;
}

export async function updateProjectService(id: number, data: ProjectRequest): Promise<ApiResponse<ProjectResponse>> {
  const { headers } = await headerToken(true);
  const response = await fetch(`${process.env.API_URL}/projects/${id}`, {
    method: "PUT",
    headers: headers,
    body: JSON.stringify(data),
  });
  return response.json() as Promise<ApiResponse<ProjectResponse>>;
}

export async function deleteProjectService(id: number): Promise<ApiResponse<boolean>> {
  const { headers } = await headerToken(true);
  const response = await fetch(`${process.env.API_URL}/projects/${id}`, {
    method: "DELETE",
    headers: headers,
  });
  return response.json() as Promise<ApiResponse<boolean>>;
}


export async function activeDeactiveProjectService(id: number,isActive: boolean): Promise<ApiResponse<boolean>> {
  const { headers } = await headerToken(true);
  const response = await fetch(`${process.env.API_URL}/projects/${id}/active-deactive`, {
    method: "PUT",
    headers: headers,
    body: JSON.stringify({ isActive }),
  });
  return response.json() as Promise<ApiResponse<boolean>>;
}