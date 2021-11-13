import os

from django.db import models
from django.contrib.auth import get_user_model
from django.dispatch import receiver
from django.db.models.signals import post_save


def get_upload_path(self, filename):
    return f"{self.playlist.user.username}/{self.playlist.name}/{filename}"

class Playlist(models.Model):
    user = models.ForeignKey(
        get_user_model(),
        on_delete=models.CASCADE,
        related_name='playlists'
    )
    name = models.CharField(
        max_length=255
    )
    
    def __str__(self):
        return self.name


class Music(models.Model):
    playlist = models.ForeignKey(
        to=Playlist,
        on_delete=models.CASCADE,
        related_name='musics'
    )
    name = models.CharField(
        max_length=255
    )
    music = models.FileField(
        upload_to=get_upload_path
    )

    def __str__(self):
        return self.name



@receiver(post_save, sender=get_user_model())
def create_playlist(sender, **kwargs):
    if kwargs['instance'].password != '':
        Playlist.objects.create(
            user=kwargs.get('instance'),
            name="init playlist"
        )

