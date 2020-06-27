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
    var viewStock = document.getElementById('viewStock');

    var starts = '<br><br><table class="table table-striped table-bordered" id="tableViewStock" style="margin-left: -45px;">\
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
              <th>L1</th>\
              <th>L2</th>\
              </tr>\
              </thead>';
    var ends = '</table>';
    var csrftoken = getCookie('csrftoken');

    $.ajax({
        type: 'POST',
        url: '/viewStockData',
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
                tmp = tmp + '<td>' + dat[i].taka_left.toString() + '</td>';
                tmp = tmp + '<td>' + dat[i].mts_left.toString() + '</td>';
                tmp = tmp + '</tr>';
            }
            viewStock.innerHTML = starts + tmp + ends;
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
    var filter2data = document.getElementById("filter2").value;
    var filter4data = document.getElementById("filter4").value;
    var filter5data = document.getElementById("filter5").value;
    var filter7data = document.getElementById("filter7").value;
    var filter8data = document.getElementById("filter8").value;

    var no_of_entries = document.getElementById("tableViewStock").childNodes[4].childNodes.length;

    for (i = 0; i < no_of_entries; i++) {
        var bale = document.getElementById("tableViewStock").childNodes[4].childNodes[i].childNodes[3].innerHTML;
        var our_qual = document.getElementById("tableViewStock").childNodes[4].childNodes[i].childNodes[5].innerHTML;
        var design = document.getElementById("tableViewStock").childNodes[4].childNodes[i].childNodes[6].innerHTML;
        var place = document.getElementById("tableViewStock").childNodes[4].childNodes[i].childNodes[11].innerHTML;
        var open = document.getElementById("tableViewStock").childNodes[4].childNodes[i].childNodes[12].innerHTML;

        if ((bale.includes(filter2data)) && (our_qual.includes(filter4data))
            && (design.includes(filter5data)) && (place.includes(filter7data)) && (open.includes(filter8data))) {
            var ele = document.getElementById("tableViewStock").childNodes[4].childNodes[i];
            ele.classList.remove('hide-data');
            ele.style.display = "";
        } else {
            var ele2 = document.getElementById("tableViewStock").childNodes[4].childNodes[i];
            ele2.classList.add('hide-data');
            ele2.style.display = "none";
        }
    }
}

function exportStockTable() {
    var copyTable = $("#tableViewStock").clone(false);
    copyTable.find('.hide-data').remove(); //removing rows while exporting
    copyTable.table2excel({
        filename: "Stock"
    });
    copyTable.remove();
}
