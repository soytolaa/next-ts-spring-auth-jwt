import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Box, Calendar, Edit, EllipsisVertical, FileText, Heart, Plus, Star, Trash, Users2 } from "lucide-react";
import Link from "next/link";
import ButtonCreate from "./(_components)/button-create";
import { getProjectsAction } from "@/action/projectAction";
import { Button } from "@/components/ui/button";
// const projects = [
//   {
//     id: 1,
//     title: "Next JS",
//     description: "Next JS is a framework for building server-side applications with React.",
//     icon: <Box />,
//   },

//     {
//     id: 2,
//     title: "React JS",
//     description: "React JS is a library for building user interfaces with React.",
//     icon: <Calendar />,
//   },
//   {
//     id: 3,
//     title: "Spring Boot",
//     description: "Spring Boot is a framework for building server-side applications with Java.",
//     icon: <FileText />,
//   },
//   {
//     id: 4,
//     title: "Java",
//     description: "Java is a programming language for building server-side applications with Java.",
//     icon: <Users2 />,
//   },
//   {
//     id: 5,
//     title: "Python",
//     description: "Python is a programming language for building server-side applications with Python.",
//     icon: <Users2 />,
//   },
//   {
//     id: 6,
//     title: "C#",
//     description: "C# is a programming language for building server-side applications with C#.",
//     icon: <Users2 />,
//   },
//   {
//     id: 7,
//     title: "PHP",
//     description: "PHP is a programming language for building server-side applications with PHP.",
//     icon: <Users2 />,
//   },
//   {
//     id: 8,
//     title: "Ruby",
//     description: "Ruby is a programming language for building server-side applications with Ruby.",
//     icon: <Users2 />,
//   },
//   {
//     id: 9,
//     title: "Go",
//     description: "Go is a programming language for building server-side applications with Go.",
//     icon: <Users2 />,
//   },
//   {
//     id: 10,
//     title: "Kotlin",
//     description: "Kotlin is a programming language for building server-side applications with Kotlin.",
//     icon: <Users2 />,
//   },
//   {
//     id: 11,
//     title: "Swift",
//     description: "Swift is a programming language for building server-side applications with Swift.",
//     icon: <Users2 />,
//   },
//   {
//     id: 12,
//     title: "Rust",
//     description: "Rust is a programming language for building server-side applications with Rust.",
//     icon: <Users2 />,
//   },
//   {
//     id: 13,
//     title: "TypeScript",
//     description: "TypeScript is a programming language for building server-side applications with TypeScript.",
//     icon: <Users2 />,
//   },
//   {
//     id: 14,
//     title: "JavaScript",
//     description: "JavaScript is a programming language for building server-side applications with JavaScript.",
//     icon: <Users2 />,
//   },
//   {
//     id: 15,
//     title: "HTML",
//     description: "HTML is a programming language for building server-side applications with HTML.",
//     icon: <Users2 />,
//   },
//   {
//     id: 16,
//     title: "CSS",
//     description: "CSS is a programming language for building server-side applications with CSS.",
//     icon: <Users2 />,
//   },
//   {
//     id: 17,
//     title: "SQL",
//     description: "SQL is a programming language for building server-side applications with SQL.",
//     icon: <Users2 />,
//   },
// ]

export default async function ProjectPage() {
  const projects = await getProjectsAction();
  return (
    <div className="px-10 pt-2">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">My Projects</h1>
        <ButtonCreate />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
        {projects.payload.map((project) => (
          <Link href={`/p/${project.id}?proNm=${project.name}`} key={project.id} >
          <Card key={project.id}  className="w-full shadow-lg hover:shadow-xl transition-shadow duration-300 ">
          <CardHeader>
            <CardTitle>
              <div className="flex justify-between items-center">
                {/* This button add favorite project */}
                <Button variant="ghost" size="icon">
                  <Heart />
                </Button>
                {/* Icon ... to disable update and delete */}
                <div className="flex items-center justify-end">
                  <Button variant="ghost" size="icon">
                    <EllipsisVertical /> 
                  </Button>
                </div>
              </div>
            </CardTitle>
            <CardContent>
              <p className=" text-muted-foreground font-bold text-2xl w-full truncate">{project.name}</p>
              <p className="text-sm text-muted-foreground w-full truncate">{project.description}</p>
            </CardContent>
          </CardHeader>
          <CardFooter>
            <div className="flex justify-between items-center gap-2">
              <div className="flex items-center gap-2">
                <p className="text-sm text-muted-foreground">Members</p>
                <p className="text-sm text-muted-foreground">{project.createdBy}</p>
              </div>
            </div>
          </CardFooter>
          </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}