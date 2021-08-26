window.addEventListener('DOMContentLoaded', () => {
    const menu = document.querySelector('.menu'),
        menuItem = document.querySelectorAll('.menu_item'),
        hamburger = document.querySelector('.hamburger');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('hamburger_active');
        menu.classList.toggle('menu_active');
    });

    menuItem.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.toggle('hamburger_active');
            menu.classList.toggle('menu_active');
        });
    });
});

function openModal(modals, buttons, x) {

    const modal = document.querySelector(modals),
        close = document.querySelector(x),
        btns = document.querySelectorAll(buttons);
        

    btns.forEach(btn =>  {
        btn.addEventListener('click', () => {
            modal.style.display = 'block';
        });  
    });

    close.addEventListener('click', () =>{
        modal.style.display = 'none';
    });
}

openModal('.overlay', '.subheader .subheader_btn', '.modal__close' );
openModal('.overlay', '.promo_btn', '.modal__close' );


const form = () =>{ 
    const form = document.querySelector('form');

    const message = {
        loading: 'Загрузка...',
        success: 'Спасибо! Мы с вами скоро свяжeмся',
        failure: 'Что-то пошло не так...'
    };

    //переменная с функцией, которая будет отвечать за отправку данных на сервер
    const postData = async(url, data) =>{
        document.querySelector('.status').textContent = message.loading;
        let res = await fetch(url, {
            method: "POST",
            body: data
        });

        return await res.text();
    };

 
    function clearInput(inputs){

        const input = document.querySelectorAll(inputs);

        input.forEach(item => {
            item.value = '';
        });
    } 
 
    
    form.addEventListener('submit', (e) =>{
        e.preventDefault(); //отключaем перезагрузку

        let statusMessage = document.createElement('div');
        statusMessage.classList.add('status');
        form.appendChild(statusMessage); //помещаем в конец формы


        const formData = new FormData(form);
        //FormData это объект, ктр соберет все содержание в инпутах и поместить в перемен formData


        //отправляем переменую postData на сервер 
        postData('mailer/smart.php', formData)
        .then(res =>{
            console.log(res);
            statusMessage.textContent= message.success;
        })
        .catch ( ()=>{
            statusMessage.textContent= message.failure;
        })
        .finally ( ()=>{
            clearInput('input');
            clearInput('textarea');
            clearInput('checkbox');
            setTimeout ( ()=>{
                statusMessage.remove();
            },5000);
        });


    });
    
};

form();