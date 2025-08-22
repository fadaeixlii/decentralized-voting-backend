import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminUserEntity } from 'src/modules/admin-user/entities/admin-user.entity';
import { BcryptHashingService } from 'src/shared/modules/hashing/providers/bcrypt-hashing.service';
import { UUID } from 'src/types/strings';
import { Repository } from 'typeorm';
import { RequestSessionAuthDto } from '../dtos/request-session-auth.dto';
import { RefreshToken } from '../entities/refresh-token';
import { SessionEntity } from '../entities/session.entity';

@Injectable()
export class SessionService {
  constructor(
    // inject session repository
    @InjectRepository(SessionEntity)
    private readonly sessionRepository: Repository<SessionEntity>,

    // inject hashing service
    private readonly hashingService: BcryptHashingService,
  ) {}

  async create(
    user: AdminUserEntity,
    ctx?: RequestSessionAuthDto.RequestSessionAuthInput,
  ) {
    // payload
    const payload: RefreshToken.Payload = {
      sub: UUID.mkUnsafe(user.id),
    };
    // generate refresh token
    const refreshToken = RefreshToken.generate(payload);
    // create hash of refresh token
    const refreshTokenHash = await this.hashingService.hash(refreshToken);
    // create session
    const session = this.sessionRepository.create({
      expiresAt: new Date(Date.now() + RefreshToken.config.ttl),
      user,
      lastUsedAt: new Date(),
      refreshTokenHash,
      userAgentIP: {
        ip: ctx?.ip,
        userAgent: ctx?.ua,
      },
    });
    // save session
    await this.sessionRepository.save(session);
    // return session
    return {
      refreshToken,
      sessionId: session.id,
    };
  }
}
