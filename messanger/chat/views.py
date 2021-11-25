import os

from django.contrib.auth import get_user_model, authenticate, login
from django.contrib.auth.mixins import LoginRequiredMixin
from django.shortcuts import render, redirect
from django.views import View
from django.contrib.auth.views import LoginView as BaseLoginView
from .forms import UserCreateForm, LoginForm

User = get_user_model()


class MessengerView(LoginRequiredMixin, View):
    def get(self, request, *args, **kwargs):
        context = {
            'all_users': User.objects.all(),
        }
        return render(request, 'chat/base.html', context)


class SignUpView(View):
    def get(self, request):
        form = UserCreateForm(request.POST or None)
        context = {
            'form': form
        }
        return render(request, 'chat/signup.html', context)

    def post(self, request):
        form = UserCreateForm(request.POST, request.FILES)

        if form.is_valid():
            new_user = form.save(commit=False)
            new_user.username = form.cleaned_data['username']
            new_user.photo = form.cleaned_data['photo']
            new_user.set_password(form.cleaned_data['password1'])
            new_user.save()

            user = authenticate(
                username=form.cleaned_data['username'],
                password=form.cleaned_data['password1']
            )
            login(request, user)

        return redirect('messenger')


class LoginView(BaseLoginView):
    form_class = LoginForm
    template_name = 'chat/login.html'


def messenger(request):
    return redirect('messenger')
