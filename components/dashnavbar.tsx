import {useState, useEffect} from 'react'
import { LogOutIcon, Menu } from "lucide-react"
import { Button } from "./ui/button"
import MobileSidebar from "./dashmobilesidebar"
import Link from 'next/link'





export const DashNavbar = () => {


  
  return (
    <div className="flex items-center p-4">
        <MobileSidebar />

        <div className="flex w-full justify-end pr-2">

         {/* <ProfileAvatar /> */}
         
         
        </div>
    </div>
  )
}

