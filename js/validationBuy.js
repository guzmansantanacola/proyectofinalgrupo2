let buyForm = document.getElementById('buyForm')
let alertSuccess = document.getElementById('alertSuccess');
let closeAlert = document.getElementById('closeAlert');

buyForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    let metodosPagosError = document.getElementById('metodosPagosError')
    let tarjetaDeCredito = document.getElementById('radio1');
    let transferenciaBancaria = document.getElementById('radio2');
    console.log(transferenciaBancaria.checkValidity());

    if (!buyForm.checkValidity()) {
        console.log('no se realiza la compra');
        event.preventDefault();

        if ((!tarjetaDeCredito.checked && !transferenciaBancaria.checked)) {
            metodosPagosError.style.display = "block";
        }
        else {
            metodosPagosError.style.display = 'none';

        }

    } else {

        console.log('se realiza la compra');
        await buy();

    }
    


    buyForm.classList.add('was-validated');

});

let token = localStorage.getItem("token")
    let items = localStorage.getItem("cartlist")
    let itemsObject = {items}


async function buy() {
    alertSuccess.classList.remove('d-none');
    alertSuccess.classList.add('fade-in');

    console.log(token);
    try {
        let response = await fetch("http://localhost:3000/cart", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(itemsObject)
        });

        // Manejar la respuesta del servidor
        if (response.ok) {
            // La solicitud fue exitosa (código de estado 2xx)
            let data = await response.json();
            console.log(data);
        } else {
            // La solicitud no fue exitosa, manejar el error
            console.error(`Error en la solicitud: ${response.status} - ${response.statusText}`);
        }
    } catch (error) {
        // Manejar errores de red u otros errores durante la solicitud
        console.error('Error durante la solicitud:', error);
    }
};

closeAlert.addEventListener('click', () => {
    alertSuccess.classList.add('d-none');
    itemsLocalStorage = [];
    localStorage.setItem("cartlist", JSON.stringify(itemsLocalStorage));
    window.location.reload();
});