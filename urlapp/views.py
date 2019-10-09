from django.shortcuts import get_object_or_404, HttpResponseRedirect
from django.http import HttpResponse
from rest_framework.permissions import IsAdminUser, AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from django.db import IntegrityError, Error
from .models import UrlModel
from .serializers import UrlSerializer
import random
import hashlib
import urllib


from rest_framework import status


def createShortUrl(param):
    size = random.randint(1, 6)
    hash_object = hashlib.md5(param.encode('ascii'))
    return hash_object.hexdigest()[:size]


def getUnitqueShortUrl(origUrl):
    try:
        obj, created = UrlModel.objects.get_or_create(
            originalUrl=origUrl, defaults={'shortUrl': createShortUrl(origUrl)})
    except IntegrityError:
        getUnitqueShortUrl(origUrl)
    else:
        return obj.shortUrl

class urlView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        if(request.user.is_superuser):
            url = UrlModel.objects.all()
            serializer_class = UrlSerializer(url, many=True)
            return Response(serializer_class.data)
        else:
            return HttpResponse('Unauthorized', status=401)

    def post(self, request):
        urlList = []
        originalUrlList = request.data['originalUrl']
        for origUrl in originalUrlList:
            urlList.append(
                {'originalUrl': origUrl, 'shortUrl': getUnitqueShortUrl(origUrl)})
        serializer = UrlSerializer(urlList, many=True)
        return Response(serializer.data)


class oneUrlView(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request, shortUrl=None):
        url = get_object_or_404(UrlModel, shortUrl=shortUrl)
        serializer_class = UrlSerializer(url)
        return Response(serializer_class.data)

    def delete(self, request, shortUrl=None):
        obj = get_object_or_404(UrlModel, shortUrl=shortUrl)
        obj.delete()
        return HttpResponse('Deleted')


class redirectView(APIView):
    permission_classes = [AllowAny]
    def get(self, request, shortUrl=None):
        obj = get_object_or_404(UrlModel, shortUrl=shortUrl)
        origUrl = urllib.parse.unquote(obj.originalUrl)
        return HttpResponseRedirect(origUrl)
