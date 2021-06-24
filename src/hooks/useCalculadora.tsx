import { useRef, useState } from "react";

enum Operadores {
    sumar, restar, multiplicar, dividir
}

export const useCalculadora = () => {
    
    const [numeroAnterior, setNumeroAnterior] = useState('0');
    const [numero, setNumero] = useState('0');

    const ultimaOperacion = useRef<Operadores>();

    const limpiar = () => {
        setNumero('0');
        setNumeroAnterior('0');
    }

    const armarNumero = (numeroTexto: string) => {
        //no aceptar doble puntos
        if(numero.includes('.') && numeroTexto === '.') return;

        if(numero.startsWith('0') || numero.startsWith('-0')){
            //Punto decimal
            if(numeroTexto === '.'){
                setNumero(numero + numeroTexto);
                //evaluar si es otro 0 y si hay un punto.
            }else if(numeroTexto === '0' && numero.includes('.')){
                setNumero(numero + numeroTexto);

                //evaluar sin hay un numero diferente de 0 y no hya punto .
            }else if(numeroTexto !== '0' && !numero.includes('.')){
                setNumero(numeroTexto);

                //evitar el 000.0
            }else if(numeroTexto === '0' && !numero.includes('.')){
                setNumero(numero);
            }else{
                setNumero(numero + numeroTexto);
            }
        }else{
            setNumero(numero + numeroTexto);
        }

    }

    const positivoNegativo = () => {
        if(numero.includes('-')){
            setNumero(numero.replace('-', ''));
        }else{
            setNumero('-' + numero);
        }
    }

    const bntDelete = () => {
        if (numero.length === 1 || numero === `-${numero.charAt(numero.length - 1)}`) {
            setNumero('0');
        }else{
            setNumero(numero.substr(0, numero.length - 1));
        }
    }

    const cambiarNumPorAnterior = () => {
        if(numero.endsWith('.')){
            setNumeroAnterior(numero.slice(0,-1));
        }else{
            setNumeroAnterior(numero);
        }
        setNumero('0');
    }

    const btnDividir = () => {
        cambiarNumPorAnterior();
        ultimaOperacion.current = Operadores.dividir;
    }

    const btnMultiplicar = () => {
        cambiarNumPorAnterior();
        ultimaOperacion.current = Operadores.multiplicar;
    }
    
    const btnRestar = () => {
        cambiarNumPorAnterior();
        ultimaOperacion.current = Operadores.restar;
    }

    const btnSumar = () => {
        cambiarNumPorAnterior();
        ultimaOperacion.current = Operadores.sumar;
    }

    const calcular = () => {
        const num1 = Number(numero);
        const num2 = Number(numeroAnterior);

        switch (ultimaOperacion.current) {
            case Operadores.sumar:
                setNumero(`${num1 + num2}`);
                break;

            case Operadores.restar:
                setNumero(`${num2 - num1}`);
                break;

            case Operadores.multiplicar:
                setNumero(`${num1 * num2}`);
                break;

            case Operadores.dividir:
                setNumero(`${num2 / num1}`);
                break;
        }

        setNumeroAnterior('0');
    }

    return {
        numero,
        numeroAnterior,
        limpiar,
        positivoNegativo,
        bntDelete,
        btnDividir,
        btnMultiplicar,
        btnSumar,
        btnRestar,
        armarNumero,
        calcular
    }
}
