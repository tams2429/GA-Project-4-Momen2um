from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly

from .models import Exercise
from .serializers import ExerciseSerializer

class ExerciseListView(APIView):

    def get(self, _request):
        exercises = Exercise.objects.all()
        serialized_exercises = ExerciseSerializer(exercises, many=True)
        return Response(serialized_exercises.data, status=status.HTTP_200_OK)

class ExerciseDetailView(APIView):

    def get_exercise(self, pk):
        try:
            return Exercise.objects.get(pk=pk)
        except Exercise.DoesNotExist:
            raise NotFound()

    def get(self, _request, pk):
        exercise = Exercise.objects.get(pk=pk)
        serialized_exercise = ExerciseSerializer(exercise)
        return Response(serialized_exercise.data, status=status.HTTP_200_OK)
