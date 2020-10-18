import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm'
import { Orphanage } from './orphanage.entity'

@Entity('images')
export class OrphanageImage {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column('varchar')
  path: string

  @Column('uuid', { name: 'orphanage_id' })
  orphanageId: string

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date

  @ManyToOne(() => Orphanage)
  @JoinColumn({ name: 'orphanage_id', referencedColumnName: 'id' })
  orphanage: Orphanage
}
