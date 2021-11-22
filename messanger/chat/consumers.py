import json

from channels.db import database_sync_to_async
from channels.generic.websocket import AsyncWebsocketConsumer
from django.contrib.auth import get_user_model

from .models import Message, Chat

User = get_user_model()


class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):

        await self.channel_layer.group_add(
            'users',
            self.channel_name
        )
        await self.accept()

    async def disconnect(self, code):
        await self.channel_layer.group_discard(
            'users',
            self.channel_name
        )

    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        current_user = text_data_json['current_user']
        other_user = text_data_json['other_user']
        chat_id = text_data_json['chat_id']
        message = text_data_json['message']

        data = {
                'type': 'chat_message',
                'current_user': current_user,
                'other_user': other_user,
                'chat_id': chat_id,
                'message': message
            }
        await self.create_new_message(data)
        await self.channel_layer.group_send('users', data)

    async def chat_message(self, event):
        current_user = event['current_user']
        other_user = event['other_user']
        chat_id = event['chat_id']
        message = event['message']

        await self.send(text_data=json.dumps({
            'current_user': current_user,
            'other_user': other_user,
            'chat_id': chat_id,
            'message': message
        }))

    @database_sync_to_async
    def create_new_message(self, data):
        Message.objects.create(
            author=User.objects.get(pk=data['current_user']),
            chat=Chat.objects.get(pk=data['chat_id']),
            text=data['message']
        )