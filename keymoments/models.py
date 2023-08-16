import os
import random
import string
from django.db import models
from django.contrib.auth.models import User


# Create your models here.


STATUS = ((0, "Draft"), (1, "Published"))


def keymoment_image_upload_path(instance, filename):
    # Generate a unique filename for the uploaded image.
    # Get the file extension from the original filename
    ext = os.path.splitext(filename)[1]
    # Generate a random alphanumeric string for the filename
    random_string = ''.join(random.choices(string.ascii_lowercase + string.digits, k=8))
    # Concatenate the random string with the file extension
    unique_filename = f"{random_string}{ext}"
    # Return the full upload path
    return os.path.join('keymoment', unique_filename)


class key_moments(models.Model):
    
    class Meta:
        verbose_name_plural = 'Key Moments'

    title = models.CharField(max_length=128)

    def __str__(self):
        return self.title

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='key_moments',
        related_query_name='key_moment',
        null=True
    )
    excerpt = models.CharField(max_length=256)
    status = models.IntegerField(choices=STATUS, default=1)
    description = models.TextField(null=True, blank=True)
    image = models.ImageField(null=True, blank=True, upload_to=keymoment_image_upload_path)
    cropped_image = models.TextField(blank=True)
    start_date = models.DateField()
    end_date = models.DateField(null=True, blank=True)
    location = models.CharField(max_length=256, null=True, blank=True)
    likes = models.ManyToManyField(User, related_name='moment_likes', blank=True)

    SOCIAL = "SO"
    ACADEMIC = "AC"
    WORK = "WO"
    UNKNOWN = "UN"
    MOMENT_TYPE_CHOICES = [
        ("SOCIAL", (
            ("birth", "Birth"),
            ("death", "End"),
            ("love", "Love"),
            ("moving", "Moving"),
            ),
        ),
        ("ACADEMIC", (
            ("school", "School"),
            ("college", "College"),
            ("institute", "Institutes"),
            ("self", "Self Learned"),
            ),
        ),
        ("WORK", (
            ("hired", "Hired"),
            ("fired", "Fired"),
            ("own", "Own Bussiness"),
            ("self", "Independent"),
            ),
        ),
        ("UNKNOWN", "Unknown"),
    ]

    moment_type = models.CharField(
        max_length=30,
        choices=MOMENT_TYPE_CHOICES,
        default="UNKNOWN",
    )

    class Meta:
        ordering = ['-start_date']
