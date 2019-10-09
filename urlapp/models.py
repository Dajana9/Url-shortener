from django.db import models


class UrlModel(models.Model):
    originalUrl = models.CharField(max_length=300, unique=True)
    shortUrl = models.CharField(max_length=6, unique=True)

    def __str__(self):
        return self.shortUrl
