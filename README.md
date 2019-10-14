# Url-shortener

RESTful API that will take any URL
and create a shorter version of it, so it’s easier to remember/use/share.

Backend - Django <br/>
Frontend - React <br/>
## Stack

Django, PostgreSQL (database), Python3, React,

## Setup

Clone this repository or download zip.<br/>

#### Requirements

You need to have docker, docker-compose, Python3 and npm installed

For testing purposes I suggest Postman.<br/>
There is a 'UrlShortener.postman_collection.json' with examples od GET,POST,DELETE methods.<br/>

#### Run backend:<br/>

```
docker-compose run web python3 manage.py makemigrations 
docker-compose run web python3 manage.py migrate
docker-compose run web python3 manage.py createsuperuser
```
\*In Postman examples I'm using <br/>
```
username: admin
password: Pass123

```
```
docker-compose up
```
#### Run frontend:<br/>
```
npm i
npm start
```
#### Run all:<br/>
*at the moment not working but I'll fix it*
```
npm i
npm run-script build
docker-compose run web python3 manage.py collectstatic
docker-compose build
docker-compose up
```

## API

You can use these APIs to create, delete and get URLs.<br/>

GET - for redirect
```
http://127.0.0.1:8000/r/{shorturl}/
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
