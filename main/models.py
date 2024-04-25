import string
import secrets
import uuid
from django.db.models.signals import pre_save
from django.dispatch import receiver
from django.db.models.signals import post_save

from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

# Create your models here.


class Post(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE
    )  # If the user gets deleted all the posts  wit
    subject = models.CharField(max_length=100)  # Subject of the post``
    short_description = models.TextField()  # Short description of the post
    dropzone_file = models.ImageField(
        upload_to="dropzone_files/"
    )  # File associated with the post
    created_at = models.DateTimeField(auto_now_add=True)  # Timestamp of post creation

    def __str__(self):
        return self.subject


class Class(models.Model):
    creator = models.ForeignKey(
        User, related_name="created_classes", on_delete=models.CASCADE
    )
    name = models.CharField(max_length=255)
    section = models.CharField(max_length=255, blank=True, null=True)
    subject = models.CharField(max_length=255, blank=True, null=True)
    room = models.CharField(max_length=255, blank=True, null=True)
    class_photo = models.ImageField(upload_to="class_files/")
    code = models.CharField(max_length=8, unique=True)

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        # When saving the class, create a ClassMembership object for the creator
        super().save(*args, **kwargs)
        ClassMembership.objects.get_or_create(member=self.creator, specific_class=self)


@receiver(pre_save, sender=Class)
def generate_class_code(sender, instance, **kwargs):
    if not instance.code:
        # Generate an 8-character code using uuid
        code = str(uuid.uuid4())[:8]
        instance.code = code


class ClassMembership(models.Model):
    member = models.ForeignKey(
        User, related_name="class_memberships", on_delete=models.CASCADE
    )
    specific_class = models.ForeignKey(
        Class, related_name="memberships", on_delete=models.CASCADE
    )
    join_date = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f"{self.member.username} - {self.specific_class.name}"

    class Meta:
        unique_together = ["member", "specific_class"]


class Avatar(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    image = models.ImageField(upload_to="avatars/")

    def __str__(self):
        return f"Avatar for {self.user.username}"


class Room(models.Model):
    creator = models.ForeignKey(
        User, related_name="created_rooms", on_delete=models.CASCADE
    )
    name = models.CharField(max_length=255)
    subject = models.CharField(max_length=255, blank=True, null=True)
    room_photo = models.ImageField(upload_to="room_photos/")
    created_at = models.DateTimeField(default=timezone.now)
    code = models.CharField(max_length=8, unique=True)

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        # When saving the room, create a RoomMembership object for the creator
        super().save(*args, **kwargs)
        RoomMembership.objects.get_or_create(member=self.creator, specific_room=self)


class RoomMembership(models.Model):
    member = models.ForeignKey(
        User, related_name="room_memberships", on_delete=models.CASCADE
    )
    specific_room = models.ForeignKey(
        Room, related_name="memberships", on_delete=models.CASCADE
    )
    join_date = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f"{self.member.username} - {self.specific_room.name}"

    class Meta:
        unique_together = ["member", "specific_room"]


def generate_room_code(sender, instance, **kwargs):
    if not instance.code:
        # Generate an 8-character code using uuid
        code = str(uuid.uuid4())[:8]
        instance.code = code

# Register pre-save signal
models.signals.pre_save.connect(generate_room_code, sender=Room)



class Plan(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE) 
    activity = models.CharField(max_length=255) 
    start_time = models.TimeField()  
    end_time = models.TimeField()    
    status = models.CharField(max_length=20, choices=[
        ('to_do', 'To_do'),
        ('done', 'Done'),
        ('doing', 'Doing'),
    ])  

    def __str__(self):
        return self.activity


class Announcement(models.Model):
    member = models.ForeignKey(
        User, related_name="announcements", on_delete=models.CASCADE
    )
    specific_class = models.ForeignKey(
        Class, related_name="announcements", on_delete=models.CASCADE
    )
    content = models.TextField()
    created_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f"{self.member.username} - {self.title} ({self.specific_class.name})"