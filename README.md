# usada_translation
## 项目目前处于接近弃坑的阶段...  
总之先把processor.py补上了 能用.jpg 文档应该不会写了 
手写样式很麻烦 找到了新的简易烤推方法 [akiba_translation正在开发中](https://github.com/Akegarasu/akiba_translation)  
一个极简烤推机 轻量级易部署
## 部署方法：  
nginx部署fronted  
运行celeRun.sh和guniRun.sh  
修改processor.py中的`self.url = 'http://test.qiuye.ink'`为你部署的前端url
## 环境依赖
	celery
	selenium
	flask