let buyForm = document.getElementById('buyForm')
let alertSuccess = document.getElementById('alertSuccess');
let closeAlert = document.getElementById('closeAlert');

buyForm.addEventListener('submit', (event) => {
    event.preventDefault();
    let metodosPagosError = document.getElementById('metodosPagosError')
    let tarjetaDeCredito = document.getElementById('radio1');
    let transferenciaBancaria = document.getElementById('radio2');
    console.log(transferenciaBancaria.checkValidity());

    if (!buyForm.checkValidity()) {
        console.log('no se realiza la compra');
        event.preventDefault();
        //console.log(formaPago.checked)

        if ((!tarjetaDeCredito.checked && !transferenciaBancaria.checked)) {
            metodosPagosError.style.display = "block"
           //formaPago.getElementById('modalerror').style.color = 'red'
        }
        else {
            metodosPagosError.style.display = 'none';
            //document.getElementById('modalerror').style.color = 'green'
        }

    } else {
        //event.preventDefault(); // con este prevent default ya no se recarga la pagina
        console.log('se realiza la compra');
        //console.log(formaPago.checked);
        buy()

    }
    
    buyForm.classList.add('was-validated')

})

function buy() {
    alertSuccess.classList.remove('d-none');
    alertSuccess.classList.add('fade-in');
}

closeAlert.addEventListener('click', () => {
    alertSuccess.classList.add('d-none');
    itemsLocalStorage = [];
    localStorage.setItem("cartlist", JSON.stringify(itemsLocalStorage));
    window.location.reload();
});