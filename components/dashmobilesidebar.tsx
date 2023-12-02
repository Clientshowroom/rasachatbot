"use client"

import {useState, useEffect} from 'react'
import { Menu} from "lucide-react"
import { Button } from "./ui/button"
import Sidebar from "./dashsidebar"
import { SheetContent, Sheet, SheetTrigger } from "./ui/sheet"
import DashSidebar from './dashsidebar'


const MobileSidebar = () => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(()=>{
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <div>
      <Sheet>
        <SheetTrigger>
         <Button variant='ghost' size='icon' className="md:hidden">
            <Menu />
        </Button>
        </SheetTrigger>
        <SheetContent side='left' className="h-full p-0 bg-black">
          <DashSidebar />
        </SheetContent>
        </Sheet>
    </div>
  )
}

export default MobileSidebar