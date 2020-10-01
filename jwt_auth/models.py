from django.db import models
from django.contrib.auth.models import AbstractUser

class User (AbstractUser):
  first_name = models.CharField(max_length=50)
  last_name = models.CharField(max_length=50)
  email = models.CharField(max_length=200, unique=True)
  profile_image = models.TextField(blank=True)
  workouts = models.ManyToManyField(
    'workouts.Workout',
    related_name='users',
    blank=True
  )
