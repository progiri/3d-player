from rest_framework import generics
from rest_framework.generics import get_object_or_404
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.exceptions import ParseError

from apps.playlist.models import Music, Playlist

from .serializers import PlaylistSerializer, ShortPlaylistSerializer, MusicSerializer


class UserShortPlaylists(generics.ListAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = ShortPlaylistSerializer

    def get_queryset(self):
        return Playlist.objects.filter(user=self.request.user)


class PlaylistRetrieveView(generics.RetrieveAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = PlaylistSerializer
    
    def get_queryset(self):
        return Playlist.objects.filter(user=self.request.user)


class PlaylistAddMusicView(generics.CreateAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = MusicSerializer

    def create(self, request, pk):
        playlist = get_object_or_404(Playlist, pk=pk)
        music = request.data.get('music')
        name = request.data.get('name')
        print(request.data)
        print(request.FILES)
        if name is not None and music is not None:
            Music.objects.create(
                playlist=playlist,
                music = music,
                name = name
            )
        else:
            raise ParseError()
        return Response("Success")


class PlaylistMusicDetail(generics.RetrieveUpdateAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = MusicSerializer
    queryset = Music.objects.all()