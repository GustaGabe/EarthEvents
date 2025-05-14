import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class NasaService {
  private readonly apiKey = process.env.NASA_API_KEY;
  private readonly baseUrl = 'https://eonet.gsfc.nasa.gov/api/v3';

  async getEvents(): Promise<any> {
    const response = await axios.get(`${this.baseUrl}/events`, {
      params: {
        api_key: this.apiKey,
      },
    });
    return response.data;
  }
} 