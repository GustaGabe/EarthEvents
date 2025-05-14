import { Calendar, Info, MapPin, Star } from "lucide-react"
import { Badge } from "../ui/badge"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { apiService, Event, Favorite } from "@/lib/api"
import { useSession } from "next-auth/react"
import Link from "next/link"

interface EventCardProps {
  event: Event;
  isFavorite?: boolean;
  onFavoriteToggle?: () => void;
}

export const EventCard = ({ event, isFavorite = false, onFavoriteToggle }: EventCardProps) => {
  const { data: session } = useSession();

  const handleFavorite = async () => {
    if (!session?.user?.email) return;

    try {
      if (isFavorite) {
        // Remover dos favoritos
        const favorites = await apiService.getFavorites(session.user.email);
        const favoriteToRemove = favorites.find((fav: Favorite) => fav.eventId === event.id);
        if (favoriteToRemove) {
          await apiService.removeFavorite(favoriteToRemove.id);
        }
      } else {
        // Adicionar aos favoritos
        await apiService.addFavorite({
          userId: session.user.email,
          eventId: event.id,
          title: event.title,
          category: event.category,
          sourceUrl: event.source,
          date: new Date(event.date).toISOString(),
        });
      }

      onFavoriteToggle?.();
    } catch (error) {
      console.error('Erro ao atualizar favorito:', error);
    }
  };

  return (
    <Card className="border border-neutral-600 pt-0 mt-10 h-full flex max-w-md flex-col overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="p-5 border-b bg-gradient-to-r from-orange-500/10 to-red-500/10 border-orange-600/20">
        <CardTitle className="font-bold text-md">{event.title}</CardTitle>
        <div className="mt-2 flex flex-row gap-3">
          <Badge className="bg-neutral-800 px-3 rounded-full">{event.category}</Badge>
          <Badge variant="outline" className="bg-green-500/10 text-green-600 rounded-full">Active</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex text-neutral-400 flex-col gap-2">
          <div className="flex flex-row gap-2 items-center">
            <MapPin />
            <span>{event.coordinates.lat}°, {event.coordinates.lng}°</span>
          </div>
          <div className="flex flex-row gap-2 items-center">
            <Calendar />
            <span>{new Date(event.date).toLocaleDateString()}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t border-neutral-600">
        <div className="flex flex-row gap-3 w-full">
          <div className="w-full">
            <Link href={`/events/${event.id}`}>
              <Button className="bg-white text-black w-full">Detalhes</Button>
            </Link>
          </div>
          <div>
            <Button 
              className={`border border-neutral-600 ${isFavorite ? 'bg-amber-500/20' : ''}`}
              onClick={handleFavorite}
            >
              <Star className={isFavorite ? "text-amber-300 fill-amber-300" : "hover:text-amber-300"} />
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};