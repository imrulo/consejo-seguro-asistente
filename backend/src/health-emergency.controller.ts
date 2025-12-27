import { Controller, Post, Get, Body, UseGuards, Request } from '@nestjs/common';
import { HealthEmergencyService } from './health-emergency.service';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { AiService } from './ai.service';

@Controller('health-emergency')
export class HealthEmergencyController {
  constructor(
    private readonly healthService: HealthEmergencyService,
    private readonly userService: UserService,
    private readonly aiService: AiService,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Request() req, @Body() data) {
    const user = await this.userService.findByEmail(req.user.email);
    let aiResponse = await this.aiService.empatheticResponse(data.message, 'es');
    if (user.language && user.language !== 'es') {
      aiResponse = await this.aiService.translate(aiResponse, user.language);
    }
    return this.healthService.create(user, { ...data, aiResponse });
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getAll(@Request() req) {
    const user = await this.userService.findByEmail(req.user.email);
    return this.healthService.findByUser(user);
  }
}
