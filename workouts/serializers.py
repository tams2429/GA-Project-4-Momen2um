from rest_framework import serializers
from .models import Workout

from exercises.serializers import ExerciseSerializer

class WorkoutSerializer(serializers.ModelSerializer):

  class Meta:
    model = Workout
    fields = '__all__'



class PopulatedWorkoutSerializer(serializers.ModelSerializer):

  class Meta:
    model = Workout
    fields = '__all__'

  exercises = ExerciseSerializer(many=True)
