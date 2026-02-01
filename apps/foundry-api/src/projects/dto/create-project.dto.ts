import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, Matches, IsOptional } from 'class-validator';

export class CreateProjectDto {
  @ApiProperty({ description: 'The name of the project' })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({ description: 'The unique slug for the project' })
  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-z0-9-]+$/, {
    message: 'Invalid project slug. Use only lowercase, numbers, and hyphens.',
  })
  slug!: string;

  @ApiProperty({ description: 'A short description of the project' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ description: 'The type of the project' })
  @IsString()
  @IsOptional()
  type?: string;

  @ApiProperty({ description: 'The data entities for the project' })
  @IsOptional()
  entities?: string;

  @ApiProperty({ description: 'The features for the project' })
  @IsOptional()
  features?: string;
}
