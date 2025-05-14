import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001',
  withCredentials: true,
});

export interface Event {
  id: string;
  title: string;
  description: string;
  category: string;
  source: string;
  date: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface Favorite {
  id: string;
  userId: string;
  eventId: string;
  title: string;
  category: string;
  sourceUrl: string;
  date: string;
}

export const apiService = {
  async getEvents() {
    const response = await api.get('/nasa/events');
    // A API da NASA retorna os eventos em response.data.events
    const events = response.data.events || [];
    
    // Transformar os dados para o formato que esperamos
    return events.map((event: any) => ({
      id: event.id,
      title: event.title,
      description: event.description || '',
      category: event.categories?.[0]?.title || 'Uncategorized',
      source: event.sources?.[0]?.url || '',
      date: event.geometry?.[0]?.date || new Date().toISOString(),
      coordinates: {
        lat: event.geometry?.[0]?.coordinates?.[1] || 0,
        lng: event.geometry?.[0]?.coordinates?.[0] || 0,
      },
    }));
  },

  // Favoritos
  async addFavorite(data: Omit<Favorite, 'id'>) {
    const response = await api.post('/favorite', data);
    return response.data;
  },

  async getFavorites(userId: string) {
    const response = await api.get(`/favorite/${userId}`);
    return response.data;
  },

  async removeFavorite(id: string) {
    const response = await api.delete(`/favorite/${id}`);
    return response.data;
  },

  // Usuário
  async createUser(email: string, name?: string) {
    const response = await api.post('/user', { email, name });
    return response.data;
  },

  async getUserByEmail(email: string) {
    const response = await api.get(`/user/email/${email}`);
    return response.data;
  },
}; 