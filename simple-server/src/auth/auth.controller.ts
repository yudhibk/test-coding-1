import { Body, Controller, Get, Post, Request, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDtoLogin, AuthDtoRegister } from "./dto";
import { AuthGuard } from "./auth.guard";

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() dto: AuthDtoRegister) {
    return this.authService.signup(dto)
  }

  @Post('signin')
  signin(@Body() dto: AuthDtoLogin) {
    return this.authService.signin(dto)
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}