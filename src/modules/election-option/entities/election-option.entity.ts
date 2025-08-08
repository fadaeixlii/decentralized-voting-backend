import { ElectionEntity } from 'src/modules/election/entities/election.entity';
import { ModifyEmbedded } from 'src/shared/typeorm/modify-embeded';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

// id: number (primary key, auto-increment, unique identifier)
// election_id: number (foreign key to Election.id, required, links to parent election)
// option_text: string (max length 100, required, e.g., "Candidate A")
// description: text (nullable, additional details about the option)
// created_at: timestamp (default current time)
// updated_at: timestamp (default current time, updates on change)

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
