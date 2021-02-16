# -*- coding: utf-8 -*-
import smtplib
from email.mime.text import MIMEText
from option import Option, get_logger


class MailDog():
    def __init__(self):
        self.session = smtplib.SMTP('smtp.gmail.com')
        self._load_parameter()
        self.content = None
        
    def _init(self):
        self.session.starttls()
    
    def _load_parameter(self):
        self._opt =Option('conf.json') 
        self._logger = get_logger('MailDog')
    
    def _login_mail_server(self):
        self.session.login(self._opt.my_email, self._opt.password)
    
    def _make_content(self):        
        self.content = MIMEText('내용 테스트입니다.')
        self.content['Subject'] = '제목 테스트입니다.'
    
    def _send_email(self):
        if not self.content:
            self._logger.error("No Contents!")
            return
        self.session.sendmail(self._opt.my_email, self._opt.target_email, self.content.as_string())
        self._logger.info("Sending Email complete!")
        
    def run(self):
        self._logger.info("Hi, I am MailDog!")
        self._init()
        self._login_mail_server()
        self._make_content()
        self._send_email()
        
if __name__ == '__main__':
    md = MailDog()
    md.run()