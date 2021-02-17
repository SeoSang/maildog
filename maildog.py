import smtplib

from random import choice
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from option import Option, get_logger
from string import Template  
from fetchdog import FetchDog


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
    
    def _init(self):
        self.session = smtplib.SMTP('smtp.gmail.com')
        self.session.starttls()
        self._login_mail_server()
    
    def _load_parameter(self):
        self._opt =Option('conf.json') 
        self._logger = get_logger('MailDog')
    
    def _login_mail_server(self):
        self.session.login(self._opt.my_email, self._opt.password)
    
    def _get_template(self):
        breed = self.fd.get_random_breed()
        img_urls = self.fd.get_img_url_by_breed(breed, self.content_data.img_cnt)
        while not img_urls:
            breed = self.fd.get_random_breed()
            img_urls = self.fd.get_img_url_by_breed(breed, self.content_data.img_cnt)
        self._make_img_tags(img_urls)
        real_breed = self._get_breed_full_name(breed) 
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
        self.session.sendmail(self._opt.my_email, self._opt.target_email, self.content.as_string())
        self._logger.info("Sending Email complete!")
        
    @staticmethod
    def _get_breed_full_name(breed):
        if not "/" in breed:
            return breed
        last, first = breed.split("/")
        return f'{first} {last}'
        
            
        
    def run(self):
        self._logger.info("Hi, I am MailDog!")
        self._init()
        self._make_content()
        self._send_email()
        
if __name__ == '__main__':
    md = MailDog()
    md.run()