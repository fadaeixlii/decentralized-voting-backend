import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class ModifyEmbedded {
  @Column({ nullable: true })
  createdBy: string;

  @Column({ nullable: true })
  lastChangedBy?: string;

  @Column({ nullable: true })
  deletedBy?: string;

  @Column({ type: 'text', nullable: true })
  internalComment?: string;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt!: Date;

  @DeleteDateColumn({ type: 'timestamptz', default: null })
  deletedAt?: Date;
}
