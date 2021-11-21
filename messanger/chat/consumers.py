import json

from asgiref.sync import async_to_sync
from channels.generic.websocket import AsyncWebsocketConsumer


class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.chat_id = self.scope['url_route']['kwargs']['chat_id']
        self.chat_group = f'chat_{self.chat_id}'
        print(self.channel_layer)

        await self.channel_layer.group_add(
            self.chat_group,
            self.channel_name
        )
        await self.accept()

    async def disconnect(self, code):
        await self.channel_layer.group_discard(
            self.chat_group,
            self.channel_name
        )

    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        user_id = text_data_json['user_id']
        message = text_data_json['message']

        await self.channel_layer.group_send(
            self.chat_group,
            {
                'type': 'chat_message',
                'user_id': user_id,
                'message': message
            }
        )

    async def chat_message(self, event):
        user_id = event['user_id']
        message = event['message']

        await self.send(text_data=json.dumps({
            'message': message,
            'user_id': user_id
        }))