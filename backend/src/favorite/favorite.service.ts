import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';

@Injectable()
export class FavoriteService {
  constructor(private prisma: PrismaService) {}

  async create(createFavoriteDto: CreateFavoriteDto) {
    const user = await this.prisma.user.upsert({
      where: { email: createFavoriteDto.userId },
      update: {},
      create: { email: createFavoriteDto.userId },
    });

    return this.prisma.favorite.create({
      data: {
        userId: user.id,
        eventId: createFavoriteDto.eventId,
        title: createFavoriteDto.title,
        category: createFavoriteDto.category,
        sourceUrl: createFavoriteDto.sourceUrl,
        date: new Date(createFavoriteDto.date),
      },
    });
  }

  async findAll(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { email: userId },
    });

    if (!user) {
      return [];
    }

    return this.prisma.favorite.findMany({
      where: { userId: user.id },
    });
  }

  async remove(id: string) {
    return this.prisma.favorite.delete({
      where: { id },
    });
  }
} 