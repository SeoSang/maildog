import os
import sqlite3
import pprint

from pathlib import Path
from pathlib import PurePosixPath

class DB():
  def __init__(self):
    self.connect_db()
    
  def connect_db(self):
    now = Path().resolve()
    dev_path = PurePosixPath(now).joinpath('web', 'server', 'db', 'config', 'dev.sqlite3')
    print(dev_path)
    path = '/db/prod.sqlite3' if os.environ.get('NODE_ENV') == 'prod' else dev_path
    self.db = sqlite3.connect(path)
  
  def get_breeds_data_by_name(self, breed):
    result = self.db.execute("SELECT * FROM breeds WHERE name = :name" , { "name": breed })
    breeds = result.fetchall()
    return breeds
    
  def run(self):
    pprint.pprint(self.get_breeds_data_by_name('Akita'))
  
if __name__=='__main__':
  db = DB()
  db.run()
