from django.db import models

class ToDoItem (models.Model):
  text = models.CharField(max_length=200)
  category = models.CharField(max_length=50, default="General")
  created_at = models.DateTimeField(auto_now_add=True)
  owner = models.ForeignKey (
    'jwt_auth.User',
    related_name="todoitems",
    on_delete=models.CASCADE
  )

  def __str__ (self):
    return f'User {self.owner} - To Do Item {self.id}'
