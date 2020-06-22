var numberOfEntries = 3;
var baleProdMap;
var bale_id_del_table;
var quality_del_table;
var bale_id_edit_table;
var quality_edit_table;
var id_final_edit_popup;
var stop_closing=0;

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
    for (var i = 0; i < numberOfEntries; i++) {
        bale_id = "bale_add" + i.toString();
        prod_id = "our_quality_add" + i.toString();
        document.getElementById(prod_id).innerHTML = '';
        bale_id_val = document.getElementById(bale_id).value;

        if (bale_id_val === "") {
            var doNothing = 0
        } else if (baleProdMap[bale_id_val] != null) {
            arr = baleProdMap[bale_id_val]
            var option_field = ''
            for (var j = 0; j < arr.length; j++) {
                option_field = option_field + '<option>' + arr[j].toString() + '</option>'
            }
            document.getElementById(prod_id).innerHTML = option_field;
        } else {
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

function deleteSale() {
    var csrftoken = getCookie('csrftoken');
    var salesPage = document.getElementById('salesPage');
    salesPage.innerHTML = '<br> <br> <br>\
    <form id="formDelete">\
    <h6 style="font-family: sans-serif">Enter Bale Number &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Choose Product</h6>\
    <div class="row">\
        <div class="col-md-2">\
            <input id="bale_no_for_delete" onchange="baleProdMappingDelete()" class="form-control" placeholder="Bale Number" min="1" type="number" required>\
        </div>\
        <div class="col-md-2">\
                <select id="product_options_delete" class="form-control" required>\
                 </select>\
        </div>\
        <div class="col-md-2">\
            <button type="submit" class="btn btn-secondary">Submit</button>\
        </div>\
    </div>\
    </form>'
    $.ajax({
        type: 'POST',
        url: '/getBaleProdMapSale',
        data: {
            csrfmiddlewaretoken: csrftoken
        },
        success: function (data) {
            baleProdMap = JSON.parse(data);
        }
    })

}


function baleProdMappingDelete() {
    document.getElementById('product_options_delete').innerHTML = '';
    bale_id = document.getElementById('bale_no_for_delete').value;
    if (bale_id === "") {
        var doNothing = 0;
    } else if (baleProdMap[bale_id] != null) {
        var arr = baleProdMap[bale_id];
        var option_field = '';
        for (var j = 0; j < arr.length; j++) {
            option_field = option_field + '<option>' + arr[j].toString() + '</option>'
        }
        document.getElementById('product_options_delete').innerHTML = option_field;
    } else {
        swal({
            icon: 'error',
            title: 'Error',
            text: 'No Entry Found with Bale Number = ' + bale_id,
        })
    }
}

$(document).on('submit', '#formDelete', function (e) {
    e.preventDefault();
    var salesPage = document.getElementById('salesPage');
    bale_id_del_table = document.getElementById("bale_no_for_delete").value;
    quality_del_table = document.getElementById("product_options_delete").value;
    var starts = '<br><br><table class="table table-striped table-bordered">\
              <colgroup>\
                   <col span="1" style="width: 15%;">\
                   <col span="1" style="width: 15%;">\
                   <col span="1" style="width: 10%;">\
                   <col span="1" style="width: 15%;">\
                   <col span="1" style="width: 12%;">\
                   <col span="1" style="width: 12%;">\
                   <col span="1" style="width: 12%;">\
                   <col span="1" style="width: 9%;">\
               </colgroup>\
              <thead class="thead-dark">\
              <tr>\
              <th>DATE</th>\
               <th>BUYER</th>\
              <th>BALE NO.</th>\
              <th>QUALITY</th>\
              <th>DESIGN</th>\
              <th>TAKA</th>\
              <th>MTS</th>\
              <th style="width: 50px;"></th>\
              </tr>\
              </thead>';
    var ends = '</table>';
    var csrftoken = getCookie('csrftoken');
    $.ajax({
        type: 'POST',
        url: '/deleteSale',
        data: {
            bale: bale_id_del_table,
            prod: quality_del_table,
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
                tmp = tmp + '<td>' + dat[i].buyer_name.toString() + '</td>';
                tmp = tmp + '<td>' + dat[i].bale_no.toString() + '</td>';
                tmp = tmp + '<td>' + dat[i].our_quality_name.toString() + '</td>';
                tmp = tmp + '<td>' + dat[i].design.toString() + '</td>';
                tmp = tmp + '<td>' + dat[i].taka.toString() + '</td>';
                tmp = tmp + '<td>' + dat[i].mts.toString() + '</td>';
                tmp = tmp + '<td>' + '<button onclick="deleteGivenSaleEntry(this.id)"  class="btn btn-danger" id="delete_btnn" >Delete</button> ' + '</td>';
                tmp = tmp + '</tr>';
            }
            salesPage.innerHTML = starts + tmp + ends;
            for (var i = 0; i < dat.length; i++) {
                document.getElementById("delete_btnn").setAttribute("id", "delete" + dat[i].id.toString());
            }
        }
    })
})

function deleteGivenSaleEntry(id_to_delete) {
    swal({
        title: "This Entry will be Deleted permanently!",
        text: "Are you sure to proceed?",
        icon: "warning",
        buttons: {
            confirm: 'Yes',
            cancel: 'No'
        },
        dangerMode: true,
    })
        .then((isConfirm) => {
            if (isConfirm) {
                var salesPage = document.getElementById('salesPage');
                var starts = '<br><br><table class="table table-striped table-bordered">\
              <colgroup>\
                   <col span="1" style="width: 15%;">\
                   <col span="1" style="width: 15%;">\
                   <col span="1" style="width: 10%;">\
                   <col span="1" style="width: 15%;">\
                   <col span="1" style="width: 12%;">\
                   <col span="1" style="width: 12%;">\
                   <col span="1" style="width: 12%;">\
                   <col span="1" style="width: 9%;">\
               </colgroup>\
              <thead class="thead-dark">\
              <tr>\
              <th>DATE</th>\
               <th>BUYER</th>\
              <th>BALE NO.</th>\
              <th>QUALITY</th>\
              <th>DESIGN</th>\
              <th>TAKA</th>\
              <th>MTS</th>\
              <th ></th>\
              </tr>\
              </thead>';
                var ends = '</table>';
                var csrftoken = getCookie('csrftoken');
                $.ajax({
                    type: 'POST',
                    url: '/deleteGivenSale',
                    data: {
                        ids: id_to_delete,
                        bale: bale_id_del_table,
                        prod: quality_del_table,
                        csrfmiddlewaretoken: csrftoken
                    },
                    success: function (data) {
                        dat = JSON.parse(data);
                        for (var i = 0; i < dat.length; i++) {
                            dat[i] = JSON.parse(dat[i])
                        }
                        if (dat.length === 0){
                            salesPage.innerHTML = ""
                        }
                        else {
                            var tmp = '';
                            for (var i = 0; i < dat.length; i++) {
                                var arr = dat[i].date.split("-");
                                dat[i].date = arr[2] + "/" + arr[1] + "/" + arr[0];
                                tmp = tmp + '<tr>';
                                tmp = tmp + '<td>' + dat[i].date.toString() + '</td>';
                                tmp = tmp + '<td>' + dat[i].buyer_name.toString() + '</td>';
                                tmp = tmp + '<td>' + dat[i].bale_no.toString() + '</td>';
                                tmp = tmp + '<td>' + dat[i].our_quality_name.toString() + '</td>';
                                tmp = tmp + '<td>' + dat[i].design.toString() + '</td>';
                                tmp = tmp + '<td>' + dat[i].taka.toString() + '</td>';
                                tmp = tmp + '<td>' + dat[i].mts.toString() + '</td>';
                                tmp = tmp + '<td>' + '<button onclick="deleteGivenSaleEntry(this.id)"  class="btn btn-danger" id="delete_btnn" >Delete</button> ' + '</td>';
                                tmp = tmp + '</tr>';
                            }
                            salesPage.innerHTML = starts + tmp + ends;
                            for (var i = 0; i < dat.length; i++) {
                                document.getElementById("delete_btnn").setAttribute("id", "delete" + dat[i].id.toString());
                            }
                        }
                    }
                })

            }
        });
}


function editSale() {
    var csrftoken = getCookie('csrftoken');
    var salesPage = document.getElementById('salesPage');
    salesPage.innerHTML = '<br> <br> <br>\
    <form id="formEdit">\
    <h6 style="font-family: sans-serif">Enter Bale Number &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Choose Product</h6>\
    <div class="row">\
        <div class="col-md-2">\
            <input id="bale_no_for_edit" onchange="baleProdMappingEdit()" class="form-control" placeholder="Bale Number" min="1" type="number" required>\
        </div>\
        <div class="col-md-2">\
                <select id="product_options_edit" class="form-control" required>\
                 </select>\
        </div>\
        <div class="col-md-2">\
            <button type="submit" class="btn btn-secondary">Submit</button>\
        </div>\
    </div>\
    </form>'
    $.ajax({
        type: 'POST',
        url: '/getBaleProdMapSale',
        data: {
            csrfmiddlewaretoken: csrftoken
        },
        success: function (data) {
            baleProdMap = JSON.parse(data);
        }
    })

}


function baleProdMappingEdit() {
    document.getElementById('product_options_edit').innerHTML = '';
    bale_id = document.getElementById('bale_no_for_edit').value;
    if (bale_id === "") {
        var doNothing = 0;
    } else if (baleProdMap[bale_id] != null) {
        var arr = baleProdMap[bale_id];
        var option_field = '';
        for (var j = 0; j < arr.length; j++) {
            option_field = option_field + '<option>' + arr[j].toString() + '</option>'
        }
        document.getElementById('product_options_edit').innerHTML = option_field;
    } else {
        swal({
            icon: 'error',
            title: 'Error',
            text: 'No Entry Found with Bale Number = ' + bale_id,
        })
    }
}

//For the popup box
function baleProdMappingEdit2() {
    document.getElementById('our_quality_edit_popup').innerHTML = '';
    bale_id = document.getElementById('bale_edit_popup').value;
    if (bale_id === "") {
        var doNothing = 0;
    } else if (baleProdMap[bale_id] != null) {
        var arr = baleProdMap[bale_id];
        var option_field = '';
        for (var j = 0; j < arr.length; j++) {
            option_field = option_field + '<option>' + arr[j].toString() + '</option>'
        }
        document.getElementById('our_quality_edit_popup').innerHTML = option_field;
    } else {
        swal({
            icon: 'error',
            title: 'Error',
            text: 'No Entry Found with Bale Number = ' + bale_id,
        })
    }
}

$(document).on('submit', '#formEdit', function (e) {
    e.preventDefault();
    var salesPage = document.getElementById('salesPage');
    bale_id_edit_table = document.getElementById("bale_no_for_edit").value;
    quality_edit_table = document.getElementById("product_options_edit").value;
    var starts = '<br><br><table class="table table-striped table-bordered">\
              <colgroup>\
                   <col span="1" style="width: 15%;">\
                   <col span="1" style="width: 15%;">\
                   <col span="1" style="width: 10%;">\
                   <col span="1" style="width: 15%;">\
                   <col span="1" style="width: 12%;">\
                   <col span="1" style="width: 12%;">\
                   <col span="1" style="width: 12%;">\
                   <col span="1" style="width: 9%;">\
               </colgroup>\
              <thead class="thead-dark">\
              <tr>\
              <th>DATE</th>\
               <th>BUYER</th>\
              <th>BALE NO.</th>\
              <th>QUALITY</th>\
              <th>DESIGN</th>\
              <th>TAKA</th>\
              <th>MTS</th>\
              <th style="width: 50px;"></th>\
              </tr>\
              </thead>';
    var ends = '</table>';
    var csrftoken = getCookie('csrftoken');
    $.ajax({
        type: 'POST',
        url: '/deleteSale',
        data: {
            bale: bale_id_edit_table,
            prod: quality_edit_table,
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
                tmp = tmp + '<td>' + dat[i].buyer_name.toString() + '</td>';
                tmp = tmp + '<td>' + dat[i].bale_no.toString() + '</td>';
                tmp = tmp + '<td>' + dat[i].our_quality_name.toString() + '</td>';
                tmp = tmp + '<td>' + dat[i].design.toString() + '</td>';
                tmp = tmp + '<td>' + dat[i].taka.toString() + '</td>';
                tmp = tmp + '<td>' + dat[i].mts.toString() + '</td>';
                tmp = tmp + '<td>' + '<button onclick="showGivenSaleEntry(this.id)"  class="btn btn-success" id="edit_btnn" style="width: 100%"> Edit </button> ' + '</td>';
                tmp = tmp + '</tr>';
            }
            salesPage.innerHTML = starts + tmp + ends;
            for (var i = 0; i < dat.length; i++) {
                document.getElementById("edit_btnn").setAttribute("id", "edit" + dat[i].id.toString());
            }
        }
    })
})

function showGivenSaleEntry(id_to_edit) {
    var csrftoken = getCookie('csrftoken');
    $('#popupEditForm').show();
    $('#salesPage').hide();
    $('#edit-header').hide();

    $.ajax({
        type: 'POST',
        url: '/showEditEntry',
        data: {
            id: id_to_edit,
            csrfmiddlewaretoken: csrftoken
        },
        success: function (data) {
            item = JSON.parse(data);
            document.getElementById("date_edit_popup").value = item.date;
            document.getElementById("party_edit_popup").value = item.buyer_name;
            document.getElementById("bale_edit_popup").value = item.bale_no;
            document.getElementById("taka_edit_popup").value = item.taka;
            document.getElementById("mts_edit_popup").value = item.mts;
            document.getElementById("design_edit_popup").value = item.design;


            bale_id = item.bale_no;
            var arr = baleProdMap[bale_id];
            var option_field = '';
            for (var j = 0; j < arr.length; j++) {
                option_field = option_field + '<option>' + arr[j].toString() + '</option>'
            }
            document.getElementById('our_quality_edit_popup').innerHTML = option_field;

            // console.log("")
            document.getElementById("our_quality_edit_popup").value = item.our_quality_name;
            id_final_edit_popup = id_to_edit;


        }
    })
}

function closePopup() {
    stop_closing = 2;
    $('#popupEditForm').hide();
    $('#salesPage').show();
    $('#edit-header').show();
}


$(document).on('submit', '#popupForm', function (e) {
    e.preventDefault();
    if(stop_closing>1){
        stop_closing = 0
    }
    else {
        swal({
            title: "This Entry will be Edited permanently!",
            text: "Are you sure to proceed?",
            icon: "warning",
            buttons: {
                confirm: 'Yes',
                cancel: 'No'
            },
            dangerMode: true,
        })
            .then((isConfirm) => {
                if (isConfirm) {
                    var salesPage = document.getElementById('salesPage');

                    var starts = '<br><br><table class="table table-striped table-bordered">\
              <colgroup>\
                   <col span="1" style="width: 15%;">\
                   <col span="1" style="width: 15%;">\
                   <col span="1" style="width: 10%;">\
                   <col span="1" style="width: 15%;">\
                   <col span="1" style="width: 12%;">\
                   <col span="1" style="width: 12%;">\
                   <col span="1" style="width: 12%;">\
                   <col span="1" style="width: 9%;">\
               </colgroup>\
              <thead class="thead-dark">\
              <tr>\
              <th>DATE</th>\
               <th>BUYER</th>\
              <th>BALE NO.</th>\
              <th>QUALITY</th>\
              <th>DESIGN</th>\
              <th>TAKA</th>\
              <th>MTS</th>\
              <th style="width: 50px;"></th>\
              </tr>\
              </thead>';
                    var ends = '</table>';
                    var csrftoken = getCookie('csrftoken');
                    $.ajax({
                        type: 'POST',
                        url: '/editGivenSale',
                        data: {
                            id: id_final_edit_popup,
                            bale: bale_id_edit_table,
                            prod: quality_edit_table,
                            date_popup: $('#date_edit_popup').val(),
                            party_popup: $('#party_edit_popup').val(),
                            bale_popup: $('#bale_edit_popup').val(),
                            our_quality_popup: $('#our_quality_edit_popup').val(),
                            design_popup: $('#design_edit_popup').val(),
                            taka_popup: $('#taka_edit_popup').val(),
                            mts_popup: $('#mts_edit_popup').val(),

                            csrfmiddlewaretoken: csrftoken
                        },
                        success: function (data) {
                            dat = JSON.parse(data);
                            $('#popupEditForm').hide();
                            $('#salesPage').show();
                            $('#edit-header').show();

                            for (var i = 0; i < dat.length; i++) {
                                dat[i] = JSON.parse(dat[i])
                            }

                            var tmp = '';
                            for (var i = 0; i < dat.length; i++) {
                                var arr = dat[i].date.split("-");
                                dat[i].date = arr[2] + "/" + arr[1] + "/" + arr[0];
                                tmp = tmp + '<tr>';
                                tmp = tmp + '<td>' + dat[i].date.toString() + '</td>';
                                tmp = tmp + '<td>' + dat[i].buyer_name.toString() + '</td>';
                                tmp = tmp + '<td>' + dat[i].bale_no.toString() + '</td>';
                                tmp = tmp + '<td>' + dat[i].our_quality_name.toString() + '</td>';
                                tmp = tmp + '<td>' + dat[i].design.toString() + '</td>';
                                tmp = tmp + '<td>' + dat[i].taka.toString() + '</td>';
                                tmp = tmp + '<td>' + dat[i].mts.toString() + '</td>';
                                tmp = tmp + '<td>' + '<button onclick="showGivenSaleEntry(this.id)"  class="btn btn-success" id="edit_btnn" style="width: 100%"> Edit </button> ' + '</td>';
                                tmp = tmp + '</tr>';
                            }
                            salesPage.innerHTML = starts + tmp + ends;
                            for (var i = 0; i < dat.length; i++) {
                                document.getElementById("edit_btnn").setAttribute("id", "edit" + dat[i].id.toString());
                            }
                            stop_closing=0
                        }
                    })
                }
            });
    }

})

