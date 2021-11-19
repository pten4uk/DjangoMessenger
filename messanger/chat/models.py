from django.contrib.auth import get_user_model
from django.contrib.auth.models import AbstractUser
from django.db import models


class CustomUser(AbstractUser):
    photo = models.ImageField(upload_to='photos/')


User = get_user_model()


class Message(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE, unique=False)
    text = models.TextField()
    chat = models.ForeignKey(
        'Chat',
        on_delete=models.CASCADE,
        related_name='messages'
    )

    date = models.DateField(auto_now_add=True)
    time = models.TimeField(auto_now_add=True)
    datetime = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.pk} {self.author.username}: {self.text[:40]}'


class Chat(models.Model):
    users = models.ManyToManyField(User)
    to_self = models.BooleanField(default=False)

    def __str__(self):
        return f'{self.pk} {self.users.all()}'
