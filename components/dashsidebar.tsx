"use client";

import Link from "next/link";
import Image from 'next/image'
import { Montserrat} from "next/font/google";
import { cn } from "@/lib/utils";
import { BotIcon, Code, CodeIcon, CpuIcon, EyeIcon, HomeIcon, ImageIcon, LayoutDashboard, LogOutIcon, MenuIcon, MessageSquare, Music2Icon, Settings, VideoIcon, ZapIcon } from "lucide-react";
import {usePathname} from 'next/navigation'





const montserrat = Montserrat({
    weight: "600",
    subsets:["latin"]
})

const routes = [

  {
    label: "Home",
    icon: HomeIcon,
    href: "/",
    color: "text-grey-500"
    },
  {
  label: "Dashboard",
  icon: LayoutDashboard,
  href: "/dashboard",
  color: "text-grey-500"
  },
  {
    label: "Chatbot",
    icon: MessageSquare,
    href: "/chatbot",
    color: "text-grey-500"
    },
 
    {
      label: "Training",
      icon: EyeIcon,
      href: "/training",
      color: "text-grey-500"
      },

      {
        label: "Rules",
        icon: CpuIcon,
        href: "/rules",
        color: "text-grey-500"
        },
        {
          label: "Response",
          icon: ZapIcon,
          href: "/response",
          color: "text-grey-500"
          },
          {
            label: "Intent",
            icon: BotIcon,
            href: "/intent",
            color: "text-grey-500"
            },
            {
              label: "Story",
              icon: MessageSquare,
              href: "/story",
              color: "text-grey-500"
              },

          {
            label: "Settings",
            icon: Settings,
            href: "/settings",
            
            }
          

]


const DashSidebar = () => {
  const pathname = usePathname()
  return (
    <div className="h-full space-y-4 py-4 flex flex-col 
      text-white">
     
     <div className="px-3 py-2 flex-1">
        <Link href="/" className="flex items-center 
        pl-3 mb-14">
        {/* <div className="relative w-12 h-8 mr-4">
         <Image
         fill
         alt="logo"
         src="/logo.png"
          />
        </div> */}

          <h1 className={cn("text-2xl font-bold", montserrat.className)}>Ellumen®</h1>
        </Link>

        <div className="space-y-1">
         {routes.map((route, index)=>(
         <Link
          href = {route.href}
          key={index}
          className={cn(`text-sm group flex flex-1 p-3 w-full justify-start
          font-medium cursor-pointer hover:text-white hover:bg-white/10
          rounded-lg transition
          `, 
          pathname === route.href ? "text-white bg-white/10": "text-zinc-400" 
          )}
          >
            <div className="flex items-center flex-1">
             <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
             {route.label}
            </div>
         </Link>
         ))}

        
{/* 
         <a href=''>
          <div className="flex flex-1 gap-3 pl-3 py-2 mt-3">
          <LogOutIcon />
          <p>Logout</p>
          </div>
        </a> */}

        </div>
        
        
        
     </div>
    </div>
  )
}

export default DashSidebar