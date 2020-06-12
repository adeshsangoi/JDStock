from django.db import models


# Create your models here.
from rest_framework import serializers


class Purchase(models.Model):
    date = models.DateField()
    place = models.CharField(max_length=30)
    open = models.CharField(max_length=15)
    bill_no = models.IntegerField()
    bale_no = models.IntegerField()
    party_name = models.CharField(max_length=30)
    party_quality_name = models.CharField(max_length=30)
    our_quality_name = models.CharField(max_length=30)
    hsn_code = models.CharField(max_length=20)
    taka = models.IntegerField()
    mts = models.CharField(max_length=10)
    shortage = models.CharField(max_length=10)
    design = models.CharField(max_length=20,blank=True)

    def __str__(self):
        return "Bill " + str(self.bill_no) + " - Bale " + str(self.bale_no) + " - " + self.party_name + " - " + str(self.date)


class PurchaseSerializer(serializers.Serializer):
    date = serializers.DateField()
    place = serializers.CharField(max_length=30)
    open = serializers.CharField(max_length=15)
    bill_no = serializers.IntegerField()
    bale_no = serializers.IntegerField()
    party_name = serializers.CharField(max_length=30)
    party_quality_name = serializers.CharField(max_length=30)
    our_quality_name = serializers.CharField(max_length=30)
    hsn_code = serializers.CharField(max_length=20)
    taka = serializers.IntegerField()
    mts = serializers.CharField(max_length=10)
    shortage = serializers.CharField(max_length=10)
    design = serializers.CharField(max_length=20)

