import { subService } from '@/api/manual/configs/sub-service'

const exampleSubService = {
  getExample() {
    return subService.get({ url: `/api` })
  }
}

export default exampleSubService
