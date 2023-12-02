
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"
import { string } from "zod"

export const UserAvatar = ()=>{
    
 
    return (
        
            <Avatar className="h-12 w-12" >
                <AvatarImage src='/avatar-1968236_1280.png' />
              
                <AvatarFallback>
                  You
                </AvatarFallback>
            </Avatar>
    )
}