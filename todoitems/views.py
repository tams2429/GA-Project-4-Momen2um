from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.exceptions import PermissionDenied

from .serializers import ToDoItemSerializer
from .models import ToDoItem

class ToDoItemListView(APIView):

    permission_classes = (IsAuthenticatedOrReadOnly, )

    def post(self, request):
        request.data['owner'] = request.user.id
        created_todoitem = ToDoItemSerializer(data=request.data)
        if created_todoitem.is_valid():
            created_todoitem.save()
            return Response(created_todoitem.data, status=status.HTTP_201_CREATED)
        return Response(created_todoitem.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

class ToDoItemDetailView(APIView):

    permission_classes = (IsAuthenticatedOrReadOnly, )

    def get_todoitem(self, request, pk):
        try:
            if request.user.id == (ToDoItem.objects.get(pk=pk)).owner.id:
                return ToDoItem.objects.get(pk=pk)
            else:
                raise PermissionDenied({'message': 'Invalid Credentials'})
        except ToDoItem.DoesNotExist:
            raise NotFound()

    def delete(self, request, pk):
        todoitem_to_delete = self.get_todoitem(request, pk=pk)
        todoitem_to_delete.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
