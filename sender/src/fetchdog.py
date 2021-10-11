# -*- coding: utf-8 -*-

import os
import json
from pprint import pprint
from random import choice, randint

import ujson
import requests

from urllib.parse import urlparse
from urllib.parse import parse_qs

from option import Option, get_logger

RANDOM_DOG_DOGCEO = 'https://dog.ceo/api/breeds/image/random'
ALL_BREEDS_DOGCEO = 'https://dog.ceo/api/breeds/list/all'
DUMMY_IMAGE_URL = 'https://dummyimage.com/600x400/000/fff'


class FetchDog():
  def __init__(self):
    self.breeds = []
    self._logger = get_logger('MailDog')
    # self.contents = Option(f'{os.path.dirname(os.path.realpath(__file__))}/conf/content.json')
    # self._get_all_breeds()
    self.conf = Option(f'{os.path.dirname(os.path.realpath(__file__))}/fetchdog_conf.json')
    self.name_to_id_breeds = Option(f'{os.path.dirname(os.path.realpath(__file__))}/nameToIdBreeds.json')
    self.id_to_name_breeds = Option(f'{os.path.dirname(os.path.realpath(__file__))}/idToNameBreeds.json')


  def _get_all_breeds(self):
    """Fetch all breeds which can get from api (dogceo).
    """
    response = requests.get(ALL_BREEDS_DOGCEO)
    while response.status_code != 200:
      response = requests.get(ALL_BREEDS_DOGCEO)

    temp = ujson.loads(response.text)
    for breed, sub_breeds in temp['message'].items():
      if len(sub_breeds) == 0:
        self.breeds.append(breed)
      else:
        for sub_breed in sub_breeds:
          self.breeds.append(f'{breed}/{sub_breed}')
    if self.contents.filter:
      self._filter_by_conf()

  def _filter_by_conf(self):
    if self.contents.breed_to_select: # select breed only in 'breed_to_select'
      self.breeds = list(filter(lambda x: x in self.contents.breed_to_select, self.breeds))
    else:
      self.breeds = list(filter(lambda x: x not in self.contents.breed_to_exclude, self.breeds))
    print("[INFO] filtered = ", self.breeds)

  def get_random_breed(self):
    random_breed = choice(self.breeds)
    self._logger.info(random_breed)
    return random_breed

  def get_img_url_by_breed(self, breed, count=1, index=None, api=2):
    """Get img_url by certain breed.

    Args:
      breed (str) : breed of dog
      count (int) : how many img you will get
      index (int) : for sequence
      api (int) :
                  1 - dogceo
                  2 - dogapi

    Return:
      result (str[]) : list of img_urls
    """
    if api == 1:
      return self.get_img_url_by_breed_dogceo(breed, count, index)
    if api == 2:
      return self.get_img_url_by_breed_dogapi(breed, count)
    return []

  def get_img_url_by_breed_dogceo(self, breed, count, index=None):
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
  
  def get_img_url_by_breed_dogapi(self, breed, count):
    response = requests.get(f'https://api.thedogapi.com/v1/images/search', 
                              headers={'x-api-key': self.conf.dogapi_api_key},
                              params={'breed_id': self.name_to_id_breeds[breed], 'limit': count})
    temp = ujson.loads(response.text)
    result = list(map(lambda res: res.get('url', DUMMY_IMAGE_URL), temp))
    return result
  
  def get_data_by_breed_dogapi(self, breed, count):
    response = requests.get(f'https://api.thedogapi.com/v1/images/search', 
                              headers={'x-api-key': self.conf.dogapi_api_key},
                              params={'breed_id': self.name_to_id_breeds[breed], 'limit': count})
    return list(ujson.loads(response.text))

  def get_img_by_random(self, count=1):
    """Get img_url by random.
    """
    response = requests.get(RANDOM_DOG_DOGCEO + '/' + str(count))
    while response.status_code != 200:
      response = requests.get(RANDOM_DOG_DOGCEO + '/' + str(count))
    temp = ujson.loads(response.text)
    result = temp.get("message", [])
    if isinstance(result, str):
      result = [result]
    return result

  @staticmethod
  def _get_breed_full_name(breed):
      if not "/" in breed:
          return breed
      last, first = breed.split("/")
      return f'{first} {last}'


if __name__ == '__main__':
  fd = FetchDog()
  print(fd.get_data_by_breed_dogapi(breed='Akita', count=1))