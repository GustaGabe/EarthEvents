'use client';

import { EventCard } from "@/components/events/eventcard";
import { EventsFilter } from "@/components/events/eventsfilter";
import { useEffect, useState } from "react";
import { apiService, Event, Favorite } from "@/lib/api";
import { useSession } from "next-auth/react";

export default function EventsPage() {
    const { data: session } = useSession();
    const [events, setEvents] = useState<Event[]>([]);
    const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
    const [favorites, setFavorites] = useState<Favorite[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);
                setError(null);
                
                const [eventsData, favoritesData] = await Promise.all([
                    apiService.getEvents(),
                    session?.user?.email ? apiService.getFavorites(session.user.email) : [],
                ]);

                if (!Array.isArray(eventsData)) {
                    throw new Error('Dados de eventos inválidos');
                }

                setEvents(eventsData);
                setFilteredEvents(eventsData);
                setFavorites(favoritesData);
            } catch (error) {
                console.error('Erro ao carregar dados:', error);
                setError('Erro ao carregar eventos. Tente novamente mais tarde.');
                setEvents([]);
                setFilteredEvents([]);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [session?.user?.email]);

    const handleFavoriteToggle = async () => {
        if (session?.user?.email) {
            try {
                const updatedFavorites = await apiService.getFavorites(session.user.email);
                setFavorites(updatedFavorites);
            } catch (error) {
                console.error('Erro ao atualizar favoritos:', error);
            }
        }
    };

    const handleFilterChange = ({ search, category }: { search: string; category: string }) => {
        let filtered = [...events];

        if (search) {
            filtered = filtered.filter(event =>
                event.title.toLowerCase().includes(search.toLowerCase()) ||
                event.description.toLowerCase().includes(search.toLowerCase())
            );
        }

        if (category) {
            filtered = filtered.filter(event =>
                event.category.toLowerCase() === category.toLowerCase()
            );
        }

        setFilteredEvents(filtered);
    };

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="text-center">Carregando...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="text-center text-red-500">{error}</div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="text-left">
                <h1 className="text-4xl font-bold">Eventos naturais</h1>
                <p className="max-w-4xl text-neutral-400 mt-2">Explore dados em tempo real sobre eventos naturais ao redor do mundo, desde incêndios florestais e tempestades até erupções vulcânicas e mais.</p>
            </div>
            <div>
                <EventsFilter onFilterChange={handleFilterChange} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEvents.map((event) => (
                    <EventCard
                        key={event.id}
                        event={event}
                        isFavorite={favorites.some(fav => fav.eventId === event.id)}
                        onFavoriteToggle={handleFavoriteToggle}
                    />
                ))}
            </div>
        </div>
    )
}