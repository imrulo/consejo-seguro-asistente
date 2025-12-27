import { Controller, Post, Body, UnauthorizedException, Get, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import * as bcrypt from 'bcryptjs';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    const user = await this.authService.validateUser(body.email, body.password);
    if (!user) throw new UnauthorizedException('Credenciales inválidas');
    return this.authService.login(user);
  }

  @Post('register')
  async register(@Body() body: { email: string; password: string; name?: string; language?: string; country?: string }) {
    const hash = await bcrypt.hash(body.password, 10);
    const user = await this.userService.create({
      email: body.email,
      password: hash,
      name: body.name,
      language: body.language,
      country: body.country,
    });
    return this.authService.login(user);
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req) {
    // Buscar o crear usuario en DB
    let user = await this.userService.findByEmail(req.user.email);
    if (!user) {
      user = await this.userService.create({
        email: req.user.email,
        name: req.user.name,
        password: null,
      });
    }
    return this.authService.login(user);
  }
}
