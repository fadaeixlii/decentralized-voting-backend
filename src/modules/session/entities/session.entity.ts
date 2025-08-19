import { AdminUserEntity } from 'src/modules/admin-user/entities/admin-user.entity';
import { ModifyEmbedded } from 'src/shared/typeorm/modify-embedded';
import { RevokeEmbedded } from 'src/shared/typeorm/revoke-embedded';
import { UserAgentIPEmbedded } from 'src/shared/typeorm/user-agent-ip-embedded';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Index,
} from 'typeorm';

const tableName = 'sessions';

@Entity(tableName)
export class Session {
  @PrimaryGeneratedColumn('uuid')
  id: string; // sessionId returned to client

  @Index()
  @ManyToOne(() => AdminUserEntity, { onDelete: 'CASCADE' })
  user: AdminUserEntity;

  @Column({ length: 100 })
  refreshTokenHash: string; // bcrypt hash of refresh token

  @Column({ type: 'timestamptz' })
  expiresAt: Date; // session expiry (e.g., 7–30d)

  @Column(() => RevokeEmbedded)
  revoke: RevokeEmbedded;

  @Column({ type: 'timestamptz' })
  lastUsedAt: Date;

  @Column(() => UserAgentIPEmbedded)
  userAgentIP: UserAgentIPEmbedded;

  @Column(() => ModifyEmbedded)
  modify: ModifyEmbedded;
}
