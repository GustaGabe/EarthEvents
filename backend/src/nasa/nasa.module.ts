import { Module } from '@nestjs/common';
import { NasaService } from './nasa.service';
import { NasaController } from './nasa.controller';

@Module({
  providers: [NasaService],
  controllers: [NasaController],
})
export class NasaModule {} 