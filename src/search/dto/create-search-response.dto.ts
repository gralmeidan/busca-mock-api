import { ApiProperty } from '@nestjs/swagger';

export class CreateSearchResponseDTO {
  @ApiProperty({
    type: String,
    description: 'Id da busca',
    example: '0b03ed62-c42e-42c0-b43d-fb046ed15f2b',
  })
  Busca: string;
}
