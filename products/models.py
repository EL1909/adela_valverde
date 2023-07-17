from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
import os
import random
import string


class Category(models.Model):

    class Meta:
        verbose_name_plural = 'Categories'

    name = models.CharField(max_length=256)
    friendly_name = models.CharField(max_length=256, null=True, blank=True)

    def __str__(self):
        return self.name

    def get_friendly_name(self):
        return self.friendly_name


def product_image_upload_path(instance, filename):
    # Generate a unique filename for the uploaded image.
    # Get the file extension from the original filename
    ext = os.path.splitext(filename)[1]
    # Generate a random alphanumeric string for the filename
    random_string = ''.join(random.choices(string.ascii_lowercase + string.digits, k=8))
    # Concatenate the random string with the file extension
    unique_filename = f"{random_string}{ext}"
    # Return the full upload path
    return os.path.join('products', unique_filename)


class Product(models.Model):
    category = models.ForeignKey('Category', null=True, blank=True, on_delete=models.SET_NULL)
    sku = models.CharField(max_length=254, null=True, blank=True)
    name = models.CharField(max_length=254)
    description = models.TextField()
    price = models.DecimalField(max_digits=6, decimal_places=2)
    rating = models.DecimalField(max_digits=6, decimal_places=2, null=True, blank=True)
    image_url = models.URLField(max_length=1024, null=True, blank=True)
    image = models.ImageField(null=True, blank=True, upload_to=product_image_upload_path)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        # Generate a unique SKU if it doesn't exist
        if not self.sku:
            # Generate a random alphanumeric string for the SKU
            sku = ''.join(random.choices(string.ascii_uppercase + string.digits, k=8))
            # Check if the generated SKU is already used by another product
            while Product.objects.filter(sku=sku).exists():
                sku = ''.join(random.choices(string.ascii_uppercase + string.digits, k=8))
            # Assign the generated SKU to the product
            self.sku = sku

        super().save(*args, **kwargs)
