const signin_button_reg = document.querySelector('#signin_button_reg');
signin_button_reg.addEventListener('btns_r', (e) => {
    e.preventDefault();

    //get user info
    const email = signin_button_reg['client_info'].value;
    const password = signin_button_reg['client_info1'].value;
    console.log(email, password)
})