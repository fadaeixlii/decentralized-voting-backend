import { AdminUserEntity } from 'src/modules/admin-user/entities/admin-user.entity';
import { ElectionOptionsEntity } from 'src/modules/election-option/entities/election-option.entity';
import { ModifyEmbedded } from 'src/shared/typeorm/modify-embeded';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

const tableName = 'elections';

@Entity(tableName)
export class ElectionEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: number;

  @Column({ type: 'varchar', length: 100 })
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ type: 'timestamptz', nullable: true })
  start_date: Date;

  @Column({ type: 'timestamptz', nullable: true })
  end_date: Date;

  @ManyToOne(() => AdminUserEntity, (admin) => admin.elections, {
    nullable: false,
  })
  @JoinColumn()
  created_by: AdminUserEntity;

  @Column({
    type: 'enum',
    enum: ['draft', 'active', 'closed'],
    default: 'draft',
  })
  status: string;

  @Column({ type: 'varchar', length: 42, nullable: true })
  contract_address: string;

  @Column({ type: 'int', nullable: true })
  max_votes: number;

  @OneToMany(() => ElectionOptionsEntity, (option) => option.election)
  options: ElectionOptionsEntity[];

  @Column(() => ModifyEmbedded)
  modify: ModifyEmbedded;
}
