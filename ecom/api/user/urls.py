from .views import CustomUserViewSet, signin, signout
from rest_framework.routers import DefaultRouter
from django.urls import path, include

router = DefaultRouter()
router.register(r'', CustomUserViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('login/', signin, name='signin'),
    path('logout/<int:id>/', signout, name='signout')
]