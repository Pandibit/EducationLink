from django.urls import path
from . import views

urlpatterns = [
    path("", views.main, name=""),
    path("register", views.register, name="register"),
    path("login_view", views.login_view, name="login_view"),
    path("homepage", views.homepage, name="homepage"),
    path("logout", views.user_logout, name="user_logout"),
    path("posts", views.posts, name="posts"),
    path('delete_post', views.delete_post, name='delete_post'),
    path("save_post", views.save_post, name="save_post"),
    path("classes", views.classes, name="classes"),
    path("chatroom", views.chatroom, name="chatroom"),
    path("quiz", views.quiz, name="quiz"),
]
