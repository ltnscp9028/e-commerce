import { Module } from '@nestjs/common';

import { PrismaModule } from '@prismaModule/prisma.module';
import { CustomFieldModule } from '@customField/custom_field.module';

@Module({
    imports: [PrismaModule, CustomFieldModule],
})
export class AppModule {}
