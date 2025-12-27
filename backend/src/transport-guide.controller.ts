import { Controller, Post, Get, Body, UseGuards, Request } from '@nestjs/common';
import { TransportGuideService } from './transport-guide.service';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { AiService } from './ai.service';

@Controller('transport-guide')
export class TransportGuideController {
  constructor(
    private readonly transportService: TransportGuideService,
    private readonly userService: UserService,
    private readonly aiService: AiService,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Request() req, @Body() data) {
    const user = await this.userService.findByEmail(req.user.email);
    const prompt = `Ayúdame con una ruta de transporte desde ${data.fromLocation} hasta ${data.toLocation}. ${data.routeInfo || ''}`;
    let aiResponse = await this.aiService.empatheticResponse(prompt, 'es');
    if (user.language && user.language !== 'es') {
      aiResponse = await this.aiService.translate(aiResponse, user.language);
    }
    return this.transportService.create(user, { ...data, aiResponse });
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getAll(@Request() req) {
    const user = await this.userService.findByEmail(req.user.email);
    return this.transportService.findByUser(user);
  }
}
