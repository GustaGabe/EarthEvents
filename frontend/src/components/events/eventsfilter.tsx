import { Search } from "lucide-react"
import { Input } from "../ui/input"

export const EventsFilter = () => {
    return (
        <div className="space-y-4 mt-8">
           <div className="flex flex-col sm:flex-row gap-3">  
           <form className="relative flex-1">
            <Search className="absolute top-2.5 left-2.5 h-4 w-4" />
            <Input type="search" placeholder="Procure eventos..." className="pl-8" />
           </form>
           </div>
        </div>
    )
}