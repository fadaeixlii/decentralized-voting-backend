import { Column } from 'typeorm';

export abstract class RevokeEmbedded {
  @Column({ default: false })
  revoked: boolean;

  @Column({ type: 'timestamptz', nullable: true })
  revokedAt?: Date;

  @Column({ nullable: true })
  revokeReason?: string;
}
