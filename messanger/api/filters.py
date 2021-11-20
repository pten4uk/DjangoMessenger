from django.contrib.auth import get_user_model
from django_filters import rest_framework as filters

from chat.models import Message

User = get_user_model()


class MessageFilter(filters.FilterSet):
    class Meta:
        model = Message
        fields = ['chat']