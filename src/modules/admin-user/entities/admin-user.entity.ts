import { ElectionEntity } from 'src/modules/election/entities/election.entity';
import { ModifyEmbedded } from 'src/shared/typeorm/modify-embedded';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

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
