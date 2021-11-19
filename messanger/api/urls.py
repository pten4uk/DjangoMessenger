from django.urls import path

from .views import GetMessageAPIView, GetChatAPIView

urlpatterns = [
    path('messages/', GetMessageAPIView.as_view()),
    path('chat_list/', GetChatAPIView.as_view()),
]