import { EventCard } from "@/components/events/eventcard";
import { EventsFilter } from "@/components/events/eventsfilter";

export default function EventsPage() {
    return(
        <div className="container mx-auto px-4 py-8">
            <div className="text-left">
                <h1 className="text-4xl font-bold">Eventos naturais</h1>
                <p className="max-w-4xl text-neutral-400 mt-2">Explore dados em tempo real sobre eventos naturais ao redor do mundo, desde incêndios florestais e tempestades até erupções vulcânicas e mais.</p>
            </div>
            <div>
                <EventsFilter />
            </div>
            <div>
                <EventCard />
            </div>
        </div>
    )
}