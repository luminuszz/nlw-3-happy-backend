import { OrphanageImage } from '../../../modules/orphanages/infra/typeorm/entities/orphanageImage.entity'
import { Orphanage } from '../../../modules/orphanages/infra/typeorm/entities/orphanage.entity'
import { match } from 'assert'

export default class TestUtil {
  public static returnValidUser(): Orphanage {
    const newOrphanage = new Orphanage()

    newOrphanage.about = 'algo coisa de mock'
    newOrphanage.id = '1'
    newOrphanage.instructions = 'algo coisa de mock'
    newOrphanage.longitude = 20
    newOrphanage.latitude = 30

    newOrphanage.openOnWeekends = 'true'
    newOrphanage.openHours = 'das 15 as 8'

    return newOrphanage
  }

  public static returnValidImage(): OrphanageImage {
    const image = new OrphanageImage()

    const orphange = this.returnValidUser()

    Object.assign<OrphanageImage, OrphanageImage>(image, {
      id: Math.random.toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
      orphanage: orphange,
      orphanageId: '1',
      path: 'image2',
    })

    return image
  }
}
