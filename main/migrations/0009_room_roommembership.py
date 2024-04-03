# Generated by Django 5.0.2 on 2024-04-01 21:10

import django.db.models.deletion
import django.utils.timezone
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0008_classmembership_join_date'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Room',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('subject', models.CharField(blank=True, max_length=255, null=True)),
                ('room_photo', models.ImageField(upload_to='room_photos/')),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now)),
                ('code', models.CharField(max_length=8, unique=True)),
                ('creator', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='created_rooms', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='RoomMembership',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('join_date', models.DateTimeField(default=django.utils.timezone.now)),
                ('member', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='room_memberships', to=settings.AUTH_USER_MODEL)),
                ('specific_room', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='memberships', to='main.room')),
            ],
            options={
                'unique_together': {('member', 'specific_room')},
            },
        ),
    ]
