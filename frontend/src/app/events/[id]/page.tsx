'use client';

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { apiService, Event, Favorite } from "@/lib/api";
import { useRouter } from "next/navigation";
import { Calendar, MapPin, Star, ExternalLink, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card, CardContent } from '@/components/ui/card';

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
            <Card className="bg-gray-800 border-gray-700 text-white">
                <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-6">
                        <h1 className="text-3xl font-bold">{event.title}</h1>
                        {session && (
                            <Button
                                variant="ghost"
                                size="icon"
                                className={`${
                                    isFavorite ? 'text-red-500' : 'text-gray-400'
                                } hover:text-red-500`}
                                onClick={handleFavorite}
                            >
                                <Heart
                                    className="w-6 h-6"
                                    fill={isFavorite ? 'currentColor' : 'none'}
                                />
                            </Button>
                        )}
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <MapPin className="w-5 h-5 text-gray-400" />
                            <span>
                                {event.coordinates.lat.toFixed(2)}°,{' '}
                                {event.coordinates.lng.toFixed(2)}°
                            </span>
                        </div>

                        <div className="flex items-center gap-2">
                            <Calendar className="w-5 h-5 text-gray-400" />
                            <span>{new Date(event.date).toLocaleDateString()}</span>
                        </div>

                        {event.source && (
                            <div className="flex items-center gap-2">
                                <ExternalLink className="w-5 h-5 text-gray-400" />
                                <a
                                    href={event.source}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-400 hover:underline"
                                >
                                    Fonte
                                </a>
                            </div>
                        )}
                    </div>

                    {event.description && (
                        <div className="mt-6">
                            <h2 className="text-xl font-semibold mb-2">Descrição</h2>
                            <p className="text-gray-300">{event.description}</p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
} 