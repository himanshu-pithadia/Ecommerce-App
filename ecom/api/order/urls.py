from .views import OrderViewSet, add
from rest_framework.routers import DefaultRouter
from django.urls import path, include

router = DefaultRouter()
router.register(r'orders', OrderViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('add/<str:id>/<str:token>/',add,name="order.add")
]