from django.contrib import admin
from .models import key_moments

# Register your models here.


class Key_momentsAdmin(admin.ModelAdmin):
    list_display = (
        'user',
        'title',
        'excerpt',
        'description',
        'image',
        'start_date',
        'end_date',
        'location',
        'moment_type',
        'status',
    )


admin.site.register(key_moments)