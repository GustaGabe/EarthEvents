import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { FavoriteModule } from './favorite/favorite.module';
import { NasaModule } from './nasa/nasa.module';

@Module({
  imports: [UserModule, PrismaModule, FavoriteModule, NasaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
