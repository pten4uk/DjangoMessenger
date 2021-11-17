from rest_framework import serializers

from chat.models import Message, Chat


class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ['author', 'text', 'chat', 'date', 'time']


class ChatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chat
        fields = ['users']