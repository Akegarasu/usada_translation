from flask import Flask, request, jsonify
from manager import *
#from celery_task import *

app = Flask(__name__)

@app.route('/api/auto', methods=['POST'])
def add_auto():
    if request.json:
        task = request.json
        result = run.delay(task)
        return jsonify({'task_id': result.id})

@app.route('/api/get_task=<string:task_id>', methods=['GET'])
def get_task_result(task_id):
    result = {'task_id': task_id,
              'state': cel.AsyncResult(task_id).state,
              'result': cel.AsyncResult(task_id).result}
    return jsonify(result)

if __name__ == "__main__":
    app.run()