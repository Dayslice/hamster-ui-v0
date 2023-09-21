import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EntitiesModule } from './entities/entities.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import connectionOptions from './ormconfig';

console.log('ORM', connectionOptions);
@Module({
  imports: [TypeOrmModule.forRoot(connectionOptions), EntitiesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
