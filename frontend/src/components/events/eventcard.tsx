import { useState } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, MapPin, Calendar } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { addFavorite, removeFavorite } from '@/lib/api';
import { useSession } from 'next-auth/react';

interface EventCardProps {
  id: string;
  title: string;
  date: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  isFavorite: boolean;
  onFavoriteChange: () => void;
}

export function EventCard({
  id,
  title,
  date,
  coordinates,
  isFavorite,
  onFavoriteChange,
}: EventCardProps) {
  const router = useRouter();
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  const handleFavoriteClick = async () => {
    if (!session) {
      router.push('/login');
      return;
    }

    setIsLoading(true);
    try {
      if (isFavorite) {
        await removeFavorite(id);
      } else {
        await addFavorite(id);
      }
      onFavoriteChange();
    } catch (error) {
      console.error('Error toggling favorite:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full bg-gray-800 border-gray-700 text-white">
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <div className="space-y-2 text-gray-300">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span>
              {coordinates.lat.toFixed(2)}°, {coordinates.lng.toFixed(2)}°
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>{new Date(date).toLocaleDateString()}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0 flex justify-between">
        <Button
          variant="outline"
          className="text-white border-gray-600 hover:bg-gray-700"
          onClick={() => router.push(`/events/${id}`)}
        >
          Detalhes
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className={`${
            isFavorite ? 'text-red-500' : 'text-gray-400'
          } hover:text-red-500`}
          onClick={handleFavoriteClick}
          disabled={isLoading}
        >
          <Heart className="w-5 h-5" fill={isFavorite ? 'currentColor' : 'none'} />
        </Button>
      </CardFooter>
    </Card>
  );
}