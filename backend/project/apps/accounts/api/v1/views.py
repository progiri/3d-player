from django.contrib.auth.models import User
from rest_framework.exceptions import ValidationError
from .serializers import RegisterSerializer
from rest_framework import generics
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken



class RegisterView(generics.GenericAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer

    def post(self, request):
        if request.data.get('password') != request.data.get('password2'):
            raise ValidationError(detail='Password fields didn\'t match.')

        user_serializer = self.serializer_class(data=request.data)

        if user_serializer.is_valid():
            user_serializer.save()
        else:
            return Response({"error": user_serializer.errors})

        user = User.objects.get(username=user_serializer.data['username'])
        refresh = RefreshToken.for_user(user)

        return Response({
            "user": user_serializer.data,
            "access": str(refresh.access_token),
            "refresh": str(refresh)
        })


class ProfileView(generics.GenericAPIView):
    def get(self, request):
        return Response({
            "username": request.user.username,
            "playlist": request.user.playlists.first().id
        })
