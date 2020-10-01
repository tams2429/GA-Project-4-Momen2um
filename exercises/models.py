from django.db import models

# Create your models here.
class Exercise(models.Model):
  name = models.CharField(max_length=100)
  body_part = models.CharField(max_length=100)
  description = models.CharField(max_length=1000)
  image = models.TextField()
  video = models.TextField()

  def __str__(self):
        return f'{self.name} ({self.body_part})'
