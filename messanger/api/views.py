from rest_framework.generics import ListAPIView
from django_filters import rest_framework as filters

from .filters import ChatFilter
from .serializers import MessageSerializer, ChatSerializer
from chat.models import Message, Chat


class GetMessageAPIView(ListAPIView):
    serializer_class = MessageSerializer
    queryset = Message.objects.order_by('-datetime')


class GetChatAPIView(ListAPIView):
    serializer_class = ChatSerializer
    queryset = Chat.objects.all()

    def get_queryset(self):
        users = self.request.GET.getlist('users')
        if users:
            if len(set(users)) == 1:
                return Chat.objects.filter(to_self=True)
            return Chat.objects.filter(users=users[0]).filter(users=users[1])
        return Chat.objects.all()
