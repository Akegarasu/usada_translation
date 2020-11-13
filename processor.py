from datetime import datetime
from os import mkdir
from os.path import isdir
import time
import json
#from retrying import retry
import time
from urllib import parse
import json
from selenium import webdriver
from selenium.webdriver.chrome.webdriver import Options
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By

import os,re
import base64

'''
传入：dict
{
    'userInfo':{'userName':xxx,'userId':xxx,userIcon:'图像路径'},
    'tweetData':{'original':xxx,'translation':xxx,'images':[xxx,xxx]},
    'template':{}
}
'''

class Manager:
    def __init__(self,cfg):
        self.g = cfg
        self.url = 'http://test.qiuye.ink'
    
    def run(self):
        self.driver = self.createWebdriver()
        self.driver.get(self.url)
        self.format()
        self.manage()
        self.res = self.makeImg()
        print(self.res)
        self.driver.quit()
        return self.res

    def format(self):
        self.g['tweetData']['original'] = re.sub('\n','<br>', self.g['tweetData']['original'], count=0, flags=0)
        self.g['tweetData']['translation'] = re.sub('\n','<br>', self.g['tweetData']['translation'], count=0, flags=0)

    def createWebdriver(self):
        chrome_options = Options()
        chrome_options.add_argument("--headless")
        chrome_options.add_argument('--no-sandbox')
        chrome_options.add_argument('--disable-gpu')
        chrome_options.add_argument('--disable-dev-shm-usage')
        driver = webdriver.Chrome(options=chrome_options)
        return driver

    def cmdMaker(self):
        reNameCmd = f"document.getElementById('nickname').innerHTML= twemoji.parse('{self.g['userInfo']['userName']}')"
        reIdCmd = f"document.getElementById('twitterid').innerHTML= '{self.g['userInfo']['userId']}'"
        reIconCmd = f"document.getElementById('headimg').src= '{self.g['userInfo']['userIcon']}'"
        reOriginCmd = f"reCmd('orgintext','{self.g['tweetData']['original']}')"
        reTranslaterCmd = f"document.getElementById('translaterimg').src= '{self.g['template']}'"
        reTranslationCmd =  f"reCmd('translatedtext','{self.g['tweetData']['translation']}')"
        
        #Todo:完善时间
        #reTimeCmd = f"document.getElementById('translatedtext').innerHTML= twemoji.parse('{self.g['tweetData']['translation']}')"
        
        cmdList = [reNameCmd,reIdCmd,reIconCmd,reOriginCmd,reTranslaterCmd,reTranslationCmd]
        if self.g['tweetData']['images']!=[]:
            aimglist=[]
            for x in self.g['tweetData']['images']:
                aimglist.append(f'"{x}"')
            reOriginCmd = 'var imgs=['+','.join(aimglist)+'];imgShow(imgs);'
            #reOriginCmd = f"document.getElementById('contentimg').src= '{self.g['tweetData']['images'][0]}'"
            #reOriginCmd = reOriginCmd+
            print(reOriginCmd)
            cmdList.append(reOriginCmd)
        else:
            #reOriginCmd = f"document.getElementById('imgrow').remove()"
            #cmdList.append(reOriginCmd)
            #Todo：完善多图片
            pass
        return cmdList

    def manage(self):
        cmd = self.cmdMaker()
        for x in cmd:
            self.driver.execute_script(x)
    
    def makeImg(self):
        self.driver.execute_script('''
            window.pageYoffset = 0;
            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;
            ''')
        time.sleep(1)
        self.driver.execute_script(f"imgOutput()")
        fileName = str(int(round(time.time() * 1000))) + "a"
        time.sleep(1)
        print('0')
        b6 = self.driver.execute_script(f"return reta()")
        img = base64.b64decode(b6[21:])
        with open('./frontend/cache/'+fileName+'.png','wb') as file:
            file.write(img)
        return fileName

def find(data,src):
    reg = re.compile(src)
    rlist = reg.findall(data)
    return rlist
#测试用数据
a = 'きょうの　#みこ日記　🌸\nついついネット注文…予約…\nとまらなかったにぇ…(๑¯ω¯๑)\nそんな日もあるよね、うぬうぬ。\n\nきょう絵上手く書けた気がするにぇ！！！( • ̀ω•́  )✧'
task = {
    'userInfo':{
        'userName':'さくらみこ🌸Sakura Miko',
        'userId':'@sakuramiko35',
        'userIcon':'https://pbs.twimg.com/profile_images/1299122355449462785/WV45jldW_400x400.jpg'
        
    },
    'tweetData':{
        'original':a,
        'translation':'瞄哈喽🌸\n\n今天也要加了个油http://www.youtube.com',
        'images':["https://pbs.twimg.com/media/Eh5XLXzUYAEP9M0?format=jpg&name=small","https://pbs.twimg.com/media/Eh5XL4fVkAAj7T6?format=jpg&name=large"]
    },
    'template':'template/img/sanying3.png'
}

if __name__ == '__main__':
    pcs = Manager(task)
    result = pcs.run()