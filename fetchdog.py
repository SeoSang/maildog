import requests

import ujson
import pprint

RANDOM_DOG = "https://dog.ceo/api/breeds/image/random"
ALL_BREEDS = "https://dog.ceo/api/breeds/list/all"


class FetchDog():
  def __init__(self):
    self.breeds = []
  
  def _get_all_breeds(self):
    response = requests.get(ALL_BREEDS)
    temp = ujson.loads(response.text)
    for breed, sub_breeds in temp['message'].items():
      if len(sub_breeds) == 0:
        self.breeds.append(breed)
      else:
        for sub_breed in sub_breeds:
          self.breeds.append(sub_breed + " " + breed)
    pprint.pprint(self.breeds)
    
    
if __name__ == '__main__':
  fd = FetchDog()
  fd._get_all_breeds()