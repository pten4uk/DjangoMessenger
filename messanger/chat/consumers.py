from channels.generic.websocket import WebsocketConsumer


class ChatConsumer(WebsocketConsumer):
    def connect(self):
        print(self.scope)
        self.room_id = self.scope['url_route']['kwargs']['room_name']
        self.accept()

    def disconnect(self, code):
        pass

    def receive(self, text_data):
        print(text_data)