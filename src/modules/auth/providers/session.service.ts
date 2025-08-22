import { Inject, Injectable } from '@nestjs/common';
import { SessionEntity } from '../entities/session.entity';
import { Repository } from 'typeorm';
import { AdminUserEntity } from 'src/modules/admin-user/entities/admin-user.entity';
import { IP, UUID } from 'src/types/strings';
import { RefreshToken } from '../entities/refresh-token';
import { BcryptHashingService } from 'src/shared/modules/hashing/providers/bcrypt-hashing.service';

@Injectable()
export class SessionService {
  constructor(
    // inject session repository
    @Inject(SessionEntity)
    private readonly sessionRepository: Repository<SessionEntity>,

    // inject hashing service
    private readonly hashingService: BcryptHashingService,
  ) {}

  async create(user: AdminUserEntity, ctx?: { ua?: string; ip?: IP }) {
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
