from django.db import migrations
from api.user.models import CustomUser

class Migration(migrations.Migration):
    def seed_data(apps, schema_editor):
        user = CustomUser(name="himanshu", email="himanshu@gmail.com", is_staff=True, is_superuser=True, phone_number="1234567890")
        user.set_password("1234")
        user.save()

    dependencies = [
        
    ]

    operations =[
        migrations.RunPython(seed_data),
    ]
