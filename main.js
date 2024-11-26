function convertirMoneda(){
    const monto = parseFloat(document.getElementById("cantidad").value)
    const fromCurrency = document.getElementById("from-currency").value
    const toCurrency = document.getElementById("to-currency").value

    if(!monto || monto <= 0){
        alert("No valido")
        return
    }
    
   fetch('https://dolarapi.com/v1/cotizaciones')
    .then(response => response.json())
    .then(data => {
      console.log(data);
        
      const fromRate = data.find(entry => entry.moneda === fromCurrency)?.venta
      const toRate = data.find(entry => entry.moneda === toCurrency)?.venta

      if(!fromRate || !toRate){
        alert("No se encontro tasa de cambio para estas monedas")
       }

       const convertir =  (monto / toRate) * fromRate

       const resultado = document.getElementById("resultado")
       resultado.textContent = `${monto} ${fromCurrency} equivale a ${convertir.toFixed(2)} ${toCurrency}`
     })
    .catch(error => console.error("Error al cargar datos: ", error))
        
}

