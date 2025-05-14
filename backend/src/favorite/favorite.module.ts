import { Module } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { FavoriteController } from './favorite.controller';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule],
  providers: [FavoriteService],
  controllers: [FavoriteController],
})
export class FavoriteModule {} 