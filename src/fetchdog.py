# -*- coding: utf-8 -*-
from random import choice, randint

import ujson
import requests

from option import Option, get_logger

RANDOM_DOG = 'https://dog.ceo/api/breeds/image/random'
ALL_BREEDS = 'https://dog.ceo/api/breeds/list/all'


class FetchDog():
  def __init__(self):
    self.breeds = []
    self._logger = get_logger('MailDog')
    self.contents = Option('conf/content.json')
    self._get_all_breeds()
    
  
  def _get_all_breeds(self):
    """Fetch all breeds which can get from api.
    """
    response = requests.get(ALL_BREEDS)
    while response.status_code != 200:
      response = requests.get(ALL_BREEDS)
        
    temp = ujson.loads(response.text)
    for breed, sub_breeds in temp['message'].items():
      if len(sub_breeds) == 0:
        self.breeds.append(breed)
      else:
        for sub_breed in sub_breeds:
          self.breeds.append(f'{breed}/{sub_breed}')
  
  def get_random_breed(self):
    random_breed = choice(self.breeds)
    self._logger.info(random_breed)
    return random_breed
  
  def get_img_url_by_breed(self, breed, count=1, index=None):
    """Get img_url by certain breed. 
    
    Args:
      breed (str) : breed of dog
      count (int) : how many img you will get
      index (int) : for sequence 
      
    Return:
      result (str[]) : list of img_urls
    """
    if index:
      index =randint(0, len(self.breeds)-1)
      breed = self.breeds[index]
      
    url = f'https://dog.ceo/api/breed/{breed}/images/random/{count}'
    response = requests.get(url)
    while response.status_code != 200:
      response = requests.get(url)
    temp = ujson.loads(response.text)
    img_urls = temp.get("message", [])
    if isinstance(img_urls, str):
      if img_urls.startswith('Breed not found'):
        return False
      img_urls = [img_urls]
    self._logger.info(img_urls)
    return img_urls

  def get_img_by_random(self, count=1):
    """Get img_url by random. 
    """
    response = requests.get(RANDOM_DOG + '/' + str(count))
    while response.status_code != 200:
      response = requests.get(RANDOM_DOG + '/' + str(count))
    temp = ujson.loads(response.text)
    result = temp.get("message", [])
    if isinstance(result, str):
      result = [result]
    return result
    
    
    
if __name__ == '__main__':
  fd = FetchDog()
  fd._get_all_breeds()