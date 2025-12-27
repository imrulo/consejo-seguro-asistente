import { Controller, Get, Post, Body, UseGuards, Request } from '@nestjs/common';
import { UserProfileService } from './user-profile.service';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';

@Controller('profile')
export class UserProfileController {
  constructor(
    private readonly profileService: UserProfileService,
    private readonly userService: UserService,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getProfile(@Request() req) {
    const user = await this.userService.findByEmail(req.user.email);
    return this.profileService.getByUser(user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async updateProfile(@Request() req, @Body() data) {
    const user = await this.userService.findByEmail(req.user.email);
    return this.profileService.createOrUpdate(user, data);
  }
}
