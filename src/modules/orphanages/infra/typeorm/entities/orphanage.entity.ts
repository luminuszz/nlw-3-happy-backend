import {
  Column,
  PrimaryGeneratedColumn,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm'
import { Exclude, Expose } from 'class-transformer'

import { OrphanageImage } from './orphanageImage.entity'
import { IOrphanagesExposeGetImagesUrlDTO } from '../../../dtos/OrphanagesExposeGetImagesUrlDTO'

@Entity('orphanages')
export class Orphanage {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column()
  latitude: number

  @Column()
  longitude: number

  @Column()
  about: string

  @Column()
  instructions: string

  @Column({ name: 'opening_hours' })
  openHours: string

  @Column({ name: 'open_on_weekends' })
  openOnWeekends: string

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date

  @OneToMany(() => OrphanageImage, orphanageImage => orphanageImage.orphanage)
  @JoinColumn({ name: 'orphanage_id' })
  @Exclude()
  orphanageImages: OrphanageImage[]

  @Expose({ name: 'imagesUrl' })
  get getImagesUrls(): IOrphanagesExposeGetImagesUrlDTO[] {
    const imagesUrl = this.orphanageImages.map(image => {
      return {
        id: image.id,
        path: `http://localhost:3000/files/${image.path}`,
      }
    })

    return imagesUrl
  }

  constructor(partial: Partial<Orphanage>) {
    Object.assign(this, partial)
  }
}
