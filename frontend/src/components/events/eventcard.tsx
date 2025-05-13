
import { Calendar, Info, MapPin, Star } from "lucide-react"
import { Badge } from "../ui/badge"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"




export const EventCard = () => {


    return(
            <Card className="border  border-neutral-600 pt-0 mt-10 h-full flex max-w-md flex-col overflow-hidden transition-all hover:shadow-md">
                <CardHeader className="p-5  border-b bg-gradient-to-r from-orange-500/10 to-red-500/10 border-orange-600/20">
                    <CardTitle className="font-bold text-xl">rx-63 Wildfire, Burnett, Wisconsin</CardTitle>
                    <div className="mt-2 flex flex-row gap-3">
                        <Badge className="bg-neutral-800 px-3 rounded-full">Severe Storms</Badge>
                        <Badge variant="outline" className="bg-green-500/10 text-green-600 rounded-full" >Active</Badge>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="flex text-neutral-400 flex-col gap-2">
                        <div className="flex flex-row gap-2 items-center">
                            <MapPin />
                            <span>-9.00°, 137.90°</span>
                        </div>
                        <div className="flex flex-row gap-2 items-center">
                            <Calendar />
                            <span>May 11, 2025</span>
                        </div>
                        <div className="flex flex-row gap-2 items-center">
                            <Info />
                            Magnitude: 35 kts
                        </div>
                    </div>
                </CardContent>
                <CardFooter className=" border-t border-neutral-600">
                    <div className="flex flex-row gap-3 w-full">
                        <div className="w-full">
                            <Button className="bg-white text-black w-full">Detalhes</Button>
                        </div>
                        <div>
                            <Button className="border border-neutral-600"><Star className="hover:text-amber-300" /></Button>
                        </div>
                    </div>
                </CardFooter>
            </Card>
    )
}