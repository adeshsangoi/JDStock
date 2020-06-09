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
        data = json.loads(request.POST['dataArray'])
        date_r = request.POST['date']
        bill_r = request.POST['bill']
        party_r = request.POST['party']
        for entry in data:
            bale_r = entry[0]
            party_quality_r = entry[1]
            our_quality_r = entry[2]
            hsn_r = entry[3]
            taka_r = entry[4]
            mts_r = entry[5]
            shortage_r = entry[6]
            place_r = entry[7]
            open_r = entry[8]

            obj = Purchase(date=date_r, place=place_r, open=open_r, bill_no=bill_r, bale_no=bale_r, party_name=party_r,
                         party_quality_name=party_quality_r, our_quality_name=our_quality_r, hsn_code=hsn_r,
                         taka=taka_r,
                         mts=mts_r, shortage=shortage_r)
            obj.save()

        return HttpResponse('')


def deletePurchase(request):
    if request.method == "POST":
        bill_r = request.POST['bill']
        bale_r = request.POST['bale']
        party_quality_r = request.POST['party_quality']

        d = Purchase.objects.get(bill_no=bill_r, bale_no=bale_r, party_quality_name=party_quality_r)
        context = json.dumps(PurchaseSerializer(d).data)

        return HttpResponse(context)


def deleteGivenPurchase(request):
    if request.method == "POST":
        bill_r = request.POST['bill']
        bale_r = request.POST['bale']
        party_quality_r = request.POST['party_quality']

        d = Purchase.objects.get(bill_no=bill_r, bale_no=bale_r, party_quality_name=party_quality_r)
        d.delete()

        return HttpResponse()


def editPurchase(request):
    if request.method == "POST":
        bill_r = request.POST['bill']
        bale_r = request.POST['bale']
        party_quality_r = request.POST['party_quality']

        d = Purchase.objects.get(bill_no=bill_r, bale_no=bale_r, party_quality_name=party_quality_r)
        context = json.dumps(PurchaseSerializer(d).data)
        context = context[:len(context) - 1]
        context = context + ", " + '"id": ' + str(d.id) + '}'
        return HttpResponse(context)


def editGivenPurchase(request):
    if request.method == "POST":
        id_r = int(request.POST['id'])
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

        d = Purchase.objects.get(id=id_r)
        d.date = date_r
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
