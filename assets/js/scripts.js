let input = document.querySelector('.display');
let btnNum = document.querySelector('.btn-num');
let formatError = document.querySelector('.hide-error');
const CODE_ENTER = 13;

document.addEventListener('click', e => {
    const el = e.target;
    input.focus();
    if (el.classList.contains('btn-num')) input.value += el.innerText;

    if (el.classList.contains('btn-clear')) {
        input.value = '';
        removeHideError();
    }

    if (el.classList.contains('btn-del')) {
        input.value = input.value.slice(0, -1);
        removeHideError();
    }

    if (el.classList.contains('btn-eq')) realizaConta();
});

document.addEventListener('keypress', e => {
    if (e.keyCode === CODE_ENTER) realizaConta();
    if (!validaInput(e)) e.preventDefault();
});

const realizaConta = () => {
    try {
        removeHideError();
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

const addHideError = () => {
    formatError.classList.add('hide-error');
    formatError.innerHTML = 'Erro de formato!';
    input.style.color = 'red';
}

const removeHideError = () => {
    formatError.classList.remove('hide-error');
    formatError.innerHTML = '';
    input.style.color = 'black';
}


const validaInput = (e) => {
    const char = String.fromCharCode(e.keyCode);
    const pattern = '[0-9-/*+.,()]';

    if (char.match(pattern)) return true;
};