from rest_framework import serializers
from django.contrib.auth import get_user_model, password_validation
from django.contrib.auth.hashers import make_password
from django.core.exceptions import ValidationError

from todoitems.serializers import ToDoItemSerializer
from workouts.serializers import WorkoutSerializer

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):

    password = serializers.CharField(write_only=True)
    password_confirmation = serializers.CharField(write_only=True)

    def validate(self, data):
        password = data.pop('password')
        password_confirmation = data.pop('password_confirmation')
        if password != password_confirmation:
            raise ValidationError({'password_confirmation': 'Passwords does not match'})
        # Comment out Django's password validator (i.e. password too common) during testing
        # try:
        #     password_validation.validate_password(password=password)
        # except ValidationError as err:
        #     raise ValidationError({'password': err.messages})
        data['password'] = make_password(password)
        return data

    class Meta:
        model = User
        fields = '__all__'

class UnpopulatedUserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('username', 'first_name', 'last_name', 'email', 'profile_image', 'workouts')



class PopulatedUserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'last_name', 'email', 'profile_image', 'date_joined', 'todoitems', 'workouts')

    todoitems = ToDoItemSerializer(many=True)
    workouts = WorkoutSerializer(many=True)
