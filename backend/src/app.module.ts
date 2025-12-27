import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeOrmConfig from './typeorm.config';
import { AppController } from './app.controller';
import { RedisService } from './redis.service';
import { User } from './user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AuthToken } from './auth-token.entity';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { GoogleStrategy } from './google.strategy';
import { UserProfile } from './user-profile.entity';
import { UserProfileService } from './user-profile.service';
import { UserProfileController } from './user-profile.controller';
import { SchoolSupport } from './school-support.entity';
import { SchoolSupportService } from './school-support.service';
import { SchoolSupportController } from './school-support.controller';
import { HealthEmergency } from './health-emergency.entity';
import { HealthEmergencyService } from './health-emergency.service';
import { HealthEmergencyController } from './health-emergency.controller';
import { TransportGuide } from './transport-guide.entity';
import { TransportGuideService } from './transport-guide.service';
import { TransportGuideController } from './transport-guide.controller';
import { CommunityPost } from './community-post.entity';
import { CommunityPostService } from './community-post.service';
import { CommunityPostController } from './community-post.controller';
import { AiService } from './ai.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(typeOrmConfig),
    TypeOrmModule.forFeature([
      User, AuthToken, UserProfile, SchoolSupport, HealthEmergency, TransportGuide, CommunityPost
    ]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'supersecret',
      signOptions: { expiresIn: '7d' },
    }),
  ],
  controllers: [
    AppController, UserController, AuthController, UserProfileController, SchoolSupportController,
    HealthEmergencyController, TransportGuideController, CommunityPostController
  ],
  providers: [
    RedisService, UserService, AuthService, JwtStrategy, GoogleStrategy, UserProfileService,
    SchoolSupportService, HealthEmergencyService, TransportGuideService, CommunityPostService, AiService
  ],
})
export class AppModule {}
