from django.urls import re_path, path

from .consumers import ChatConsumer

websocket_urlpatterns = [
    path('connect/', ChatConsumer.as_asgi()),
]
