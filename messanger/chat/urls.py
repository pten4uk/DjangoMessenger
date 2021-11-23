from django.urls import path
from .views import *

urlpatterns = [
    path('', MessengerView.as_view(), name='messenger'),
    path('login/', LoginView.as_view(), name='login'),
    path('signup/', SignUpView.as_view(), name='signup'),
]
