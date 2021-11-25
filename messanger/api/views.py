import json

from rest_framework.generics import ListAPIView
from django_filters import rest_framework as filters
from rest_framework.response import Response
from rest_framework.views import APIView

from .filters import MessageFilter
from .serializers import MessageSerializer, ChatSerializer, ChatCreateSerializer
from chat.models import Message, Chat


def get_qs(users):
    if users:
        if len(set(users)) == 1:
            return Chat.objects.filter(users=users[0], to_self=True).first(), False

        return Chat.objects.filter(users=users[0]).filter(users=users[1]).first(), False
    return Chat.objects.all(), True


class GetMessageAPIView(ListAPIView):
    serializer_class = MessageSerializer
    queryset = Message.objects.order_by('datetime')
    filter_backends = [filters.DjangoFilterBackend]
    filterset_class = MessageFilter


class GetChatAPIView(APIView):
    def get_queryset(self):
        users = self.request.GET.getlist('users')
        return get_qs(users)

    def get(self, request):
        qs, is_list = self.get_queryset()
        serializer = ChatSerializer(qs, many=is_list)
        return Response(serializer.data)


class CreateChatAPIView(APIView):
    def post(self, request):
        chat = ChatCreateSerializer(data=request.data)

        if chat.is_valid(raise_exception=True):
            new_chat = chat.save()
            obj = {
                "chat_id": new_chat.pk
            }

        return Response(data=obj, status=201)



