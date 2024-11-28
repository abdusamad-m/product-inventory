from rest_framework import serializers
from .models import Customer_register



class Customer_serializer(serializers.ModelSerializer):
    class Meta:
        model = Customer_register
        fields = ['id','email','username','password']