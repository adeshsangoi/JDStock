import json

from django.http import HttpResponse
from django.shortcuts import render
from .models import *


def index(request):
    return render(request, 'jd/index.html')


def purchase(request):
    return render(request, 'jd/purchase.html')


def addPurchase(request):
    if request.method == "POST":
        date_r = request.POST['date']
        place_r = request.POST['place']
        open_r = request.POST['open']
        bill_r = request.POST['bill']
        bale_r = request.POST['bale']
        party_r = request.POST['party']
        party_quality_r = request.POST['party_quality']
        our_quality_r = request.POST['our_quality']
        hsn_r = request.POST['hsn']
        taka_r = request.POST['taka']
        mts_r = request.POST['mts']
        shortage_r = request.POST['shortage']

        s = Purchase(date=date_r, place=place_r, open=open_r, bill_no=bill_r, bale_no=bale_r, party_name=party_r,
                     party_quality_name=party_quality_r, our_quality_name=our_quality_r, hsn_code=hsn_r, taka=taka_r,
                     mts=mts_r, shortage=shortage_r)
        s.save()

        return HttpResponse('')


def deletePurchase(request):
    if request.method == "POST":
        bill_r = request.POST['bill']
        bale_r = request.POST['bale']
        party_quality_r = request.POST['party_quality']

        d = Purchase.objects.get(bill_no=bill_r,bale_no=bale_r,party_quality_name=party_quality_r)
        context = json.dumps(PurchaseSerializer(d).data)

        return HttpResponse(context)


def deleteGivenPurchase(request):
    if request.method == "POST":
        bill_r = request.POST['bill']
        bale_r = request.POST['bale']
        party_quality_r = request.POST['party_quality']

        d = Purchase.objects.get(bill_no=bill_r,bale_no=bale_r,party_quality_name=party_quality_r)
        d.delete()

        return HttpResponse()


def editPurchase(request):
    if request.method == "POST":
        bill_r = request.POST['bill']
        bale_r = request.POST['bale']
        party_quality_r = request.POST['party_quality']

        d = Purchase.objects.get(bill_no=bill_r,bale_no=bale_r,party_quality_name=party_quality_r)
        context = json.dumps(PurchaseSerializer(d).data)

        return HttpResponse(context)


def editGivenPurchase(request):
    if request.method == "POST":
        date_r = request.POST['date']
        place_r = request.POST['place']
        open_r = request.POST['open']
        bill_r = request.POST['bill']
        bale_r = request.POST['bale']
        party_r = request.POST['party']
        party_quality_r = request.POST['party_quality']
        our_quality_r = request.POST['our_quality']
        hsn_r = request.POST['hsn']
        taka_r = request.POST['taka']
        mts_r = request.POST['mts']
        shortage_r = request.POST['shortage']

        d = Purchase.objects.get(bill_no=bill_r, bale_no=bale_r, party_quality_name=party_quality_r)
        d.date =date_r
        d.place = place_r
        d.open = open_r
        d.bill_no = bill_r
        d.bale_no = bale_r
        d.party_name = party_r
        d.party_quality_name = party_quality_r
        d.our_quality_name = our_quality_r
        d.hsn_code = hsn_r
        d.taka = taka_r
        d.mts = mts_r
        d.shortage = shortage_r
        d.save()

        return HttpResponse()
