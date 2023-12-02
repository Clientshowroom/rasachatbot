import { DashNavbar } from "@/components/dashnavbar"
import DashSidebar from "@/components/dashsidebar"


export const metadata = {
    title: 'Dashboard',
    description: 'Dashboard Page',
  }
  
  export default function DashboardLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
  
        <div>
          

          <div>
          <div className="h-full w-72 md:hidden">
          <DashNavbar />
          </div>
          
          
        <div className="bg-black  w-72 h-full fixed hidden md:flex 
         items-center">
                <DashSidebar />
            </div>
            </div>

            
            <main className="md:ml-72 flex flex-col justify-center items-center pt-16">
            {children}
            </main>
            

            </div>
            
         
    )
  }
  