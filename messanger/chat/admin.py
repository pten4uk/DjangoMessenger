from django.contrib import admin

from .models import CustomUser, Message, Chat

admin.site.register(CustomUser)
admin.site.register(Message)
admin.site.register(Chat)
