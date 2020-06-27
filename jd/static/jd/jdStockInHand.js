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
    var stockInHand = document.getElementById('stockInHand');

    var starts = '<br><br><table style="width: 50%;" class="table table-striped table-bordered" id="tableStockInHand" >\
              <colgroup>\
                   <col span="1" style="width: 15%;">\
                   <col span="1" style="width: 10%;">\
                    <col span="1" style="width: 10%;">\
               </colgroup>\
              <thead class="thead-dark">\
              <tr>\
              <th>QUALITY NAME</th>\
               <th>TAKA LEFT</th>\
               <th>QTY LEFT</th>\
              </tr>\
              </thead>';
    var ends = '</table>';
    var csrftoken = getCookie('csrftoken');

    $.ajax({
        type: 'POST',
        url: '/stockInHandData',
        data: {
            csrfmiddlewaretoken: csrftoken
        },
        success: function (data) {
            dat = JSON.parse(data);

            var tmp = '';
            for (var i = 0; i < Object.keys(dat).length; i++) {
                var quality_name = Object.keys(dat)[i].toString()
                tmp = tmp + '<tr>';
                tmp = tmp + '<td>' + quality_name + '</td>';
                tmp = tmp + '<td>' + dat[quality_name][0].toString() + '</td>';
                tmp = tmp + '<td>' + dat[quality_name][1] + '</td>';
                tmp = tmp + '</tr>';
            }
            stockInHand.innerHTML = starts + tmp + ends;
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

    var no_of_entries = document.getElementById("tableStockInHand").childNodes[4].childNodes.length;

    for (i = 0; i < no_of_entries; i++) {
        var our_qual = document.getElementById("tableStockInHand").childNodes[4].childNodes[i].childNodes[0].innerHTML;

        if (our_qual.includes(filter1data)) {
            var ele = document.getElementById("tableStockInHand").childNodes[4].childNodes[i];
            ele.classList.remove('hide-data');
            ele.style.display = "";
        } else {
            var ele2 = document.getElementById("tableStockInHand").childNodes[4].childNodes[i];
            ele2.classList.add('hide-data');
            ele2.style.display = "none";
        }
    }
}

function exportStockTable() {
    var copyTable = $("#tableStockInHand").clone(false);
    copyTable.find('.hide-data').remove(); //removing rows while exporting
    copyTable.table2excel({
        filename: "StockInHand"
    });
    copyTable.remove();
}


