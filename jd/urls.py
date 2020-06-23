from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name="home"),
    path('purchase', views.purchase, name="purchase"),
    path('addPurchase', views.addPurchase, name="addPurchase"),
    path('deletePurchase', views.deletePurchase, name="deletePurchase"),
    path('PurchaseBale', views.PurchaseBale, name="PurchaseBale"),
    path('deleteGivenPurchase', views.deleteGivenPurchase, name="deleteGivenPurchase"),
    path('editPurchase', views.editPurchase, name="editPurchase"),
    path('editGivenPurchase', views.editGivenPurchase, name="editGivenPurchase"),
    path('sale', views.sale, name="sale"),
    path('getBaleProdMap', views.getBaleProdMap, name="getBaleProdMap"),
    path('getBaleProdMapSale', views.getBaleProdMapSale, name="getBaleProdMapSale"),
    path('getBillBaleMap', views.getBillBaleMap, name="getBillBaleMap"),
    path('addSale', views.addSale, name="addSale"),
    path('editSale', views.editSale, name="editSale"),
    path('editGivenSale', views.editGivenSale, name="editGivenSale"),
    path('deleteSale', views.deleteSale, name="deleteSale"),
    path('deleteGivenSale', views.deleteGivenSale, name="deleteGivenSale"),
    path('showEditEntry', views.showEditEntry, name="showEditEntry"),
    path('showEditEntryPurchase', views.showEditEntryPurchase, name="showEditEntryPurchase"),
    path('salesReport', views.salesReport, name="salesReport"),
    path('salesReportData', views.salesReportData, name='salesReportData'),
]
