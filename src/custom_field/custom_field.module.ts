import { Module } from '@nestjs/common';
import { CustomFieldService } from './custom_field.service';
import { CustomFieldController } from './custom_field.controller';

@Module({
    controllers: [CustomFieldController],
    providers: [CustomFieldService],
})
export class CustomFieldModule {}
