import { IsEmail, IsEmpty, IsNotEmpty, IsOptional, IsString } from "class-validator"

export class AuthDtoRegister {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsOptional()
  username: string;

  @IsString()
  @IsNotEmpty()
  fullname: string;
}

export class AuthDtoLogin {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}