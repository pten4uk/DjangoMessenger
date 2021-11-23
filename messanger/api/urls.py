from django.urls import path

from .views import GetMessageAPIView, GetChatAPIView, CreateChatAPIView

urlpatterns = [
    path('messages/', GetMessageAPIView.as_view()),
    path('chat_list/', GetChatAPIView.as_view()),
    path('chat_create/', CreateChatAPIView.as_view()),
]