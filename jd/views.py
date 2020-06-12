import json

from django.http import HttpResponse
from django.shortcuts import render
from .models import *
from django.views.decorators.csrf import csrf_exempt


def index(request):
    return render(request, 'jd/index.html')


def purchase(request):
    return render(request, 'jd/purchase.html')


def sale(request):
    return render(request, 'jd/sale.html')


@csrf_exempt
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
            design_r = entry[3]
            hsn_r = entry[4]
            taka_r = entry[5]
            mts_r = entry[6]
            shortage_r = entry[7]
            place_r = entry[8]
            open_r = entry[9]

            obj = Purchase(date=date_r, place=place_r, open=open_r, bill_no=bill_r, bale_no=bale_r, party_name=party_r,
                           party_quality_name=party_quality_r, our_quality_name=our_quality_r, hsn_code=hsn_r,
                           taka=taka_r, mts=mts_r, shortage=shortage_r, design=design_r)
            obj.save()

        return HttpResponse('')


@csrf_exempt
def PurchaseBale(request):
    if request.method == "POST":
        bill_r = request.POST['bill']
        objs = Purchase.objects.filter(bill_no=bill_r)
        lst = []
        for item in objs:
            lst.append(item.bale_no)

        context = json.dumps(lst)

        return HttpResponse(context)


@csrf_exempt
def deletePurchase(request):
    if request.method == "POST":
        bill_r = request.POST['bill']
        bale_r = request.POST['bale']

        d = Purchase.objects.get(bill_no=bill_r, bale_no=bale_r)

        context = json.dumps(PurchaseSerializer(d).data)
        return HttpResponse(context)


@csrf_exempt
def deleteGivenPurchase(request):
    if request.method == "POST":
        bill_r = request.POST['bill']
        bale_r = request.POST['bale']
        party_quality_r = request.POST['party_quality']

        d = Purchase.objects.get(bill_no=bill_r, bale_no=bale_r, party_quality_name=party_quality_r)
        d.delete()

        return HttpResponse()


@csrf_exempt
def editPurchase(request):
    if request.method == "POST":
        bill_r = request.POST['bill']
        bale_r = request.POST['bale']

        d = Purchase.objects.get(bill_no=bill_r, bale_no=bale_r)
        context = json.dumps(PurchaseSerializer(d).data)
        context = context[:len(context) - 1]
        context = context + ", " + '"id": ' + str(d.id) + '}'
        return HttpResponse(context)


@csrf_exempt
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
        design_r = request.POST['design']

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
        d.design = design_r

        d.save()

        return HttpResponse()


@csrf_exempt
def gatherData(request):
    mydata = Purchase.objects.all()
    dict = {}
    for item in mydata:
        dict[item.bale_no] = []
    for item in mydata:
        dict[item.bale_no].append(item.our_quality_name)

    return HttpResponse(json.dumps(dict))