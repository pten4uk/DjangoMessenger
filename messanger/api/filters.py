from django.contrib.auth import get_user_model
from django_filters import rest_framework as filters

from chat.models import Chat

User = get_user_model()


class ChatFilter(filters.FilterSet):
    users = filters.ModelMultipleChoiceFilter(queryset=User.objects.all())

    class Meta:
        model = Chat
        fields = ['users']