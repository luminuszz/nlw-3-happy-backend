import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm'

@Entity('users')
export class User {
  @PrimaryGeneratedColumn({ type: 'uuid' })
  id: string

  @Column({ type: 'varchar', nullable: false })
  name: string

  @Column({ type: 'varchar', nullable: false })
  email: string

  @Column({ type: 'varchar', nullable: false })
  password: string

  @Column({ name: 'phone_number' })
  phoneNumber?: string

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @CreateDateColumn({ name: 'updated_at' })
  updateAt: Date
}
