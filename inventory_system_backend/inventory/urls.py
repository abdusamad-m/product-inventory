from django.urls import path
from .views import create_product, list_products, add_stock, remove_stock, Customer_Register, CustomerLogin, CustomerLogout

urlpatterns = [
    path('product/create/', create_product, name='create_product'),
    path('product/list/', list_products, name='list_products'),
    path('stock/add/', add_stock, name='add_stock'),
    path('stock/remove/', remove_stock, name='remove_stock'),
    path('register/', Customer_Register.as_view(), name='register'),
    path('login/', CustomerLogin.as_view(), name='login'),
    path('logout/', CustomerLogout.as_view(), name='logout'),

    


    
]
