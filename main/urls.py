from django.urls import path
from . import views

urlpatterns = [
    path("", views.main, name=""),
    path("register", views.register, name="register"),
    path("login_view", views.login_view, name="login_view"),
    path("homepage", views.homepage, name="homepage"),
    path("logout", views.user_logout, name="user_logout"),
    path("posts", views.posts, name="posts"),
    path("save_post", views.save_post, name="save_post"),
    path("delete-post/<int:post_id>/", views.delete_post, name="delete_post"),
    path("update_post/<int:post_id>/", views.update_post, name="update_post"),
    path("classes", views.classes, name="classes"),
    path("class/<int:pk>/", views.spec_class, name="spec_class"),
    path("save_class", views.save_class, name="save_class"),
    path("delete_class/<int:class_id>/", views.delete_class, name="delete_class"),
    path("save_avatar", views.save_avatar, name="save_avatar"),
    path("chatroom", views.chatroom, name="chatroom"),
    path("api/check_class_code/", views.check_class_code, name="check_class_code"),
    path("api/join_class/", views.join_class, name="join_class"),
    path("unenroll_class/<int:class_id>/", views.unenroll_class, name="unenroll_class"),
    path("create_room/", views.create_room, name="create_room"),
    path("delete-room/<int:room_id>/", views.delete_room, name="delete_room"),
    path("room/<int:pk>/", views.spec_room, name="spec_room"),
    path("plan", views.plan, name="plan"),
    path("class/<int:pk>/members/", views.class_members, name="class_members"),
    path("class/<int:pk>/code/", views.class_code, name="class_code"),
    path(
        "class/<int:pk>/announcements/",
        views.class_announcements,
        name="class_announcements",
    ),
    path("class/<int:pk>/calendar/", views.class_calendar, name="class_calendar"),
    path("save_plan/", views.save_plan, name="save_plan"),
    path("delete_plan/<int:plan_id>/", views.delete_plan, name="delete_plan"),
    path('plans/<int:plan_id>/', views.get_plan_details, name='get_plan_details'),
    path('update_plan/<int:plan_id>/', views.update_plan, name='update_plan'),
    path('contact', views.contact, name='contact'),
    path('submit_application/', views.submit_application, name='submit_application'),
    path('create_announcement/', views.create_announcement, name='create_announcement'),
    

]
