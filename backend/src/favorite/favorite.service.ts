import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Favorite } from '@prisma/client';
import { UserService } from '../user/user.service';

@Injectable()
export class FavoriteService {
  constructor(
    private prisma: PrismaService,
    private userService: UserService,
  ) {}

  async addFavorite(userEmail: string, eventId: string, title: string, category: string, sourceUrl: string, date: Date): Promise<Favorite> {
    // Buscar ou criar o usuário
    let user = await this.userService.findUserByEmail(userEmail);
    if (!user) {
      user = await this.userService.createUser(userEmail);
    }

    return this.prisma.favorite.create({
      data: {
        userId: user.id,
        eventId,
        title,
        category,
        sourceUrl,
        date,
      },
    });
  }

  async findAllFavorites(userEmail: string): Promise<Favorite[]> {
    const user = await this.userService.findUserByEmail(userEmail);
    if (!user) return [];

    return this.prisma.favorite.findMany({
      where: { userId: user.id },
    });
  }

  async removeFavorite(id: string): Promise<Favorite> {
    return this.prisma.favorite.delete({
      where: { id },
    });
  }
} 