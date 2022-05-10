import { Controller } from '@nestjs/common';
import { CustomFieldService } from './custom_field.service';

@Controller('custom-field')
export class CustomFieldController {
    constructor(private readonly customFieldService: CustomFieldService) {}
}
