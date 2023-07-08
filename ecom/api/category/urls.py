from .views import CategoryViewSet
from rest_framework.routers import DefaultRouter
from django.urls import path, include

router = DefaultRouter()
router.register(r'categorys', CategoryViewSet)

urlpatterns = [
    path('', include(router.urls))
]