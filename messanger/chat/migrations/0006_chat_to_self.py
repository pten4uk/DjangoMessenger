# Generated by Django 3.2.9 on 2021-11-19 16:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('chat', '0005_alter_message_author'),
    ]

    operations = [
        migrations.AddField(
            model_name='chat',
            name='to_self',
            field=models.BooleanField(default=False),
        ),
    ]
