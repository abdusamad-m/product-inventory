import json
from django.shortcuts import render

# Create your views here.
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Customer_register, Products, Variant, SubVariant
from django.contrib.auth.models import User
from .serializers import Customer_serializer
from rest_framework.views import APIView 



class Customer_Register(APIView):
    def post(self,request):
        serializer = Customer_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()  
            return Response({'result':'register success'})
        
    
        return Response ({'result':'register failed'})
    
class CustomerLogin(APIView):
   def post(self, request):
        print("*********",request.data)
        serializer = Customer_serializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data.get('email')
            password = serializer.validated_data.get('password')
            
            print("validated data",email,password)
            
            user = Customer_register.objects.filter(email=email,password=password)
            
            if user.exists():
                print(user[0].email)
                request.session['customer_id'] = user[0].id
                request.session['customer_email'] = user[0].email
                if not request.session.session_key:
                    request.session.create()  # Create the session if it doesn't exist
                    session_id = request.session.session_key  # Get the session ID
                    print(session_id)
                    print(request.session['customer_id'])
                    print(request.session['customer_email'])
                return Response({'message': 'User logged in successfully','session_id':session_id,'customer_id':user[0].id}, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
            # except :
            #     return Response({'error': 'Invalid credentialsjjjjjj'}, status=status.HTTP_401_UNAUTHORIZED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        


@api_view(['POST'])
def create_product(request):
    print("*******",request.data)
    try:
        
        product_name = request.data.get('name')
        ProductID=request.data.get("ProductID")
        ProductCode=request.data.get("ProductCode")
        ProductImage=request.data.get("ProductImage")
        TotalStock=request.data.get("TotalStock")
        variants = json.loads(request.data.get('variants', []))


        user=Customer_register.objects.get(id=request.data.get('customer_id'))
        if not product_name or not variants:
            return Response({"error": "Product name and variants are required"}, status=status.HTTP_400_BAD_REQUEST)

        product = Products.objects.create(
            ProductID=ProductID,  # Example ProductID, replace with logic to generate unique ID
            ProductCode=ProductCode,  # Example ProductCode, replace with logic to generate unique code
            ProductName=product_name,
            ProductImage=ProductImage,
            TotalStock=TotalStock,
            CreatedUser_id=user.id # Assuming the first user for simplicity
        )

        for variant in variants:
            var_obj = Variant.objects.create(product=product, name=variant.get('name'))
            for option in variant.get('options', []):
                SubVariant.objects.create(variant=var_obj, name=option)

        return Response({"message": "Product created successfully"}, status=status.HTTP_201_CREATED)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
@api_view(['GET'])
def list_products(request):
    try:
        products = Products.objects.all()
        product_list = []
        for product in products:
            variants = []
            for variant in product.variants.all():
                variants.append({
                    "name": variant.name,
                    "options": [sub.name for sub in variant.subvariants.all()]
                })
            product_list.append({
                "id": product.id,
                "ProductID": product.ProductID,
                "ProductName": product.ProductName,
                "ProductCode": product.ProductCode,
                "TotalStock": product.TotalStock,
                
                # Consider using a URL or path instead of including image data directly
                "ProductImage": product.ProductImage.url if product.ProductImage else None,
                "variants": variants
            })
        return Response(product_list, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST'])
def add_stock(request):
    try:
        product_id = request.data.get('product_id')
        quantity = request.data.get('quantity')
        if not product_id or not quantity:
            return Response({"error": "Product ID and quantity are required"}, status=status.HTTP_400_BAD_REQUEST)
        
        product = Products.objects.get(ProductID=product_id)
        product.TotalStock += quantity
        product.save()
        return Response({"message": "Stock added successfully"}, status=status.HTTP_200_OK)
    except Products.DoesNotExist:
        return Response({"error": "Product not found"}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST'])
def remove_stock(request):
    try:
        product_id = request.data.get('product_id')
        quantity = request.data.get('quantity')
        if not product_id or not quantity:
            return Response({"error": "Product ID and quantity are required"}, status=status.HTTP_400_BAD_REQUEST)
        
        product = Products.objects.get(ProductID=product_id)
        if product.TotalStock < quantity:
            return Response({"error": "Insufficient stock"}, status=status.HTTP_400_BAD_REQUEST)
        
        product.TotalStock -= quantity
        product.save()
        return Response({"message": "Stock removed successfully"}, status=status.HTTP_200_OK)
    except Products.DoesNotExist:
        return Response({"error": "Product not found"}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
