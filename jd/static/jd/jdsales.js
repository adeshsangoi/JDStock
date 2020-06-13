var numberOfEntries = 3;
var baleProdMap;

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


function addSale() {
    var salesPage = document.getElementById('salesPage');
    salesPage.innerHTML = '<br> <br> <br>\
    <form id="add-head">\
        <div class="row">\
            <div class="col-md-2">\
                <input id="entryNumber" class="form-control" placeholder="No. of entries" min="1" max="20" type="number" required>\
            </div>\
            <div class="col-md-2">\
                <button type="submit" class="btn btn-secondary">Show Form</button>\
            </div>\
        </div>\
    </form>'
}

$(document).on('submit', '#add-head', function (e) {
    e.preventDefault();
    var csrftoken = getCookie('csrftoken');
    var salesPage = document.getElementById('salesPage');
    var addboxdata =
    '<hr style="margin-left: -24px;margin-right: -24px;">\
        <div>\
            <h6 id="headerAdd" style="font-family: sans-serif;font-size:12px; text-transform: uppercase;padding-left: 5px;"></h6>\
        </div>\
        <div class="row">\
                 <div class="col-md-3">\
                    <input id="bale_add" onchange="getProduct()" class="form-control" placeholder="Bale Number" type="number" required>\
                </div>\
                <div class="col-md-3">\
                    <select id="our_quality_add" class="form-control" required>\
                    </select>\
                </div>\
                <div class="col-md-3">\
                    <input id="taka_add" class="form-control" placeholder="Taka" oninput="this.value = this.value.toUpperCase()" type="number" required>\
                </div>\
                <div class="col-md-3">\
                    <input id="mts_add" class="form-control" placeholder="Metres" oninput="this.value = this.value.toUpperCase()" type="text" required>\
                </div>\
         </div>';

    numberOfEntries = document.getElementById('entryNumber').value;

    salesPage.innerHTML = "";
    salesPage.innerHTML =
        '<div class="card card-container">\
            <form class="form-signin" id="formAdd">\
            <h6 style="font-family: sans-serif;text-transform: uppercase;padding-left: 5px;">BILL DETAILS</h6>\
                <div class="row">\
                    <div class="col-md-3">\
                        <input id="date_add" class="form-control" placeholder="Date" type="date"  required>\
                    </div>\
                    <div class="col-md-3">\
                        <input id="party_add" class="form-control" placeholder="Party Name" type="text" oninput="this.value = this.value.toUpperCase()"  required>\
                    </div>\
                </div>\
                <div class="baleEntry" id="baleEntry">\
                </div>\
                <hr style="margin-left: -24px;margin-right: -24px;">\
                <button class="btn btn-lg btn-primary btn-block btn-signin" type="submit">Add Sale Entry</button>\
            </form>\
        </div>\
        <br>\
            <br>';
    var i;
    var data = '';
    for (i = 0; i < numberOfEntries; i++) {
        data = data + addboxdata;
    }
    document.getElementById("baleEntry").innerHTML = data;
    document.getElementById('date_add').valueAsDate = new Date();

    for (i = 0; i < numberOfEntries; i++) {
        document.getElementById("headerAdd").innerHTML = "Entry " + (i + 1).toString();
        document.getElementById("headerAdd").setAttribute("id", "headerAdd " + i.toString());
        document.getElementById("bale_add").setAttribute("id", "bale_add" + i.toString());
        document.getElementById("our_quality_add").setAttribute("id", "our_quality_add" + i.toString());
        document.getElementById("taka_add").setAttribute("id", "taka_add" + i.toString());
        document.getElementById("mts_add").setAttribute("id", "mts_add" + i.toString());
    }

    $.ajax({
        type: 'POST',
        url: '/getBaleProdMap',
        data: {
            csrfmiddlewaretoken: csrftoken
        },
        success: function (data) {
            baleProdMap = JSON.parse(data);
        },
        error: function (data) {
            swal("Error", ", Your entry is Added!", "success");
        }
    })
})

function getProduct() {
    for(var i=0;i<numberOfEntries;i++){
        bale_id = "bale_add"+i.toString();
        prod_id = "our_quality_add"+i.toString();
        document.getElementById(prod_id).innerHTML = '';
        bale_id_val = document.getElementById(bale_id).value;

        if(bale_id_val === ""){
            var doNothing = 0
        }
        else if(baleProdMap[bale_id_val] != null) {
            arr = baleProdMap[bale_id_val]
            var option_field = ''
            for (var j = 0; j < arr.length; j++) {
                option_field = option_field + '<option>' + arr[j].toString() + '</option>'
            }
            document.getElementById(prod_id).innerHTML = option_field;
        }
        else{
            swal({
                    icon: 'error',
                    title: 'Error',
                    text: 'No Entry Found with Bale Number = ' + document.getElementById(bale_id).value,
                })
        }
    }
}


$(document).on('submit', '#formAdd', function (e) {
    e.preventDefault();
    var salesPage = document.getElementById('salesPage');
    var csrftoken = getCookie('csrftoken');
    dataArr = new Array(numberOfEntries);
    for (var i = 0; i < numberOfEntries; i++) {
        dataArr[i] = [0, 0, 0, 0];
    }
    // console.log(dataArr);
    for (var j = 0; j < numberOfEntries; j++) {
        dataArr[j][0] = document.getElementById("bale_add" + j.toString()).value;
        dataArr[j][1] = document.getElementById("our_quality_add" + j.toString()).value;
        dataArr[j][2] = document.getElementById("taka_add" + j.toString()).value;
        dataArr[j][3] = document.getElementById("mts_add" + j.toString()).value;
    }

    dat = JSON.stringify(dataArr);

    $.ajax({
        type: 'POST',
        url: '/addSale',
        data: {
            date: $('#date_add').val(),
            party: $('#party_add').val(),
            'saleDataArray': dat,
            csrfmiddlewaretoken: csrftoken
        },
        success: function (data) {
            swal("Congrats!", ", Your entry is Added!", "success");
            salesPage.innerHTML = "";

        },
        error: function (data) {
            swal({
                icon: 'error',
                title: 'Error',
                text: 'Some Unknown Error Occured',
            })
        }
    })
})








