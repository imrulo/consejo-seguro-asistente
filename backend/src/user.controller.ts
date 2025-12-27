import { Controller, Get, Post, Body, Query, UseGuards, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getAll(@Request() req): Promise<User[]> {
    return this.userService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() user: Partial<User>): Promise<User> {
    return this.userService.create(user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('by-email')
  async getByEmail(@Query('email') email: string): Promise<User | undefined> {
    return this.userService.findByEmail(email);
  }
}
