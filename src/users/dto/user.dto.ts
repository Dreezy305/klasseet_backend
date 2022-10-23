import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEmail, IsString } from 'class-validator';

export class UserDto {
  @IsString()
  id: string;

  @IsDate()
  createdAt: string;

  @IsEmail()
  @IsString()
  email: string;

  @IsString()
  hash: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  role: string;

  @IsString()
  country: string;
}

export class EditUserDto {
  @ApiProperty({ description: 'user first name', type: String, required: true })
  @IsString()
  firstName: string;

  @ApiProperty({ description: 'user last  name', type: String, required: true })
  @IsString()
  lastName: string;

  @ApiProperty({ description: 'user country', type: String, required: true })
  @IsString()
  country: string;
}
