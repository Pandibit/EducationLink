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

