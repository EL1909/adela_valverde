# Generated by Django 4.2.2 on 2023-08-07 14:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('keymoments', '0002_alter_key_moments_moment_type'),
    ]

    operations = [
        migrations.AddField(
            model_name='key_moments',
            name='cropped_image',
            field=models.TextField(blank=True),
        ),
    ]
