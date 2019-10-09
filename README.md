# Url-shortener

RESTful API  that will take any URL
and create a shorter version of it, so it’s easier to remember/use/share.

## Stack
Django, PostgreSQL (database)

## Setup

Clone this repository or download zip.<br/>

#### Requirements
You need to have docker, docker-compose and Python3 installed

For testing purposes I suggest Postman.<br/>
There is a 'UrlShortener.postman_collection.json' with examples od GET,POST,DELETE methods.<br/>


#### Run:<br/>
```
docker-compose up
```

Create superuser:<br/>
```
docker-compose run web python3 manage.py createsuperuser
```
*In Postman examples I'm using <br/>
```
username: admin
password: Pass123
```
## API
You can use these APIs to create, delete and get URLs.<br/>

GET - for redirect
```
http://127.0.0.1:8000/{shorturl}/
```
POST
```
http://127.0.0.1:8000/api/url/
```
GET all - Admin required 
```
http://127.0.0.1:8000/api/url/
```
GET/DELETE - Admin required 
```
http://127.0.0.1:8000/api/url/{shorturl}/
```
