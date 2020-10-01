from datetime import datetime, timedelta
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied
from rest_framework import status
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from django.contrib.auth import get_user_model
from django.conf import settings
import jwt

from .serializers import UserSerializer, PopulatedUserSerializer, UnpopulatedUserSerializer
User = get_user_model()

class RegisterView(APIView):

    def post(self, request):
        created_user = UserSerializer(data=request.data)
        if created_user.is_valid():
            created_user.save()
            return Response({'message': 'Registration Succesful'}, status=status.HTTP_201_CREATED)
        return Response(created_user.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

class LoginView(APIView):

    def get_user(self, email):
        try:
            return User.objects.get(email=email)
        except User.DoesNotExist:
            raise PermissionDenied({'message': 'Invalid Credentials'})

    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        user = self.get_user(email)
        if not user.check_password(password):
            raise PermissionDenied({'message': 'Invalid Credentials'})
        dt = datetime.now() + timedelta(days=7)
        token = jwt.encode(
            {'sub': user.id, 'exp': int(dt.strftime('%s'))},
            settings.SECRET_KEY,
            algorithm='HS256'
        )
        return Response({'token': token, 'message': f'Welcome back {user.username}'})

class UserDetailView(APIView):

    permission_classes = (IsAuthenticatedOrReadOnly, )

    def get_userprofile(self, request, pk):
        try:
            if request.user.id == pk:
                return User.objects.get(pk=pk)
            else:
                raise PermissionDenied({'message': 'Invalid Credentials'})
        except User.DoesNotExist:
            raise PermissionDenied({'message': 'User not found'})

    def get(self, _request, pk):
        user = User.objects.get(pk=pk)
        serialized_user = PopulatedUserSerializer(user)
        return Response(serialized_user.data, status=status.HTTP_200_OK)

    def put(self, request, pk):
        user_to_update = self.get_userprofile(request, pk=pk)
        updated_user = UnpopulatedUserSerializer(user_to_update, data=request.data)
        if updated_user.is_valid():
            updated_user.save()
            return Response(updated_user.data, status=status.HTTP_202_ACCEPTED)
        return Response(updated_user.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

    def delete(self, request, pk):
        user_to_delete = self.get_userprofile(request, pk=pk)
        user_to_delete.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
