from django.contrib.auth import get_user_model
from django.shortcuts import render
from django.views import View

User = get_user_model()


class MessengerView(View):
    def get(self, request, *args, **kwargs):
        context = {
            'all_users': User.objects.all(),
        }
        return render(request, 'chat/base.html', context)
