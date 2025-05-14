import { Controller, Post, Get, Delete, Body, Param } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { Favorite } from '@prisma/client';

@Controller('favorite')
export class FavoriteController {
  constructor(private favoriteService: FavoriteService) {}

  @Post()
  async addFavorite(
    @Body() data: {
      userId: string;
      eventId: string;
      title: string;
      category: string;
      sourceUrl: string;
      date: Date;
    },
  ): Promise<Favorite> {
    return this.favoriteService.addFavorite(
      data.userId,
      data.eventId,
      data.title,
      data.category,
      data.sourceUrl,
      data.date,
    );
  }

  @Get(':userId')
  async findAllFavorites(@Param('userId') userId: string): Promise<Favorite[]> {
    return this.favoriteService.findAllFavorites(userId);
  }

  @Delete(':id')
  async removeFavorite(@Param('id') id: string): Promise<Favorite> {
    return this.favoriteService.removeFavorite(id);
  }
} 