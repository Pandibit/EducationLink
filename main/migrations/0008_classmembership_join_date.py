# Generated by Django 5.0.2 on 2024-03-30 22:51

import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0007_alter_class_code'),
    ]

    operations = [
        migrations.AddField(
            model_name='classmembership',
            name='join_date',
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
    ]