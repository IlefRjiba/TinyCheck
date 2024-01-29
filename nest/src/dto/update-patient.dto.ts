import { IsString, IsNumber, IsOptional } from 'class-validator';

export class UpdatePatientDto {
  @IsOptional()
  @IsString()
  readonly name?: string;

  @IsOptional()
  @IsString()
  readonly lastname?: string;

  @IsOptional()
  @IsString()
  readonly Babyname?: string;

  @IsOptional()
  @IsString()
  readonly Babyage?: string;

  @IsOptional()
  @IsNumber()
  readonly babypoid?: number;

  @IsOptional()
  @IsString()
  readonly Reason?: string;
}
