let input = document.querySelector('.display');
let btnNum = document.querySelector('.btn-num');
let formatError = document.querySelector('.hide-error');
const CODE_ENTER = 13;
const CODE_VIRGULA = ',';

// ação baseado nos botões.
document.addEventListener('click', e => {
    const el = e.target;
    input.focus();

    if (el.classList.contains('btn-num')) {
        input.value += el.innerText;
    }

    if (el.classList.contains('btn-clear')) {
        input.value = '';
        removeHideError();
    }

    if (el.classList.contains('btn-del')) {
        input.value = input.value.slice(0, -1);
        removeHideError();
    }

    if (el.classList.contains('btn-eq')) {
        realizaConta();
    }

});

// Resultado ao pressionar Enter
document.addEventListener('keypress', e => {
    if (e.keyCode === CODE_ENTER) {
        realizaConta();
    }

    if (!validaInput(e)) {
        e.preventDefault();
    }
});

// Substituição da virgula por ponto no input
$('.display').on('input', function () {
    this.value = this.value.replace(CODE_VIRGULA, '.');
});

// Limpar input com C ou ESC
document.addEventListener('keyup', e => {
    if (e.key === 'c' || e.key === 'C' || e.key=== 'Escape') {
        console.log(e);
        input.value = '';
        removeHideError();
    }
});

// Função para realizar conta.
const realizaConta = () => {
    try {
        removeHideError();
        // parseFloat no eval para permissão de cálculos com números negativos também.
        const conta = parseFloat(eval(input.value));
        let valida = input.value;

        if (valida == '' || valida == 0) {
            input.value = '';
            return;
        }

        if (!conta) {
            addHideError();
            return;
        }
        input.value = conta;

    } catch (err) {
        addHideError();
        return;
    }
};

// Apresentando frase de erro de formato
const addHideError = () => {
    formatError.classList.add('hide-error');
    formatError.innerHTML = 'Erro de formato!';
    input.style.color = 'red';
}

// Removendo frase de erro de formato.
const removeHideError = () => {
    formatError.classList.remove('hide-error');
    formatError.innerHTML = '';
    input.style.color = 'black';
}

// Validando inserção de caracteres no input
const validaInput = (e) => {
    const char = String.fromCharCode(e.keyCode);
    const pattern = '[0-9-/*+.,()]';

    if (char.match(pattern)) {
        return true;
    }
};