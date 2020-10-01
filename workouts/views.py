# pylint: disable=no-member, no-self-use
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from .models import Workout
from .serializers import WorkoutSerializer, PopulatedWorkoutSerializer

class WorkoutListView(APIView):

    permission_classes = (IsAuthenticatedOrReadOnly, )

    def get(self, _request):
        workouts = Workout.objects.all()
        serialized_workouts = PopulatedWorkoutSerializer(workouts, many=True)
        return Response(serialized_workouts.data, status=status.HTTP_200_OK)

    def post(self, request):
        new_workout = WorkoutSerializer(data=request.data)
        if new_workout.is_valid():
            new_workout.save()
            return Response(new_workout.data, status=status.HTTP_201_CREATED)
        return Response(new_workout.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

class WorkoutDetailView(APIView):

    permission_classes = (IsAuthenticatedOrReadOnly, )

    def get_workout(self, pk):
        try:
            return Workout.objects.get(pk=pk)
        except Workout.DoesNotExist:
            raise NotFound()

    def get(self, _request, pk):
        workout = Workout.objects.get(pk=pk)
        serialized_workout = PopulatedWorkoutSerializer(workout)
        return Response(serialized_workout.data, status=status.HTTP_200_OK)

    def put(self, request, pk):
        workout_to_update = self.get_workout(pk=pk)
        updated_workout = WorkoutSerializer(workout_to_update, data=request.data)
        if updated_workout.is_valid():
            updated_workout.save()
            return Response(updated_workout.data, status=status.HTTP_202_ACCEPTED)
        return Response(updated_workout.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

    def delete(self, _request, pk):
        workout_to_delete = self.get_workout(pk=pk)
        workout_to_delete.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
