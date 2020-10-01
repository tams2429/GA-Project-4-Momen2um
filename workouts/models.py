from django.db import models

# Create your models here.
class Workout(models.Model):
  name = models.CharField(max_length=200)
  description = models.CharField(max_length=500)
  exercises = models.ManyToManyField(
    'exercises.Exercise',
    related_name='workouts'
  )

  def __str__(self):
        return f'{self.name}'
