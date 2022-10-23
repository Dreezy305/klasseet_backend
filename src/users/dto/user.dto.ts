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
  country: 'Nigeria';
}
