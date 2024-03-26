import string
import secrets
from django.dispatch import receiver
from django.db.models.signals import post_save

from django.db import models
from django.contrib.auth.models import User

# Create your models here.




class Post(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)  # If the user gets deleted all the posts  wit
    subject = models.CharField(max_length=100)  # Subject of the post``
    short_description = models.TextField()  # Short description of the post
    dropzone_file = models.FileField(upload_to='dropzone_files/')  # File associated with the post
    created_at = models.DateTimeField(auto_now_add=True)  # Timestamp of post creation

    def __str__(self):
        return self.subject

        


class Class(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    section = models.CharField(max_length=255, blank=True, null=True)
    subject = models.CharField(max_length=255, blank=True, null=True)
    room = models.CharField(max_length=255, blank=True, null=True)
    class_photo = models.ImageField(upload_to='class_files/')
    
    
    
    def __str__(self):
        return self.name


class Avatar(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='avatars/')

    def __str__(self):
        return f"Avatar for {self.user.username}"