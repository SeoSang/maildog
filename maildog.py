import time
import smtplib
from random import choice
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


import fire
import schedule

from option import Option, get_logger
from string import Template  
from fetchdog import FetchDog

pid_file = '/var/run/maildog.pid'

class MailDog():
    def __init__(self):
        self._load_parameter()
        self.fd = FetchDog()
        self.hearts = [
            '❤','🧡','💛','💚','💙','💙','💜',
            '🖤','🤎','💕','💞','💓','💗','💖',
            '💘','💝','💟'
            ]
        self.content = None
        self.img_tags = ""
        self.content_data = Option('content.json')
    
    def _init(self, breed=None, cnt=None):
        if not breed:
            breed = self.fd.get_random_breed()
        if not cnt:
            cnt = self.content_data.img_cnt
        self.cnt = cnt
        self.breed = breed
        self.session = smtplib.SMTP_SSL('smtp.gmail.com', 465)
        self._login_mail_server()
    
    def _load_parameter(self):
        self._opt =Option('conf.json') 
        self._logger = get_logger('MailDog')
    
    def _login_mail_server(self):
        self.session.login(self._opt.my_email, self._opt.password)
    
    def _get_template(self):
        img_urls = self.fd.get_img_url_by_breed(self.breed, self.cnt)
        while not img_urls:
            self.breed = self.fd.get_random_breed()
            img_urls = self.fd.get_img_url_by_breed()
        self._make_img_tags(img_urls)
        real_breed = self._get_breed_full_name(self.breed) 
        template = Template(
            """
                <html>
                    <head></head>
                        <body>
                            <h1>${NAME} 님을 위한 강아지가 도착했습니다 💌</h1>
                            <br>
                            <hr class="one"/>
                            <h3>🌟오늘의 강아지 : ${breed}🌟</h3>
                            <br/>
                            <h2>${text}</h2>
                            ${imgs}
                            <br/>
                            <h3>${breed} 에 대한 더 자세한 정보는
                                <a href="https://www.pinterest.co.kr/search/pins/?q=${breed}" target="_blank">여기</a>
                                를 통해 볼 수 있습니다!
                            </h3>
                        </body>
                </html>
            """)
        template_params = {
            'NAME': self._opt.target_name,
            'imgs': self.img_tags,
            'breed': real_breed,
            'text': choice(self.content_data.text) % real_breed
        }
        template = template.safe_substitute(**template_params) 
        return template
    
    
    def _make_content(self):
        today_heart = choice(self.hearts)       
        title = f'<{today_heart}오늘의 강아지 도착{today_heart}>'
        template = self._get_template()
        self.content = MIMEMultipart()
        self.content.attach(MIMEText(template, 'html'))
        self.content['Subject'] = title
    
    def _make_img_tags(self, img_urls):
        self.img_tags = ""
        for img_url in img_urls:
            self.img_tags += f"""<img src="{img_url}" width="480" height="360">"""
        
    
    def _send_email(self):
        if not self.content:
            self._logger.error("No Contents!")
            return
        for target_email in self._opt.target_emails:
            self.session.sendmail(self._opt.my_email, target_email, self.content.as_string())
            self._logger.info("Sending Email complete!")
        
    @staticmethod
    def _get_breed_full_name(breed):
        if not "/" in breed:
            return breed
        last, first = breed.split("/")
        return f'{first} {last}'
    
    def random(self):
        self._logger.info("Hi, I am MailDog! You got a Random dog email!")
        self._init()
        self._make_content()
        self._send_email()
        
    def breed(self, breed="labrador", cnt=8):
        self._logger.info(f"Hi, I am MailDog! You got a {breed} email!")
        self._init(breed, cnt)
        self._make_content()
        self._send_email()
    
    def run_everyday(self, send_time):
        schedule.every().day.at(send_time).do(self.random)
        while True:
            schedule.run_pending()
            time.sleep(1)
    
        
if __name__ == '__main__':
    fire.Fire(MailDog)
