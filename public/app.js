$(document).ready(function() {

    //Init
    $("#rangoPrecio").ionRangeSlider({
        type: "double",
        grid: false,
        min: 0,
        max: 100000,
        from: 1000,
        to: 20000,
        prefix: "$"
    });

    init();
    setSearch();


    //main

    // makes ajax request to get all or filered data
    $('#buscar').click(function() {
        if ($("#checkPersonalizada")[0].checked){
            var valores = $("#rangoPrecio").val();
            valores = valores.split(";");
            var urls = `http://localhost:3000/ciudad/${$("#ciudad").val()}/tipo/${$("#tipo").val()}/desde/${valores[0]}/hasta/${valores[1]}`;
        } else {
            var urls = "http://localhost:3000/search";
        }
        $.ajax({
            url: urls,
            type: 'get',
            dataType: 'json'
          })
            .done(function(data){
                if (!data.error) {
                    // console.log(data);
                    $('.lista').html(renderCard(data.datos));
                }
            });
    });



    // cleates HTML/Template for '<option>'
    function renderSelect(data) {
        // data must be an array ['NY', 'Miami', 'LA']
        var html = '';
        data.forEach(function(key, idx) {
            html += `<option value="${key}">${key}</option>`;
        });
        return html;
    }

    // genereate HTML/Template for a 'card' / 'house available'
    function renderCard(objArr) {
        var html = '';

        objArr.forEach(function(key, idx)
        {
            html += `<div class="card horizontal">
                    <div class="card-image">
                        <img src="http://localhost:3000/img/home.jpg">
                    </div>
                    <div class="card-stacked">
                        <div class="card-content">
                            <div> <p><strong>Direccion: </strong>${ key.Direccion }</p> </div>
                            <div> <p><strong>Ciudad: </strong>${ key.Ciudad }</p> </div>
                            <div> <p><strong>Telefono: </strong>${ key.Telefono }</p> </div>
                            <div> <p><strong>Código postal: </strong>${ key.Codigo_Postal }</p> </div>
                            <div> <p><strong>Precio: </strong>${ key.Precio }</p> </div>
                            <div> <p><strong>Tipo: </strong>${ key.Tipo }</p> </div>
                        </div>
                    </div>
                </div>`;
        });
        return html;
    } // .renderCard

    // loads advanced filtering options
    function init(){
        $.ajax({
            url: 'http://localhost:3000/filteroptions',
            type: 'get',
            dataType: 'json'
        })
        .done(function(data) {
            if (!data.error) {
                console.log(data);
                $('#ciudad').append(renderSelect(data.ciudades));
                $('#tipo').append(renderSelect(data.tipos));
                $("#ciudad").material_select();
                $("#tipo").material_select();
            }
        });
    } // .init

    // advance search options class
    function setSearch() {
        let busqueda = $('#checkPersonalizada');
        busqueda.on('change', (e) => {
            this.customSearch = !this.customSearch;
            $('#personalizada').toggleClass('invisible');
        });
    }
});
