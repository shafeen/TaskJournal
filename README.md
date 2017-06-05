# TaskJournal
A Task Journal where you can tag things.

---

### API

Tasks:
- ***`GET`*** - `/task/`  
- ***`GET`*** - `/task/date/:date`  
- ***`POST`*** - `/task/create`
  + `description`
  + `date`
  + `tags`
- ***`POST`*** - `/task/delete`  
  + `taskId`
- ***`POST`*** - `/task/modify`  
  + `taskId`
  + `description`
  + `date`
  + `tags`

Tags:
- ***`GET`*** - `/tags/`  
- ***`POST`*** - `/tags/add/task/:task_id`
  + `tag_description`
- ***`POST`*** - `/tags/delete/task/:task_id`
  + `tag_id`
