import { ElectionEntity } from 'src/modules/election/entities/election.entity';
import { ModifyEmbedded } from 'src/shared/typeorm/modify-embeded';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

// id: number (primary key, auto-increment, unique identifier)
// username: string (unique, max length 50, required, used for login)
// password: string (hashed, max length 100, required, stored using bcrypt)
// email: string (unique, max length 100, required, for notifications or password recovery)
// is_active: boolean (default true, indicates if admin account is active)
// created_at: timestamp (default current time, tracks creation)
// updated_at: timestamp (default current time, updates on change)
// last_login: timestamp (nullable, tracks last login time for audit)

const tableName = 'admin_users';

@Entity(tableName)
export class AdminUserEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: number;

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
}
