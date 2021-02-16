# -*- coding: utf-8 -*-
import random

import ujson
import pprint
import requests

RANDOM_DOG = 'https://dog.ceo/api/breeds/image/random'
ALL_BREEDS = 'https://dog.ceo/api/breeds/list/all'


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
          self.breeds.append(sub_breed + ' ' + breed)
    pprint.pprint(self.breeds)
  
  def get_img_url_by_breed(self, breed, count=1, index=None):
    if index:
      index = random.randint(0, len(self.breeds)-1)
      breed = self.breeds[index]
      
    url = f'https://dog.ceo/api/breed/{breed}/images/random/{count}'
    response = requests.get(url)
    temp = ujson.loads(response.text)
    result = temp.get("message", [])
    if isinstance(result, str):
      result = [result]
    return result

  def get_img_by_random(self, count=1):
    response = requests.get(RANDOM_DOG + '/' + str(count))
    temp = ujson.loads(response.text)
    result = temp.get("message", [])
    if isinstance(result, str):
      result = [result]
    return result
    
    
    
if __name__ == '__main__':
  fd = FetchDog()
  fd._get_all_breeds()