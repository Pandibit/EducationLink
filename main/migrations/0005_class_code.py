# Generated by Django 5.0.2 on 2024-03-27 08:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0004_avatar'),
    ]

    operations = [
        migrations.AddField(
            model_name='class',
            name='code',
            field=models.CharField(default=12345678, editable=False, max_length=8, unique=True),
            preserve_default=False,
        ),
    ]
