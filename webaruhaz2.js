$(function () {

    $("#kuld").click(UjRekordBeszur);

    $.ajax(
            {url: "termekek.json", success: function (result) {
//                    console.log(result);
                    termekTomb = result;
                    kiir();
                    $("article").on("click", "th", rendez);

                    $("article").on("click", "tr #torol", torol);


                }});



});

var termekTomb = [];

function formKiurit() {
    $('input:text').val('');
    $("input[type='number']").val('');
}

function tablazatFejlecKiir(tomb) {
    //
    $("article").append("<table></table>");
    $("article table").append("<tr></tr>");
    for (var item in tomb[0]) {
        $("article table tr").append("<th id='" + item + "'>" + item + "</th>");
    }
    $("article table tr").append("<th>Rekord eltávolítása</th><th>Rekord módosítása</th>");
}




function tablazatSorokKiir(tomb) {
    for (var i = 0; i < tomb.length; i++) {
        $("article table").append("<tr id='" + i + "'></tr>");
        for (var item in tomb[i]) {
            $("article table tr").eq(i + 1).append("<td>" + tomb[i][item] + "</td>"); 

        }
        $("article table tr").eq(i + 1).append("<td><input type='button' id='torol' value='Töröl'></td><td><input type='button' id='modosit' value='Módosít'></td>");
    }
}


function torol() {
    
    if (termekTomb.length > 1) {
        var sorSzama = $(this).attr("id");
        termekTomb.splice(sorSzama, 1);
        kiir();

//    console.log(gombID.slice(-1));

    } else if (termekTomb.length === 1) { 
        var sorSzama = $(this).attr("id");   
        termekTomb.splice(sorSzama, 1);
        $("article").empty(); 
        csakFejlec();
       
    }
}

function csakFejlec() {
    $("article").append("<table></table>");
    $("article table").append("<tr><th>Név</th><th>db</th><th>Cikkszám</th><th>Ár</th><th>Használt</th><th>Rekord eltávolítása</th> <th>Rekord módosítása</th></tr>");   

}


function kiir() {
    $("article").empty();
    formKiurit();
    tablazatFejlecKiir(termekTomb);
    tablazatSorokKiir(termekTomb);
    $("article table th").hover(kiemel);
}

function hasznalt() {
    var hasznalt = $("input[name='hasznalt']:checked").val();
    if (hasznalt === "true")
        return "igen";
    else if (hasznalt === "false")
        return "nem";
    else
        return "Nincs információ";

}

function UjRekordBeszur() {

    var termekObjektum = {
        Név: $("#nev").val(),
        db: $("#darab").val(),
        Cikkszám: $("#cikkszam").val(),
        Ár: $("#ar").val(),
        Használt: hasznalt()
    };


    if (valid()) {
        termekTomb.push(termekObjektum);
        kiir();
        formKiurit();
    } else {
        alert("Hibás adat vagy kitöltetlen adatmező.");
    }

}


function kiemel() {
    $(this).toggleClass("kiemel"); 
}



var novekvo = true;
function rendez() {
    var mezo = $(this).attr("id"); 
    console.log("Mezőnév: " + mezo);
    if (mezo === "db" || mezo === "Cikkszám" || mezo === "Ár") {
        if (novekvo) {
            termekTomb.sort(
                    function (a, b) {
                        console.log(a[mezo]);
                        return a[mezo] - b[mezo];
                    }
            );
        } else {
            termekTomb.sort(
                    function (a, b) {
                        console.log(a[mezo]);
                        return b[mezo] - a[mezo];
                    });
//            
        }
    } else {
        if (novekvo) {
            termekTomb.sort(
                    function (a, b) {
                        console.log(a[mezo]);
//                        
                        return Number(a[mezo] > b[mezo]) - 0.5; 
                    }
            );
//            
        } else {

            termekTomb.sort(
                    function (a, b) {
                        console.log(a[mezo]);
                        return Number(a[mezo] < b[mezo]) - 0.5;
                    }
            );
        }
    }
    novekvo = !novekvo;
    kiir();
}


function valid() {

    var nevInput = $("#nev").val();
    var dbInput = $("#darab").val();
    var cikkszam = $("#cikkszam").val();
    var arInput = $("#ar").val();

    console.log(dbInput);

    var nev_helyes;
    if (nevInput.length > 2)
        nev_helyes = true;

    var db_helyes;
    if (dbInput > 0)
        db_helyes = true;

    var cikkszam_helyes;
    if (cikkszam > 0)
        cikkszam_helyes = true;

    var ar_helyes;
    if (arInput > 0)
        ar_helyes = true;

    return nev_helyes && db_helyes && cikkszam_helyes && ar_helyes;
}