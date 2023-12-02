"use client"
import {useState, useEffect} from 'react'
import * as z from 'zod'
import {Heading} from '@/components/heading'
import {  MessageSquare } from 'lucide-react'
import {  useForm } from '@/node_modules/react-hook-form/dist'
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




const ChatbotPage = () => {
    const [messages, setMessages] = useState<Array<{role: string; content: string}>>([])
    

    const router = useRouter()
    const form = useForm <z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            payload: ""
        }
    })

    const isLoading = form.formState.isSubmitting
    const onSubmit = async (values: z.infer<typeof formSchema>)=>{
        console.log(values)

        try {
         
         const userMessage = {
            role: "user",
            content: values.payload
         }

        
         const newMessages = [...messages, userMessage]
         setMessages(newMessages)
         const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
         const API_URL = `${BASE_URL}/solaritchatbot/`
         await fetch(API_URL, {
            mode: 'cors',
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({payload: values.payload})
            
         })
         .then((res)=>{
           if (!res) throw new Error("No response from server")
           return res.json()
         })
         .then((data)=>{
            console.log(data.message)

            if(data) {
            const botMessage = {
                role: "Bot",
                content: ""
            }

            
            botMessage.content = data.message
            newMessages.push(botMessage)
        }
            setMessages(newMessages)
        
            form.reset()
         })


        }catch (error: any) {
            console.log(error)
        } finally {
            router.refresh()
        }
    }
  return (
    <div>
        <Heading
        title='SOLARIT® Chatbot'
        description = 'This is a good place to learn about our serivices and our Solar products'
        icon={MessageSquare}
        iconColor='text-violet-500'
        bgColor='bg-violet-500/10'
         />

         <div className='px-4 lg:px-8'>
          <div>
            <Form {...form}>
             <form onSubmit={form.handleSubmit(onSubmit)}
             className='
             rounded-lg border w-full p-4 px-3 md:px-6 
             focus-within:shadow-sm grid grid-cols-12 gap-2
             '
             >
                <FormField 
                name="payload"
                render={({ field })=>(
                
               <FormItem className="col-span-12 lg:col-span-10">
               <FormControl className='M-0 P-0'>
              <Input className='border-0 outline-none 
              focus=visible:ring-transparent
              focus-visible:ring-0'
              disabled={isLoading}
              placeholder='How can I get a Solar qoute?'
              {...field}
               />
               </FormControl>
               </FormItem>
               )}
               />
               <Button className='col-span-12 lg:col-span-2 w-full bg-blue-600' disabled={isLoading}>
                Chat
               </Button>
             </form>
            </Form>
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
                <div className='text-md'>
                    <Empty label="No conversation started" />
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

export default ChatbotPage