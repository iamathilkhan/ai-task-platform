import os
import json
import time
import datetime
from pymongo import MongoClient
from bson.objectid import ObjectId
from redis import Redis
from dotenv import load_dotenv

load_dotenv()

def get_current_time():
    return datetime.datetime.now(datetime.timezone.utc)

def log(message):
    print(f"[{datetime.datetime.now().isoformat()}] {message}", flush=True)

def main():
    mongo_uri = os.environ.get("MONGO_URI")
    redis_url = os.environ.get("REDIS_URL")

    if not mongo_uri or not redis_url:
        log("Error: MONGO_URI and REDIS_URL must be set in the environment.")
        return

    try:
        mongo_client = MongoClient(mongo_uri)
        # get_default_database() reads the DB name from the URI;
        # fall back to 'ai_task_db' when none is specified in the URI.
        try:
            db = mongo_client.get_default_database()
        except Exception:
            db = mongo_client.get_database('ai_task_db')
        tasks_collection = db["tasks"]
        log("Connected to MongoDB successfully.")
    except Exception as e:
        log(f"Failed to connect to MongoDB: {e}")
        return

    try:
        redis_client = Redis.from_url(redis_url)
        redis_client.ping()
        log("Connected to Redis successfully.")
    except Exception as e:
        log(f"Failed to connect to Redis: {e}")
        return

    # BullMQ v5+ stores waiting jobs under the 'waiting' list key
    queue_key = "bull:task-queue:waiting"
    log(f"Listening for jobs on Redis key: {queue_key}")

    while True:
        try:
            # BLPOP with 5 second timeout
            result = redis_client.blpop([queue_key], timeout=5)
            
            if result:
                _, job_data_bytes = result
                job_data_str = job_data_bytes.decode('utf-8')
                
                job_id = job_data_str
                task_id = None
                
                # Try parsing as JSON first in case the raw payload was pushed directly
                try:
                    parsed = json.loads(job_data_str)
                    if isinstance(parsed, dict) and 'taskId' in parsed:
                        task_id = parsed['taskId']
                except ValueError:
                    pass
                
                # If it wasn't raw JSON, then job_data_str is the job ID.
                # In BullMQ, task arguments are stored in the job hash under the "data" field
                if not task_id:
                    # Depending on BullMQ version, format could have extra prefixes, but standard is bull:{queue}:{id}
                    hash_key = f"bull:task-queue:{job_id}"
                    job_hash_data = redis_client.hget(hash_key, "data")
                    if job_hash_data:
                        job_json = json.loads(job_hash_data.decode('utf-8'))
                        task_id = job_json.get('taskId')

                if not task_id:
                    log(f"Could not extract taskId from queue item: {job_data_str}")
                    continue

                process_task(tasks_collection, task_id)

        except Exception as e:
            log(f"Worker loop error: {e}")
            time.sleep(1)


def process_task(collection, task_id):
    log(f"Processing task ID: {task_id}")
    try:
        task = collection.find_one({"_id": ObjectId(task_id)})
        if not task:
            log(f"Task {task_id} not found in MongoDB")
            return
            
        # 2. Update status to "running", push log
        collection.update_one(
            {"_id": ObjectId(task_id)},
            {
                "$set": {"status": "running"},
                "$push": {"logs": {"message": "Processing started", "timestamp": get_current_time()}}
            }
        )
        log(f"Task {task_id} status updated to 'running'")
        
        # 3. Run operation
        operation = task.get("operation")
        input_text = task.get("inputText", "")
        
        if operation == "uppercase":
            result = input_text.upper()
        elif operation == "lowercase":
            result = input_text.lower()
        elif operation == "reverse":
            result = input_text[::-1]
        elif operation == "wordcount":
            result = f"{len(input_text.split())} words"
        else:
            raise ValueError(f"Unknown operation: {operation}")
            
        # 4. Update task: status="success", result=result, push log
        collection.update_one(
            {"_id": ObjectId(task_id)},
            {
                "$set": {"status": "success", "result": result},
                "$push": {"logs": {"message": "Completed", "timestamp": get_current_time()}}
            }
        )
        log(f"Task {task_id} completed successfully")
        
    except Exception as e:
        # 5. On ANY exception: status="failed", push log
        log(f"Error while processing task {task_id}: {e}")
        try:
            collection.update_one(
                {"_id": ObjectId(task_id)},
                {
                    "$set": {"status": "failed"},
                    "$push": {"logs": {"message": str(e), "timestamp": get_current_time()}}
                }
            )
            log(f"Task {task_id} marked as failed in MongoDB")
        except Exception as mongo_err:
            log(f"Failed to update task {task_id} failure status in MongoDB: {mongo_err}")

if __name__ == "__main__":
    main()
