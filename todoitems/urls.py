from django.urls import path
from .views import ToDoItemListView, ToDoItemDetailView

urlpatterns = [
    path('', ToDoItemListView.as_view()),
    path('<int:pk>/', ToDoItemDetailView.as_view())
]
