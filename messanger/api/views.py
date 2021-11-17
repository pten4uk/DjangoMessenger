from rest_framework.generics import ListAPIView

from .serializers import MessageSerializer, ChatSerializer
from chat.models import Message, Chat


class MessageAPIView(ListAPIView):
    serializer_class = MessageSerializer
    queryset = Message.objects.all()


class ChatAPIView(ListAPIView):
    serializer_class = ChatSerializer
    queryset = Chat.objects.all()
