import { ElectionEntity } from 'src/modules/election/entities/election.entity';
import { ModifyEmbedded } from 'src/shared/typeorm/modify-embedded';
import { Email, NonEmptyString, PasswordString, UUID } from 'src/types/strings';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import z from 'zod';
import { AdminUserDomain } from './admin-user.domain';

const tableName = 'admin_users';

@Entity(tableName)
export class AdminUserEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  username: string;

  @Column({ type: 'text' })
  password!: string;

  @Column()
  email!: string;

  @Column({ type: 'boolean', default: false })
  is_active: boolean;

  @Column(() => ModifyEmbedded)
  modify: ModifyEmbedded;

  @Column({ type: 'timestamptz', nullable: true })
  last_login!: Date;

  @Column({ default: false })
  isVerified: boolean;

  @Column({ nullable: true })
  avatar?: string;

  @OneToMany(() => ElectionEntity, (election) => election.created_by)
  elections: ElectionEntity[];

  static schema = z.object({
    id: UUID.zod,
    username: NonEmptyString.zod,
    password: PasswordString.zod,
    email: Email.zod,
    is_active: z.boolean().nullable(),
    last_login: z.date().nullable(),
    isVerified: z.boolean().nullable(),
    avatar: z.string().nullable(),
  });

  toAdminUserSimple() {
    const raw = {
      id: this.id,
      username: this.username,
      email: this.email,
      is_active: this.is_active,
      last_login: this.last_login,
      isVerified: this.isVerified,
      avatar: this.avatar,
    };
    return AdminUserEntity.schema
      .omit({
        password: true,
      })
      .transform((data): AdminUserDomain.Simple => data)
      .parse(raw);
  }
}
