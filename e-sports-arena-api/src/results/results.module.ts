import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResultEntity } from './entities/result.entity';

@Module({
    imports: [TypeOrmModule.forFeature([ResultEntity])],
})
export class ResultsModule {}
