import { ScrollArea } from "@/components/ui/scroll-area";
import { User } from "@/types/auth";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export default function ContributorComponent({ users }: { users: User[] | undefined }) {
    return (
       <div className="w-[30%] h-full max-w-[30%] min-w-[30%] flex flex-col rounded-lg border shadow-sm overflow-hidden">
          <div className="p-4 border-b shrink-0">
            <h2 className="text-l ">Contributors</h2>
          </div>
          <ScrollArea className="flex-1 min-h-0 p-4 scroll-area-hide-scrollbar">
            <div className="flex flex-col gap-2">
              {users?.map((user) => (
                <Card key={user.userId} className="flex flex-col gap-2 w-full rounded-lg p-2">
                  <CardHeader className="pl-2 rounded flex flex-col justify-between">
                    <div className="flex items-center justify-between gap-2">
                      <Avatar>
                        <AvatarImage src={"https://github.com/shadcn.png"} />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <div className="w-32">
                        <CardTitle className="text-sm font-normal">{user.userName}</CardTitle>
                        <CardDescription className="text-xs text-muted-foreground truncate">{user.email}</CardDescription>
                      </div>
                      <div className="flex items-center gap-2 px-2 py-1" >
                      <Badge variant="outline" className="text-xs font-normal">
                        {user.role}
                      </Badge>
                    </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </div>
    )
}