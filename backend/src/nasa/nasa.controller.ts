import { Controller, Get } from '@nestjs/common';
import { NasaService } from './nasa.service';

@Controller('nasa')
export class NasaController {
  constructor(private nasaService: NasaService) {}

  @Get('events')
  async getEvents() {
    return this.nasaService.getEvents();
  }
} 