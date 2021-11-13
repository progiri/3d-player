from django.contrib import admin
from .models import Playlist, Music

@admin.register(Music)
class MusicAdmin(admin.ModelAdmin):
    list_display = ('name', 'playlist', 'music')

@admin.register(Playlist)
class MusicAdmin(admin.ModelAdmin):
    list_display = ('name', 'user')

