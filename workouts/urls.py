from django.urls import path
from .views import WorkoutListView, WorkoutDetailView

urlpatterns = [
    path('', WorkoutListView.as_view()),
    path('<int:pk>/', WorkoutDetailView.as_view())
]
