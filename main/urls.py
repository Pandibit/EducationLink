from django.urls import path 
from . import views

urlpatterns = [
    path("", views.main, name=""),
    path("register", views.register, name="register"),
    path("login", views.login, name="login"),
    path("homepage", views.homepage, name="homepage"),
    path("logout", views.user_logout, name="user_logout"),
]
