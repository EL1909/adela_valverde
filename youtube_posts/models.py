from django.db import models
from embed_video.fields import EmbedVideoField

# Create your models here.


class Video(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    video_id = EmbedVideoField()

