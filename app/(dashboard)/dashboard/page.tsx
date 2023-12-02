"use client"
import {useEffect, useState} from 'react'
import Image from 'next/image'
import { ArrowRight, BotIcon, Code, CodeIcon, CpuIcon, EyeIcon, ImageIcon, LayoutDashboard, MenuIcon, MessageSquare, MusicIcon, Settings, VideoIcon, ZapIcon } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import {useRouter} from 'next/navigation'





const routes = [

 
    {
      label: "Chatbot",
      icon: MessageSquare,
      href: "/chatbot",
      color: "text-blue-b00",
      bgColor: 'text-blue-600'
      },

      {
        label: "Training",
        icon: EyeIcon,
        href: "/training",
        color: "text-grey-500",
        bgColor: 'text-blue-600'
        },
  
        {
          label: "Rules",
          icon: CpuIcon,
          href: "/rules",
          color: "text-grey-500",
          bgColor: 'text-blue-600'
          },
          {
            label: "Response",
            icon: ZapIcon,
            href: "/response",
            color: "text-grey-500",
            bgColor: 'text-blue-600'
            },
            {
              label: "Intent",
              icon: BotIcon,
              href: "/intent",
              color: "text-grey-500",
              bgColor: 'text-blue-600'
              },
              {
                label: "Story",
                icon: MessageSquare,
                href: "/story",
                color: "text-grey-500",
                bgColor: 'text-blue-600'
                },
  
            {
              label: "Settings",
              icon: Settings,
              href: "/settings",
              
              }
            
          

]

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

  




const DashboardPage = ()=>{

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState(null)

 

  const router = useRouter()

  
  return (

    
    <div>
       <div className='mb-8 space-y-4'>
        <h2 className='text-2xl md:text-4xl font-bold text-center'>
        Ellumen® Dashboard
        </h2>

        {/* <p className='text-muted-foreground font-light text-sm md:text-lg text-center'>
        ZEITIOS® - Leading Machine Learning Products
        </p> */}
       </div>

       <div className='px-2  py-4'>
       {
        routes.map((tool, index)=>
          <Card 
          onClick={()=>router.push(tool.href)}
          key={index}
          className='p-3 border-black/5 flex items-center justify-between 
          hover:shadow-md gap-2
          transition cursor-pointer'
          >

            <div className='flex items-center gap-x-4'>

             <div className={cn(`w-p-2 w-fit rounded-md`, tool.bgColor)}>
              <tool.icon className={cn('w-8 h-8', tool.color)} />
             </div>

             <div className='font-semibold'>
              {tool.label}
             </div>

            </div>
            <ArrowRight className='w-5 h-5' />
          </Card>

          
        )
       }

             <div className='relative h-32 w-full mt-5'>
             <Image src='/speech-bubbles-303206.svg' alt='chat logo' fill />
            </div>
       </div>

    </div>
 
      
  )
}

export default DashboardPage
