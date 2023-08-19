import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GameGateway } from './game/game.gateway';
import { ScheduleModule } from '@nestjs/schedule';
import { GameService } from './game/game.service';

@Module({
  imports: [
    ScheduleModule.forRoot()
  ],
  controllers: [AppController],
  providers: [AppService, GameGateway, GameService],
})
export class AppModule {}
