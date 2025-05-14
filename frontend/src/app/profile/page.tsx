'use client';

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { apiService, Favorite } from "@/lib/api";
import { EventCard } from "@/components/events/eventcard";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [favorites, setFavorites] = useState<Favorite[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/auth/login');
            return;
        }

        const loadFavorites = async () => {
            if (!session?.user?.email) return;

            try {
                setLoading(true);
                setError(null);
                const favoritesData = await apiService.getFavorites(session.user.email);
                setFavorites(favoritesData);
            } catch (error) {
                console.error('Erro ao carregar favoritos:', error);
                setError('Erro ao carregar favoritos. Tente novamente mais tarde.');
            } finally {
                setLoading(false);
            }
        };

        loadFavorites();
    }, [session?.user?.email, status, router]);

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
            <div className="text-left mb-8">
                <h1 className="text-4xl font-bold">Meu Perfil</h1>
                <p className="max-w-4xl text-neutral-400 mt-2">
                    Gerencie seus eventos favoritos e mantenha-se atualizado sobre os eventos naturais que mais te interessam.
                </p>
            </div>

            <div className="mb-8 p-6 bg-neutral-900/50 rounded-xl border border-neutral-800">
                <div className="flex items-center gap-4">
                    <div className="h-16 w-16 bg-neutral-800 rounded-full flex items-center justify-center">
                        <span className="text-2xl text-white">
                            {session?.user?.name?.[0]?.toUpperCase() || session?.user?.email?.[0]?.toUpperCase()}
                        </span>
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold">{session?.user?.name || 'Usuário'}</h2>
                        <p className="text-neutral-400">{session?.user?.email}</p>
                    </div>
                </div>
            </div>

            <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Eventos Favoritos</h2>
                {favorites.length === 0 ? (
                    <div className="text-center py-8 text-neutral-400">
                        Você ainda não tem eventos favoritos. Explore a página de eventos para adicionar alguns!
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {favorites.map((favorite) => (
                            <EventCard
                                key={favorite.id}
                                event={{
                                    id: favorite.eventId,
                                    title: favorite.title,
                                    category: favorite.category,
                                    source: favorite.sourceUrl,
                                    date: favorite.date,
                                    coordinates: { lat: 0, lng: 0 }, // These will be updated when we fetch the full event data
                                    description: '',
                                }}
                                isFavorite={true}
                                onFavoriteToggle={handleFavoriteToggle}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
} 