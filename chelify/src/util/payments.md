efectivo {
    nombre
    balance
}

cuenta bancaria {
    banco
    balance
    tarjeta {
        apodo (opcional)
        proveedor
        ultimos 4 digitos
    }
}

tarjeta de credito {
    proveedor
    ultimos 4 digitos
    balance
}

transacciones recurrentes {
    nombre
    dia del mes
    cantidad
    cuenta
}