import { NonEmptyString } from './../../../types/strings/none-empty-string';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminUserEntity } from 'src/modules/admin-user/entities/admin-user.entity';
import { BcryptHashingService } from 'src/shared/modules/hashing/providers/bcrypt-hashing.service';
import { UUID } from 'src/types/strings';
import { Repository } from 'typeorm';
import { RequestSessionAuthDto } from '../dtos/request-session-auth.dto';
import { RefreshToken } from '../entities/refresh-token';
import { SessionEntity } from '../entities/session.entity';
import { SessionId } from '../entities/sessionId.domain';

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

  async findById(sessionId: SessionId) {
    return this.sessionRepository.findOneBy({ id: sessionId });
  }

  async rotate(
    sessionId: SessionId,
    refreshToken: RefreshToken,
    ctx?: RequestSessionAuthDto.RequestSessionAuthInput,
  ) {
    // find session and handle exception
    const session = await this.findById(sessionId);
    if (!session) throw new UnauthorizedException('Session not found');
    // compare refresh token with session refresh token hash
    if (
      !(await this.hashingService.compare(
        refreshToken,
        NonEmptyString.mkUnsafe(session.refreshTokenHash),
      ))
    ) {
      throw new UnauthorizedException('Invalid refresh token');
    }
    // generate new refresh token
    const newRefreshToken = RefreshToken.generate({
      sub: UUID.mkUnsafe(session.user.id),
    });
    const hashNewRefreshToken = await this.hashingService.hash(newRefreshToken);
    // update session
    session.refreshTokenHash = hashNewRefreshToken;
    session.lastUsedAt = new Date();
    session.userAgentIP = {
      ip: ctx?.ip,
      userAgent: ctx?.ua,
    };
    await this.sessionRepository.save(session);
    // return new refresh token
    return {
      refreshToken: newRefreshToken,
      sessionId: session.id,
      user: session.user,
    };
  }

  async revoke(sessionId: string, reason?: string) {
    await this.sessionRepository.update(
      { id: sessionId },
      {
        revoke: {
          revoked: true,
          revokedAt: new Date(),
          revokeReason: reason ?? undefined,
        },
      },
    );
  }

  async revokeAll(userId: string, reason?: string) {
    await this.sessionRepository.update(
      { user: { id: userId }, revoke: { revoked: false } },
      {
        revoke: {
          revoked: true,
          revokedAt: new Date(),
          revokeReason: reason ?? undefined,
        },
      },
    );
  }
}
