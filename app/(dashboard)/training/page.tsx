"use client"
import {useState, useEffect} from 'react'
import * as z from 'zod'
import {Heading} from '@/components/heading'
import {  MessageSquare } from 'lucide-react'
import {  useForm } from 'react-hook-form'
import { formSchema } from './constants'
import {zodResolver} from '@hookform/resolvers/zod'
import {Form, FormControl, FormField, FormItem} from '@/components/ui/form'
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'
import {useRouter} from 'next/navigation'
import {Empty} from '@/components/empty'
import {Loader} from '@/components/loader'
import { cn } from '@/lib/utils'
import { UserAvatar } from '@/components/user-avater'
import { BotAvatar } from '@/components/BotAvatar'




const ConversationPage = () => {
    const [messages, setMessages] = useState<Array<{role: string; content: string}>>([])
    const [message, setMessage] = useState<string>('')
    const [isLoading, setIsLoading] = useState(false)
    const conversationId = "user123"
    const sender = 'mark'

    const router = useRouter()
    // const form = useForm <z.infer<typeof formSchema>>({
    //     resolver: zodResolver(formSchema),
    //     defaultValues: {
    //         message: ""
    //     }
    // })

    const loading = 'loading...'
    const handleSubmit = async (e: any)=>{
    

        try {
         
         e.preventDefault()
         setIsLoading(true)
         const userMessage = {
            role: "user",
            content: message
         }

         const rasapayload = {
            sender,
            message: message
         }
         const newMessages: any = [...messages, userMessage]
         setMessages(newMessages)
         const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
         const API_URL = `${BASE_URL}/webhooks/rest/webhook`
         await fetch(API_URL, {
            mode: 'cors',
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(rasapayload)
            
         })
         .then((res)=>{
           if (!res) throw new Error("No response from server")
           return res.json()
         })
         .then((data)=>{
            

            if(data) {
            console.log(data)
            setMessage("")
            setIsLoading(false)
            const botMessage = {
                role: "Bot",
                content: ""
            }

            const botResponse = data.map((response: any)=>{
                return response.text
            })
            botMessage.content = botResponse
            newMessages.push(botMessage)
        }
            setMessages(newMessages)
            
        
             
         })


        }catch (error) {
            if (error instanceof TypeError && error.message === "Failed to fetch") {
                console.log("Network error. Check your internet connection.");
            } else {
                console.error("Unexpected error:", error);
            }
        } finally {
            setIsLoading(false)
            router.refresh()
        }
    }
  return (
    <div>
        <Heading
        title='Ellenum Chatbot'
        description = 'Ask me anything about Ellenum'
        icon={MessageSquare}
        iconColor='text-violet-500'
        bgColor='bg-violet-500/10'
         />

         <div className='px-4 lg:px-8'>
          <div>
            
             <form onSubmit={handleSubmit}
             className='
             rounded-lg border w-full p-4 px-3 md:px-6 
             focus-within:shadow-sm flex flex-col flex-1 gap-2
             '>
             
                
             <Input
             name='message'
             value={message}
             onChange={(e)=>setMessage(e.target.value)}
             className='border border-blue outline-none 
              focus=visible:ring-transparent
              focus-visible:ring-0 w-auto md:w-96 h-24'
              />
               <Button className='col-span-12 lg:col-span-2 w-full'>
                Chat
               </Button>
             </form>
            
          </div>

          {/* Chat Messages */}
          <div className='space-y-4 mt-4'>
            {isLoading && (
                <div className='p-8 rounded-lg w-full flex items-center
                justify-center bg-muted'>
                <Loader />
                </div>
            )}
            {messages.length == 0 && !isLoading && (
                <div>
                    <Empty label="No conversation started with Ellumen Bot" />
                </div>
            )}
           <div className='flex flex-col-reverse gap-y-4'>
            {messages.map((message, index)=>(
                <div
                 key={index}
                 className={cn('p-8 w-full flex items-start gap-x-8 rounded-lg',
                 message.role == "user" ? "bg-blue border border-blue/10" :
                 "bg-muted"
                 )}
    
                 >
                {message.role == 'user' ? <UserAvatar /> : <BotAvatar />}
                <p className='text-sm'>
                 {message.content}
                 </p>
                 
                </div>
            ))}
           </div>
          </div>

         </div>
    </div>
  )
}

export default ConversationPage