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


def stockInHand(request):
    return render(request, 'jd/stockInHand.html')


def stockInHandData(request):
    if request.method == "POST":
        purchasedata = Purchase.objects.all()
        dict = {}
        for item in purchasedata:
            dict[item.our_quality_name] = [0,0]
        for item in purchasedata:
            dict[item.our_quality_name][1] += float(item.mts)
            dict[item.our_quality_name][0] += int(item.taka)

        salesData = Sale.objects.all()
        for item in salesData:
            dict[item.our_quality_name][1] -= float(item.mts)
            dict[item.our_quality_name][0] -= float(item.taka)

        return HttpResponse(json.dumps(dict))


def viewStock(request):
    return render(request, 'jd/viewStock.html')


@csrf_exempt
def viewStockData(request):
    if request.method == "POST":
        purchasedata = Purchase.objects.all()
        dict = {}
        for item in purchasedata:
            dict[str(item.bale_no) + str(item.our_quality_name)] = [0, 0]
        for item in purchasedata:
            dict[str(item.bale_no) + str(item.our_quality_name)][1] += float(item.mts)
            dict[str(item.bale_no) + str(item.our_quality_name)][0] += int(item.taka)

        salesData = Sale.objects.all()
        for item in salesData:
            dict[str(item.bale_no) + str(item.our_quality_name)][1] -= float(item.mts)
            dict[str(item.bale_no) + str(item.our_quality_name)][0] -= float(item.taka)

        for item in purchasedata:
            item.taka_left = dict[str(item.bale_no) + str(item.our_quality_name)][0]
            item.mts_left = dict[str(item.bale_no) + str(item.our_quality_name)][1]
            item.save()

        lst = []
        for item in purchasedata:
            context = json.dumps(PurchaseSerializer(item).data)
            context = context[:len(context) - 1]
            context = context + ", " + '"id": ' + str(item.id) + '}'
            lst.append(context)

        mydata = json.dumps(lst)
        return HttpResponse(mydata)


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
        obj = Purchase.objects.filter(bill_no=bill_r, bale_no=bale_r)
        lst = []
        for item in obj:
            context = json.dumps(PurchaseSerializer(item).data)
            context = context[:len(context) - 1]
            context = context + ", " + '"id": ' + str(item.id) + '}'
            lst.append(context)

        mydata = json.dumps(lst)
        return HttpResponse(mydata)


@csrf_exempt
def deleteGivenPurchase(request):
    if request.method == "POST":
        id_r = int(request.POST['ids'][6:])
        d = Purchase.objects.get(id=id_r)
        d.delete()

        bill_r = request.POST['bill']
        bale_r = request.POST['bale']

        obj = Purchase.objects.filter(bill_no=bill_r, bale_no=bale_r)
        lst = []
        for item in obj:
            context = json.dumps(PurchaseSerializer(item).data)
            context = context[:len(context) - 1]
            context = context + ", " + '"id": ' + str(item.id) + '}'

            lst.append(context)
        mydata = json.dumps(lst)
        return HttpResponse(mydata)


@csrf_exempt
def editPurchase(request):
    if request.method == "POST":
        bill_r = request.POST['bill']
        bale_r = request.POST['bale']
        obj = Purchase.objects.filter(bill_no=bill_r, bale_no=bale_r)
        lst = []
        for item in obj:
            context = json.dumps(PurchaseSerializer(item).data)
            context = context[:len(context) - 1]
            context = context + ", " + '"id": ' + str(item.id) + '}'
            lst.append(context)

        mydata = json.dumps(lst)
        return HttpResponse(mydata)


@csrf_exempt
def editGivenPurchase(request):
    if request.method == "POST":
        id_r = int(request.POST['id'][4:])
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

        bale_old = request.POST['bale_old']
        bill_old = request.POST['bill_old']

        obj = Purchase.objects.filter(bill_no=bill_old, bale_no=bale_old)
        lst = []
        for item in obj:
            context = json.dumps(PurchaseSerializer(item).data)
            context = context[:len(context) - 1]
            context = context + ", " + '"id": ' + str(item.id) + '}'
            lst.append(context)

        mydata = json.dumps(lst)
        return HttpResponse(mydata)


@csrf_exempt
def getBaleProdMap(request):
    mydata = Purchase.objects.all()
    dict = {}
    for item in mydata:
        dict[item.bale_no] = []
    for item in mydata:
        dict[item.bale_no].append(item.our_quality_name)
    for item in mydata:
        dict[item.bale_no].sort()
    return HttpResponse(json.dumps(dict))


@csrf_exempt
def getBaleProdMapSale(request):
    mydata = Sale.objects.all()
    dict = {}
    for item in mydata:
        dict[item.bale_no] = []
    for item in mydata:
        if item.our_quality_name not in dict[item.bale_no]:
            dict[item.bale_no].append(item.our_quality_name)
    for item in mydata:
        dict[item.bale_no].sort()
    return HttpResponse(json.dumps(dict))


@csrf_exempt
def getBillBaleMap(request):
    mydata = Purchase.objects.all()
    dict = {}
    for item in mydata:
        dict[item.bill_no] = []
    for item in mydata:
        if item.bale_no not in dict[item.bill_no]:
            dict[item.bill_no].append(item.bale_no)
    for item in mydata:
        dict[item.bill_no].sort()
    return HttpResponse(json.dumps(dict))


@csrf_exempt
def addSale(request):
    data = json.loads(request.POST['saleDataArray'])
    date_r = request.POST['date']
    party_r = request.POST['party']
    for entry in data:
        bale_r = entry[0]
        our_quality_r = entry[1]
        taka_r = entry[2]
        mts_r = entry[3]
        design_r = Purchase.objects.get(bale_no=bale_r, our_quality_name=our_quality_r).design

        obj = Sale(date=date_r, buyer_name=party_r, bale_no=bale_r, our_quality_name=our_quality_r, design=design_r,
                   taka=taka_r, mts=mts_r)
        obj.save()

    return HttpResponse('')


@csrf_exempt
def editSale(request):
    if request.method == "POST":
        bale_r = request.POST['bale']
        our_quality_name_r = request.POST['prod']

        d = Sale.objects.get(bale_no=bale_r, our_quality_name=our_quality_name_r)
        context = json.dumps(SaleSerializer(d).data)
        context = context[:len(context) - 1]
        context = context + ", " + '"id": ' + str(d.id) + '}'
        return HttpResponse(context)


@csrf_exempt
def deleteSale(request):
    if request.method == "POST":
        bale_r = request.POST['bale']
        our_quality_name_r = request.POST['prod']
        obj = Sale.objects.filter(bale_no=bale_r, our_quality_name=our_quality_name_r)
        lst = []
        for item in obj:
            context = json.dumps(SaleSerializer(item).data)
            context = context[:len(context) - 1]
            context = context + ", " + '"id": ' + str(item.id) + '}'

            lst.append(context)

        mydata = json.dumps(lst)
        return HttpResponse(mydata)


@csrf_exempt
def deleteGivenSale(request):
    if request.method == "POST":
        id_r = int(request.POST['ids'][6:])
        d = Sale.objects.get(id=id_r)
        d.delete()

        bale_r = request.POST['bale']
        our_quality_name_r = request.POST['prod']

        obj = Sale.objects.filter(bale_no=bale_r,our_quality_name=our_quality_name_r)
        lst = []
        for item in obj:
            context = json.dumps(SaleSerializer(item).data)
            context = context[:len(context) - 1]
            context = context + ", " + '"id": ' + str(item.id) + '}'

            lst.append(context)
        mydata = json.dumps(lst)
        return HttpResponse(mydata)


@csrf_exempt
def showEditEntry(request):
    if request.method == "POST":
        id_r = int(request.POST['id'][4:])
        obj = Sale.objects.get(id=id_r)
        context = json.dumps(SaleSerializer(obj).data)
        context = context[:len(context) - 1]
        context = context + ", " + '"id": ' + str(obj.id) + '}'
        return HttpResponse(context)


@csrf_exempt
def showEditEntryPurchase(request):
    if request.method == "POST":
        id_r = int(request.POST['id'][4:])
        obj = Purchase.objects.get(id=id_r)
        context = json.dumps(PurchaseSerializer(obj).data)
        context = context[:len(context) - 1]
        context = context + ", " + '"id": ' + str(obj.id) + '}'
        return HttpResponse(context)


@csrf_exempt
def editGivenSale(request):
    if request.method == "POST":
        id_r = int(request.POST['id'][4:])
        date_r = request.POST['date_popup']
        buyer_r = request.POST['party_popup']
        bale_r = request.POST['bale_popup']
        our_quality_r = request.POST['our_quality_popup']
        design_r = Purchase.objects.get(bale_no=bale_r, our_quality_name=our_quality_r).design
        taka_r = request.POST['taka_popup']
        mts_r = request.POST['mts_popup']
        bale_old = request.POST['bale']
        quality_old = request.POST['prod']

        obj = Sale.objects.get(id=id_r)
        obj.date = date_r
        obj.buyer_name = buyer_r
        obj.bale_no = bale_r
        obj.our_quality_name = our_quality_r
        obj.design = design_r
        obj.taka = taka_r
        obj.mts = mts_r
        obj.save()

        ob = Sale.objects.filter(bale_no=bale_old, our_quality_name=quality_old)
        lst = []
        for item in ob:
            context = json.dumps(SaleSerializer(item).data)
            context = context[:len(context) - 1]
            context = context + ", " + '"id": ' + str(item.id) + '}'

            lst.append(context)

        mydata = json.dumps(lst)
        return HttpResponse(mydata)


@csrf_exempt
def salesReport(request):
    mydata = Purchase.objects.all()
    dict = {}
    for item in mydata:
        dict[item.bale_no] = []
    for item in mydata:
        dict[item.bale_no].append(item.our_quality_name)
    for item in mydata:
        dict[item.bale_no].sort()
    # return HttpResponse(json.dumps(dict))
    data = (str(json.dumps(dict)))
    return render(request, 'jd/salesReport.html',{"dict": data})


@csrf_exempt
def salesReportData(request):
    obj = Sale.objects.all()
    lst = []
    for item in obj:
        context = json.dumps(SaleSerializer(item).data)
        context = context[:len(context) - 1]
        context = context + ", " + '"id": ' + str(item.id) + '}'

        lst.append(context)

    mydata = json.dumps(lst)
    return HttpResponse(mydata)


@csrf_exempt
def editGivenSaleInReport(request):
    if request.method == "POST":
        id_r = int(request.POST['id'][4:])
        date_r = request.POST['date_popup']
        buyer_r = request.POST['party_popup']
        bale_r = request.POST['bale_popup']
        our_quality_r = request.POST['our_quality_popup']
        design_r = Purchase.objects.get(bale_no=bale_r, our_quality_name=our_quality_r).design
        taka_r = request.POST['taka_popup']
        mts_r = request.POST['mts_popup']

        obj = Sale.objects.get(id=id_r)
        obj.date = date_r
        obj.buyer_name = buyer_r
        obj.bale_no = bale_r
        obj.our_quality_name = our_quality_r
        obj.design = design_r
        obj.taka = taka_r
        obj.mts = mts_r
        obj.save()

        obj = Sale.objects.all()
        lst = []
        for item in obj:
            context = json.dumps(SaleSerializer(item).data)
            context = context[:len(context) - 1]
            context = context + ", " + '"id": ' + str(item.id) + '}'

            lst.append(context)

        mydata = json.dumps(lst)
        return HttpResponse(mydata)


@csrf_exempt
def purchaseReport(request):
    return render(request, 'jd/purchaseReport.html')


@csrf_exempt
def purchaseReportData(request):
    obj = Purchase.objects.all()
    lst = []
    for item in obj:
        context = json.dumps(PurchaseSerializer(item).data)
        context = context[:len(context) - 1]
        context = context + ", " + '"id": ' + str(item.id) + '}'

        lst.append(context)

    mydata = json.dumps(lst)
    return HttpResponse(mydata)


@csrf_exempt
def editGivenPurchaseInReport(request):
    if request.method == "POST":
        id_r = int(request.POST['id'][4:])
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

        obj = Purchase.objects.all()
        lst = []
        for item in obj:
            context = json.dumps(PurchaseSerializer(item).data)
            context = context[:len(context) - 1]
            context = context + ", " + '"id": ' + str(item.id) + '}'
            lst.append(context)

        mydata = json.dumps(lst)
        return HttpResponse(mydata)
