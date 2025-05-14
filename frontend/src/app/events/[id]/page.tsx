'use client';

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { apiService, Event, Favorite } from "@/lib/api";
import { useRouter } from "next/navigation";
import { Calendar, MapPin, Star, ExternalLink, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface EventDetailsPageProps {
    params: {
        id: string;
    };
}

export default function EventDetailsPage({ params }: EventDetailsPageProps) {
    const { data: session } = useSession();
    const router = useRouter();
    const [event, setEvent] = useState<Event | null>(null);
    const [isFavorite, setIsFavorite] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadEventData = async () => {
            try {
                setLoading(true);
                setError(null);

                // Carregar todos os eventos para encontrar o específico
                const events = await apiService.getEvents();
                const foundEvent = events.find(e => e.id === params.id);

                if (!foundEvent) {
                    throw new Error('Evento não encontrado');
                }

                setEvent(foundEvent);

                // Verificar se o evento está nos favoritos
                if (session?.user?.email) {
                    const favorites = await apiService.getFavorites(session.user.email);
                    setIsFavorite(favorites.some(fav => fav.eventId === params.id));
                }
            } catch (error) {
                console.error('Erro ao carregar evento:', error);
                setError('Erro ao carregar detalhes do evento. Tente novamente mais tarde.');
            } finally {
                setLoading(false);
            }
        };

        loadEventData();
    }, [params.id, session?.user?.email]);

    const handleFavorite = async () => {
        if (!session?.user?.email) {
            router.push('/auth/login');
            return;
        }

        try {
            if (isFavorite) {
                // Remover dos favoritos
                const favorites = await apiService.getFavorites(session.user.email);
                const favoriteToRemove = favorites.find(fav => fav.eventId === event?.id);
                if (favoriteToRemove) {
                    await apiService.removeFavorite(favoriteToRemove.id);
                }
            } else {
                // Adicionar aos favoritos
                if (event) {
                    await apiService.addFavorite({
                        userId: session.user.email,
                        eventId: event.id,
                        title: event.title,
                        category: event.category,
                        sourceUrl: event.source,
                        date: new Date(event.date).toISOString(),
                    });
                }
            }

            setIsFavorite(!isFavorite);
        } catch (error) {
            console.error('Erro ao atualizar favorito:', error);
        }
    };

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="text-center">Carregando...</div>
            </div>
        );
    }

    if (error || !event) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="text-center text-red-500">{error || 'Evento não encontrado'}</div>
                <div className="mt-4 text-center">
                    <Link href="/events">
                        <Button className="bg-white text-black">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Voltar para Eventos
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <Link href="/events">
                    <Button variant="ghost" className="text-neutral-400 hover:text-white mb-4">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Voltar para Eventos
                    </Button>
                </Link>
            </div>

            <div className="bg-neutral-900/50 rounded-xl border border-neutral-800 p-8">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">{event.title}</h1>
                        <div className="flex items-center gap-4 text-neutral-400">
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                <span>{new Date(event.date).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4" />
                                <span>{event.coordinates.lat}°, {event.coordinates.lng}°</span>
                            </div>
                        </div>
                    </div>
                    <Button 
                        className={`border border-neutral-600 ${isFavorite ? 'bg-amber-500/20' : ''}`}
                        onClick={handleFavorite}
                    >
                        <Star className={isFavorite ? "text-amber-300 fill-amber-300" : "hover:text-amber-300"} />
                    </Button>
                </div>

                <div className="prose prose-invert max-w-none">
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold mb-2">Descrição</h2>
                        <p className="text-neutral-400">{event.description || 'Nenhuma descrição disponível para este evento.'}</p>
                    </div>

                    <div className="mb-6">
                        <h2 className="text-xl font-semibold mb-2">Categoria</h2>
                        <span className="inline-block bg-neutral-800 px-3 py-1 rounded-full text-sm">
                            {event.category}
                        </span>
                    </div>

                    {event.source && (
                        <div className="mb-6">
                            <h2 className="text-xl font-semibold mb-2">Fonte</h2>
                            <a 
                                href={event.source} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300"
                            >
                                <ExternalLink className="w-4 h-4" />
                                Ver fonte original
                            </a>
                        </div>
                    )}

                    <div className="mb-6">
                        <h2 className="text-xl font-semibold mb-2">Localização</h2>
                        <div className="bg-neutral-800 rounded-lg p-4">
                            <p className="text-neutral-400">
                                Latitude: {event.coordinates.lat}°<br />
                                Longitude: {event.coordinates.lng}°
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 