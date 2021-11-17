from django.urls import path
from .views import *

urlpatterns = [
    path('', MessengerView.as_view(), name='messenger'),
]
