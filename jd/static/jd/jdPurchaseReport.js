var stop_closing = 0;
var final_edit_id;

function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

$(document).ready(function () {
    var purchaseReport = document.getElementById('purchaseReport');

    var starts = '<br><br><table class="table table-striped table-bordered" id="tablePurchase" style="margin-left: -25px;">\
              <colgroup>\
                   <col span="1" style="width: 10%;">\
                   <col span="1" style="width: 7%;">\
                   <col span="1" style="width: 10%;">\
                   <col span="1" style="width: 7%;">\
                   <col span="1" style="width: 10%;">\
                   <col span="1" style="width: 10%;">\
                   <col span="1" style="width: 6%;">\
                   <col span="1" style="width: 5%;">\
                   <col span="1" style="width: 6%;">\
                   <col span="1" style="width: 7%;">\
                   <col span="1" style="width: 5%;">\
                   <col span="1" style="width: 7%;">\
                   <col span="1" style="width: 7%;">\
                   <col span="1" style="width: 7%;">\
               </colgroup>\
              <thead class="thead-dark">\
              <tr>\
              <th>DATE</th>\
               <th>BILL</th>\
              <th>PARTY</th>\
              <th>BALE</th>\
              <th>P. QUAL</th>\
              <th>O. QUAL</th>\
              <th>DESIGN</th>\
              <th>HSN</th>\
              <th>TAKA</th>\
              <th>MTS</th>\
              <th>SHORT</th>\
              <th>PLACE</th>\
              <th>OPEN</th>\
              <th style="width: 50px;"></th>\
              </tr>\
              </thead>';
    var ends = '</table>';
    var csrftoken = getCookie('csrftoken');

    $.ajax({
        type: 'POST',
        url: '/purchaseReportData',
        data: {
            csrfmiddlewaretoken: csrftoken
        },
        success: function (data) {
            dat = JSON.parse(data);
            for (var i = 0; i < dat.length; i++) {
                dat[i] = JSON.parse(dat[i])
            }

            var tmp = '';
            for (var i = 0; i < dat.length; i++) {
                var arr = dat[i].date.split("-");
                dat[i].date = arr[2] + "/" + arr[1] + "/" + arr[0];
                tmp = tmp + '<tr>';
                tmp = tmp + '<td>' + dat[i].date.toString() + '</td>';
                tmp = tmp + '<td>' + dat[i].bill_no.toString() + '</td>';
                tmp = tmp + '<td>' + dat[i].party_name.toString() + '</td>';
                tmp = tmp + '<td>' + dat[i].bale_no.toString() + '</td>';
                tmp = tmp + '<td>' + dat[i].party_quality_name.toString() + '</td>';
                tmp = tmp + '<td>' + dat[i].our_quality_name.toString() + '</td>';
                tmp = tmp + '<td>' + dat[i].design.toString() + '</td>';
                tmp = tmp + '<td>' + dat[i].hsn_code.toString() + '</td>';
                tmp = tmp + '<td>' + dat[i].taka.toString() + '</td>';
                tmp = tmp + '<td>' + dat[i].mts.toString() + '</td>';
                tmp = tmp + '<td>' + dat[i].shortage.toString() + '</td>';
                tmp = tmp + '<td>' + dat[i].place.toString() + '</td>';
                tmp = tmp + '<td>' + dat[i].open.toString() + '</td>';

                tmp = tmp + '<td>' + '<button onclick="showGivenPurchaseEntry(this.id)"  class="btn btn-success" id="edit_btnn" >Edit</button> ' + '</td>';
                tmp = tmp + '</tr>';
            }
            purchaseReport.innerHTML = starts + tmp + ends;
            for (var i = 0; i < dat.length; i++) {
                document.getElementById("edit_btnn").setAttribute("id", "edit" + dat[i].id.toString());
            }
        },
        error: function (xhr) {
            var error_message = xhr.responseText.split(" ")[0]
            console.log(error_message)
            if (error_message === "MultipleObjectsReturned") {
                swal({
                    icon: 'error',
                    title: 'Error',
                    text: 'More than 1 Entry Found with given details',
                })
            } else if (error_message === "DoesNotExist") {
                swal({
                    icon: 'error',
                    title: 'Error',
                    text: 'No Entry Found with given details',
                })
            } else {
                swal({
                    icon: 'error',
                    title: 'Error',
                    text: 'Some Unknown Error Occured',
                })
            }
        }
    })

});

function selectGivenTable() {
    var filter1data = document.getElementById("filter1").value;
    var filter2data = document.getElementById("filter2").value;
    var filter3data = document.getElementById("filter3").value;
    var filter4data = document.getElementById("filter4").value;
    var filter5data = document.getElementById("filter5").value;
    var filter6data = document.getElementById("filter6").value;
    var filter7data = document.getElementById("filter7").value;
    var filter8data = document.getElementById("filter8").value;
    var filter9data = document.getElementById("filter9").value;
    var filter10data = document.getElementById("filter10").value;

    var pattern = /(\d{2})\/(\d{2})\/(\d{4})/;
    var startDate = ""
    var endDate = ""
    if (filter9data !== "") {
        var arr = filter9data.split("-");
        filter9data = arr[2] + "/" + arr[1] + "/" + arr[0];
        startDate = new Date(filter9data.replace(pattern, '$3-$2-$1'));
    }
    if (filter10data !== "") {
        var arr2 = filter10data.split("-");
        filter10data = arr2[2] + "/" + arr2[1] + "/" + arr2[0];
        endDate = new Date(filter10data.replace(pattern, '$3-$2-$1'));
    }

    var no_of_entries = document.getElementById("tablePurchase").childNodes[4].childNodes.length;

    for (i = 0; i < no_of_entries; i++) {
        var bill = document.getElementById("tablePurchase").childNodes[4].childNodes[i].childNodes[1].innerHTML;
        var bale = document.getElementById("tablePurchase").childNodes[4].childNodes[i].childNodes[3].innerHTML;
        var party_qual = document.getElementById("tablePurchase").childNodes[4].childNodes[i].childNodes[4].innerHTML;
        var our_qual = document.getElementById("tablePurchase").childNodes[4].childNodes[i].childNodes[5].innerHTML;
        var design = document.getElementById("tablePurchase").childNodes[4].childNodes[i].childNodes[6].innerHTML;
        var party = document.getElementById("tablePurchase").childNodes[4].childNodes[i].childNodes[2].innerHTML;
        var place = document.getElementById("tablePurchase").childNodes[4].childNodes[i].childNodes[11].innerHTML;
        var open = document.getElementById("tablePurchase").childNodes[4].childNodes[i].childNodes[12].innerHTML;


        var dt = document.getElementById("tablePurchase").childNodes[4].childNodes[i].childNodes[0].innerHTML;
        var dateEntry = new Date(dt.replace(pattern, '$3-$2-$1'));

        if ((bill.includes(filter1data)) && (bale.includes(filter2data)) && (party_qual.includes(filter3data)) && (our_qual.includes(filter4data))
            && (design.includes(filter5data)) && (party.includes(filter6data)) && (place.includes(filter7data)) && (open.includes(filter8data))
            && ((startDate === "") || dateEntry >= startDate) && ((endDate === "") || dateEntry <= endDate)) {
            var ele = document.getElementById("tablePurchase").childNodes[4].childNodes[i];
            ele.classList.remove('hide-data');
            ele.style.display = "";
        } else {
            var ele2 = document.getElementById("tablePurchase").childNodes[4].childNodes[i];
            ele2.classList.add('hide-data');
            ele2.style.display = "none";
        }
    }
}

function exportPurchaseTable() {
    var copyTable = $("#tablePurchase").clone(false);
    copyTable.find('.hide-data').remove(); //removing rows while exporting
    copyTable.table2excel({
        filename: "PurchaseReport"
    });
    copyTable.remove();
}

