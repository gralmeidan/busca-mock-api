import { applyDecorators, BadRequestException } from '@nestjs/common';
import { Transform } from 'class-transformer';
import { IsDate } from 'class-validator';

export function IsDdMmYYYY() {
  return applyDecorators(
    IsDate(),
    Transform(({ value }) => {
      if (typeof value === 'string') {
        const regex = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;

        if (!regex.test(value)) {
          throw new BadRequestException(
            'Data deve estar no formato dd/mm/yyyy'
          );
        }

        return new Date(value.replace(regex, '$3-$2-$1'));
      }

      return value;
    })
  );
}
