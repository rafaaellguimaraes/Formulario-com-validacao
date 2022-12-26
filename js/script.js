//Pegar o formulario com a classe b7validator
let form = document.querySelector('.b7validator')

//Faz o bloqueio do envio
let B7Validator = {
    handleSubmit: () => {
        event.preventDefault()
        let send = true

        //Aqui eu armazeno a quantidade de inputs na variavel
        let inputs = form.querySelectorAll('input')
        //Limpa erros
        B7Validator.clearErrors()
        //Faço um loop para percorrer e saber quantas temos
        for(let i = 0; i < inputs.length; i++){
            //input recebe a quantidade e sua posição
            let input = inputs[i]
            //Aqui na variavel check, recebemos o retorno de checkInput
            let check = B7Validator.checkInput(input)
            //Se essa função não retornar true, send = false
            if(check !== true){
                send = false
                //Exibir o erro
                B7Validator.showError(input, check)
            }
        }

        if(send){
            form.submit()
        }
    },
    //Essa função vai verificar cada regra específica e se tem alguma regra
    checkInput:(input) => {
        //Rules vai receber o atributo data-rules
        let rules = input.getAttribute('data-rules')
        //Se for diferente de nulo, significa que temos regras, se nao, return true.
        if(rules !== null){
            //Rules.split na barrinha, que é quem separa as regras
            rules = rules.split('|')
            //Aqui eu vou dar um for em cada uma das regras e vou verificar cada uma das regras. Uma regra ela pode ter apenas um nome, ou um valor associado a um nome, ex: ou required ou min=2
            for(let k in rules){
                let rDetails = rules[k].split('=')
                switch(rDetails[0]){
                    case 'required':
                        if(input.value == ''){
                            return 'Campo obrigatório'
                        }
                    break;
                    case 'min':
                        if(input.value.length < rDetails[1]){
                            return `Campo precisa ter pelo menos ${rDetails[1]} caracteres`
                        }
                    break;
                    case 'email':
                        if(input.value !== ''){
                            //Nessa expressão regular a gente verifica se o email digitado no input segue o mesmo padrão
                            let regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/ 
                            if(!regex.test(input.value.toLowerCase())){
                                return 'Campo de email precisa ser válido'
                            }
                        }
                    break;
                }
            }
        }
        return true
    },

    showError:(input, error) => {
        input.style.borderColor = '#FF0000'
        //Cria um elemento e joga na posição certa.
        //Aqui eu crio uma div
        let errorElement = document.createElement('div')
        //Adiciono uma classe error na div
        errorElement.classList.add('error')
        //E a mensagem de erro recebe o proprio erro
        errorElement.innerHTML = error

        //Adicionando a mensagem na tela no campo certo
        input.parentElement.insertBefore(errorElement, input.ElementSibling)
    },

    clearErrors:() => {
        let inputs = form.querySelectorAll('input')
        for(let i = 0; i < inputs.length; i++){
            //inputs[i].style = ''
            inputs[i].style.borderColor = 'green'
        }
        let errorElements = document.querySelectorAll('.error')
        for(let i = 0; i < errorElements.length; i++){
            errorElements[i].remove()
        }
    }

}
form.addEventListener('submit', B7Validator.handleSubmit)