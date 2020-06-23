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
    var salesReport = document.getElementById('salesReport');

    var starts = '<br><br><table class="table table-striped table-bordered" id="tableSales">\
              <colgroup>\
                   <col span="1" style="width: 10%;">\
                   <col span="1" style="width: 15%;">\
                   <col span="1" style="width: 12%;">\
                   <col span="1" style="width: 12%;">\
                   <col span="1" style="width: 12%;">\
                   <col span="1" style="width: 15%;">\
                   <col span="1" style="width: 15%;">\
                   <col span="1" style="width: 9%;">\
               </colgroup>\
              <thead class="thead-dark">\
              <tr>\
              <th>BALE NO.</th>\
              <th>QUALITY</th>\
              <th>DESIGN</th>\
              <th>TAKA</th>\
              <th>MTS</th>\
              <th>BUYER</th>\
              <th>DATE</th>\
              <th style="width: 50px;"></th>\
              </tr>\
              </thead>';
    var ends = '</table>';
    var csrftoken = getCookie('csrftoken');
    $.ajax({
        type: 'POST',
        url: '/salesReportData',
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
                tmp = tmp + '<td>' + dat[i].bale_no.toString() + '</td>';
                tmp = tmp + '<td class="col1s">' + dat[i].our_quality_name.toString() + '</td>';
                tmp = tmp + '<td>' + dat[i].design.toString() + '</td>';
                tmp = tmp + '<td class="col2s">' + dat[i].taka.toString() + '</td>';
                tmp = tmp + '<td>' + dat[i].mts.toString() + '</td>';
                tmp = tmp + '<td>' + dat[i].buyer_name.toString() + '</td>'
                tmp = tmp + '<td>' + dat[i].date.toString() + '</td>';
                tmp = tmp + '<td>' + '<button onclick="editGivenSaleEntry(this.id)"  class="btn btn-success" id="edit_btnn" style="width: 100%;"> Edit </button> ' + '</td>';
                tmp = tmp + '</tr>';
            }
            salesReport.innerHTML = starts + tmp + ends;
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

    var no_of_entries = document.getElementById("tableSales").childNodes[4].childNodes.length;

    for (i = 0; i < no_of_entries; i++) {
        var bale = document.getElementById("tableSales").childNodes[4].childNodes[i].childNodes[0].innerHTML;
        var quality = document.getElementById("tableSales").childNodes[4].childNodes[i].childNodes[1].innerHTML;
        var design = document.getElementById("tableSales").childNodes[4].childNodes[i].childNodes[2].innerHTML;
        var buyer = document.getElementById("tableSales").childNodes[4].childNodes[i].childNodes[5].innerHTML;

        if ((bale.includes(filter1data)) && (quality.includes(filter2data)) && (design.includes(filter3data)) && (buyer.includes(filter4data))) {
            var ele = document.getElementById("tableSales").childNodes[4].childNodes[i];
            ele.classList.remove('hide-data');
            ele.style.display = "";
        } else {
            var ele2 = document.getElementById("tableSales").childNodes[4].childNodes[i];
            ele2.classList.add('hide-data');
            ele2.style.display = "none";
        }
    }
}

function exportSalesTable() {
    var copyTable = $("#tableSales").clone(false);
        copyTable.find('.hide-data').remove(); //removing rows while exporting
        copyTable.table2excel({
            filename: "SalesReport"
        });
        copyTable.remove();
}