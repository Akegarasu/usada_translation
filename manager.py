from celery import Celery

import processor
 
CELERY_BROKER_URL = 'redis://127.0.0.1:6379/0'
CELERY_RESULT_BACKEND = 'redis://127.0.0.1:6379/0'
cel = Celery("api", broker=CELERY_BROKER_URL, backend=CELERY_RESULT_BACKEND)

'''
测试用数据
a = 'きょうの　#みこ日記　🌸\nついついネット注文…予約…\nとまらなかったにぇ…(๑¯ω¯๑)\nそんな日もあるよね、うぬうぬ。\n\nきょう絵上手く書けた気がするにぇ！！！( • ̀ω•́  )✧'
src = {
    'userInfo':{
        'userName':'さくらみこ🌸Sakura Miko',
        'userId':'@sakuramiko35',
        'userIcon':'https://pbs.twimg.com/profile_images/1299122355449462785/WV45jldW_400x400.jpg'
        
    },
    'tweetData':{
        'original':a,
        'translation':'瞄哈喽🌸\n\n今天也要加了个油http://www.youtube.com',
        'images':["https://pbs.twimg.com/media/Eh4n0iHU4AIpU9X?format=jpg&name=medium"]
        
    },
    'template':'template/img/sanying3.png'
}
'''

@cel.task(time_limit=300, soft_time_limit=240, bind=True)
def run(self,src):
    pcs = processor.Manager(src)
    imgName = pcs.run()
    return imgName

def get_result(task_id):
    #通过任务id获取结果
    result = cel.AsyncResult(task_id)
    return result.result
