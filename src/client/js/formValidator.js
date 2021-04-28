function formValidator(inputText){
    if(document.getElementById('destination').value == "" || destination.value == null)
    {
        document.querySelector('.emptycity').classList.remove('displaynone');
        return false
    }
}

export{formValidator}