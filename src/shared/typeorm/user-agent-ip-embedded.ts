import { Column } from 'typeorm';

export abstract class UserAgentIPEmbedded {
  @Column({ nullable: true })
  userAgent?: string;

  @Column({ nullable: true })
  ip?: string;
}
