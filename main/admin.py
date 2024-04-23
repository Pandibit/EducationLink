from django.contrib import admin
from . models import Class, Post, Avatar,ClassMembership,Room,RoomMembership,Plan
# Register your models here.


admin.site.register(Post)

@admin.register(Class)
class ClassAdmin(admin.ModelAdmin):
    list_display = ('name', 'section', 'subject', 'room', 'code')
admin.site.register(Avatar)
admin.site.register(ClassMembership)
admin.site.register(Room)
admin.site.register(RoomMembership)
admin.site.register(Plan)

