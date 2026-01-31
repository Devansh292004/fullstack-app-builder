import { ApiProperty } from '@nestjs/swagger';

export class CreateProjectDto {
  @ApiProperty({ description: 'The name of the project' })
  name: string;

  @ApiProperty({ description: 'The unique slug for the project' })
  slug: string;

  @ApiProperty({ description: 'A short description of the project' })
  description: string;

  @ApiProperty({ description: 'The data entities for the project' })
  entities: any[];
}
