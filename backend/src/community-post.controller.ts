import { Controller, Post, Get, Body, UseGuards, Request } from '@nestjs/common';
import { CommunityPostService } from './community-post.service';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { AiService } from './ai.service';

@Controller('community')
export class CommunityPostController {
  constructor(
    private readonly postService: CommunityPostService,
    private readonly userService: UserService,
    private readonly aiService: AiService,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Request() req, @Body() data) {
    const user = await this.userService.findByEmail(req.user.email);
    // Moderación IA: prompt para detectar toxicidad
    const moderationPrompt = `Evalúa el siguiente texto y responde solo con un número entre 0 (no tóxico) y 1 (muy tóxico): ${data.content}`;
    let toxicityRaw = await this.aiService.empatheticResponse(moderationPrompt, 'es');
    let toxicityScore = 0;
    try {
      toxicityScore = parseFloat((toxicityRaw || '').replace(/[^0-9.]/g, ''));
      if (isNaN(toxicityScore)) toxicityScore = 0;
    } catch { toxicityScore = 0; }
    let aiModeration = toxicityScore > 0.5 ? 'Posible contenido tóxico, será revisado.' : 'OK';
    if (user.language && user.language !== 'es') {
      aiModeration = await this.aiService.translate(aiModeration, user.language);
    }
    return this.postService.create(user, { ...data, toxicityScore, aiModeration });
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('my')
  async getMyPosts(@Request() req) {
    const user = await this.userService.findByEmail(req.user.email);
    return this.postService.findByUser(user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getAll() {
    return this.postService.findAll();
  }
}
