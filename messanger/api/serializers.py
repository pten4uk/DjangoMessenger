from rest_framework import serializers

from chat.models import Message, Chat


class MessageSerializer(serializers.ModelSerializer):
    author = serializers.CharField(source='author.id')

    class Meta:
        model = Message
        fields = ['author', 'text', 'chat', 'date', 'time']


class ChatSerializer(serializers.ModelSerializer):
    messages = serializers.SerializerMethodField()

    def get_messages(self, obj):
        return obj.messages.values_list('author', 'text', 'datetime')

    class Meta:
        model = Chat
        fields = ['id', 'users', 'messages']
