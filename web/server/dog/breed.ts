import { mapErrorResult } from '@/server/db/util'
import { Breed } from '@/server/dog/dogapi/breed'
import { BeAxiosResult } from '@/server/types'
import beAxios from '@/src/utils/axios'

export const loadBreed = async (
  breedId: string,
): Promise<BeAxiosResult<Breed>> => {
  try {
    const res = await beAxios.get(`/breed/${breedId}`)
    return {
      success: true,
      message: 'load Breed success.',
      data: res.data.breed,
    }
  } catch (e) {
    console.error(e)
    return mapErrorResult(e)
  }
}
