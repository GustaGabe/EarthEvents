import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class NasaService {
  private readonly baseUrl = 'https://eonet.gsfc.nasa.gov/api/v3';

  constructor(private readonly httpService: HttpService) {}

  async getEvents() {
    const response = await firstValueFrom(
      this.httpService.get(`${this.baseUrl}/events`),
    );
    return response.data;
  }

  async getEventById(id: string) {
    const response = await firstValueFrom(
      this.httpService.get(`${this.baseUrl}/events/${id}`),
    );
    return response.data;
  }
} 