from django.contrib import admin
from django.views.generic import TemplateView
from django.conf.urls import url
from django.urls import path
from urlapp.views import urlView, redirectView, oneUrlView

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^api/url/$', urlView.as_view()),
    url(r'^api/url/(?P<shortUrl>[\w-]+)/$', oneUrlView.as_view()),
    url(r'^(?P<shortUrl>[\w-]+)/$', redirectView.as_view()),
]
