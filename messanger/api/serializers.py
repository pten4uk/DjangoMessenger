from django.contrib.auth import get_user_model
from rest_framework import serializers

from chat.models import Message, Chat

User = get_user_model()


class MessageSerializer(serializers.ModelSerializer):
    author = serializers.IntegerField(source='author.id')

    class Meta:
        model = Message
        fields = ['author', 'text', 'chat', 'date', 'time']


class ChatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chat
        fields = ['id', 'users']


class ChatCreateSerializer(serializers.ModelSerializer):
    users = serializers.ListField()

    class Meta:
        model = Chat
        fields = ['users', 'to_self']

    def validate_users(self, data):
        pks = []
        if len(set(data)) == 1:
            pks.append(data[0])
        else:
            pks.append(data[0])
            pks.append(data[1])
        return pks


