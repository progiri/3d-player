from rest_framework import serializers
from apps.playlist.models import Playlist, Music


class MusicSerializer(serializers.ModelSerializer):
    music = serializers.FileField()
    class Meta:
        model = Music
        fields = ('id', 'playlist', 'name', 'music')


class ShortPlaylistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Playlist
        fields = ('id', 'user', 'name')


class PlaylistSerializer(serializers.ModelSerializer):
    musics = MusicSerializer(many=True)
    class Meta:
        model = Playlist
        fields = ('id', 'user', 'name', 'musics')
