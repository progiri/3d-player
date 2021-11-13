from django.urls import path
from .views import PlaylistAddMusicView, UserShortPlaylists, PlaylistRetrieveView


urlpatterns = [
    path('', UserShortPlaylists.as_view(), name='user_playlists'),
    path('<int:pk>/', PlaylistRetrieveView.as_view(), name='playlist_detail'),
    path('<int:pk>/music/', PlaylistAddMusicView.as_view(), name='add_music')
]
