from rest_framework import viewsets
from rest_framework.permissions import AllowAny 
from .serializers import CustomUserSerializer
from .models import CustomUser
from django.http import JsonResponse
from django.contrib.auth import get_user_model, login, logout
from django.views.decorators.csrf import csrf_exempt
import random
import re

# Create your views here.

def generate_session_token(length=10):
    return ''.join(random.SystemRandom().choice([chr(i) for i in range(97, 123)] + [str(i) for i in range(10)]) for _ in range(length))

@csrf_exempt
def signin(request):
    if not request.method == 'POST':
        return JsonResponse({'error': 'Send a post request with valid parameter only.'})
    
    username = request.POST['email']
    password = request.POST['password']

    if not re.match("\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b", username):
        return JsonResponse({'error':'Enter valid email.'})
    
    if len(password)<4:
        return JsonResponse({'error':'Password needs to be at least of 4 characters.'})
    
    UserModel = get_user_model()

    try:
        user = UserModel.objects.get(email=username)

        if user.check_password(password):
            user_dict = UserModel.objects.filter(email=username).values().first()
            user_dict.pop('password')

            if user.session_token != "0":
                user.session_token = "0"
                user.save()
                return JsonResponse({'error': 'Privious session exists.'})
            
            token = generate_session_token()
            user.session_token = token
            user.save()
            login(request, user)
            return JsonResponse({'token':token, 'user':user_dict})
        else:
            return JsonResponse({'error':'Invalid password.'})

    except UserModel.DoesNotExist:
        return JsonResponse({'error':'Invalid email.'})

def signout(request, id):

    UserModel = get_user_model()

    try:
        user = UserModel.objects.get(pk=id)
        user.session_token = "0"
        user.save()
        logout(request)
        return JsonResponse({'success':"Logout successfuly."})
    except UserModel.DoesNotExist:
        return JsonResponse({'error':"Invalid user id."})
    

class CustomUserViewSet(viewsets.ModelViewSet):
    permission_classes_by_action = {'create':[AllowAny]}

    queryset = CustomUser.objects.all().order_by('updated_at')
    serializer_class = CustomUserSerializer

    def get_permissions(self):
        try:
            return [permission() for permission in self.permission_classes_by_action[self.action]]
        except KeyError:
            return [permission() for permission in self.permission_classes]