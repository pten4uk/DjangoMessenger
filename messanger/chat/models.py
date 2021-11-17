from django.contrib.auth import get_user_model
from django.contrib.auth.models import AbstractUser
from django.db import models


class CustomUser(AbstractUser):
    photo = models.ImageField(upload_to='photos/')


User = get_user_model()


class Message(models.Model):
    author = models.OneToOneField(User, on_delete=models.CASCADE)
    text = models.TextField()
    chat = models.ForeignKey('Chat', on_delete=models.CASCADE)

    date = models.DateField(auto_now_add=True)
    time = models.TimeField(auto_now_add=True)


class Chat(models.Model):
    users = models.ManyToManyField(User)