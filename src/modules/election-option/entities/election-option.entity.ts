import { ElectionEntity } from 'src/modules/election/entities/election.entity';
import { ModifyEmbedded } from 'src/shared/typeorm/modify-embeded';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

const tableName = 'election-options';

@Entity(tableName)
export class ElectionOptionsEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: number;

  @ManyToOne(() => ElectionEntity, (election) => election.options, {
    nullable: false,
  })
  @JoinColumn()
  election: ElectionEntity;

  @Column({ type: 'varchar', length: 100 })
  option_text: string;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column(() => ModifyEmbedded)
  modify: ModifyEmbedded;
}
