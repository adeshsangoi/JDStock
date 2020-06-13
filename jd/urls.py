from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name="home"),
    path('purchase',views.purchase,name="purchase"),
    path('addPurchase', views.addPurchase, name="addPurchase"),
    path('deletePurchase', views.deletePurchase, name="deletePurchase"),
    path('PurchaseBale', views.PurchaseBale, name="PurchaseBale"),
    path('deleteGivenPurchase', views.deleteGivenPurchase, name="deleteGivenPurchase"),
    path('editPurchase', views.editPurchase, name="editPurchase"),
    path('editGivenPurchase', views.editGivenPurchase, name="editGivenPurchase"),
    path('sale', views.sale, name="sale"),
    path('getBaleProdMap',views.getBaleProdMap,name="getBaleProdMap"),
    path('getBillBaleMap', views.getBillBaleMap, name="getBillBaleMap"),
    path('addSale', views.addSale, name="addSale"),
]
