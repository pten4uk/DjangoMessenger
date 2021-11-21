from rest_framework.generics import ListAPIView
from django_filters import rest_framework as filters
from rest_framework.response import Response
from rest_framework.views import APIView

from .filters import MessageFilter
from .serializers import MessageSerializer, ChatSerializer
from chat.models import Message, Chat


class GetMessageAPIView(ListAPIView):
    serializer_class = MessageSerializer
    queryset = Message.objects.order_by('datetime')
    filter_backends = [filters.DjangoFilterBackend]
    filterset_class = MessageFilter


class GetChatAPIView(APIView):
    def get_queryset(self):
        users = self.request.GET.getlist('users')
        if users:
            if len(set(users)) == 1:
                return Chat.objects.filter(users=users[0], to_self=True).first(), False

            return Chat.objects.filter(users=users[0]).filter(users=users[1]).first(), False
        return Chat.objects.all(), True

    def get(self, request):
        qs, is_list = self.get_queryset()
        serializer = ChatSerializer(qs, many=is_list)
        return Response(serializer.data)

