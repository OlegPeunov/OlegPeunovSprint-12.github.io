class Card{
  constructor(cardData, openImageCallback){
    this.cardData = cardData;
    this.openImageCallback = openImageCallback;
    
  }

  like=(evt)=> {
    evt.target.classList.toggle('place-card__like-icon_liked')
  }


  remove=(event)=>{   
    const card = event.target.closest('.place-card');
    card.parentElement.removeChild(card);
    /* Можно лучше:

    Вынести удаление обработчиков с элементов в отдельный метод, например removeEventListeners и вызывать его внутри remove
    */
    card.querySelector('.place-card__like-icon').removeEventListener('click', this.like) 
    card.querySelector('.place-card__image').removeEventListener('click', this.openImage)
    card.querySelector('.place-card__delete-icon').removeEventListener('click', this.remove)
  }


  create(){
    /* Можно лучше:

    Создавать карточку не вручную через createElement, а использовать
    для этого разметку в виде шаблонной строки.

    Стоит обратить внимание, что вставка данных с помощью интерполяции шаблонной строки и insertAdjacentHTML
    может привести к уязвимости XSS, т.к. данные вставляются на страницу как обычный html, а если они придут
    с сервера в данных может быть код злоумышленника и он будет вставлен на страницу как html и исполнится.
    Поэтому необходимо фильтровать html теги во вставляемых данных (такая процедура называется HTML sanitization

    Пример как это сделать есть здесь:
    https://gomakethings.com/preventing-cross-site-scripting-attacks-when-using-innerhtml-in-vanilla-javascript/ )

    или вставлять данные с помощью textContent и style.backgroundImage уже после создания разметки
    элемента как показано на примере ниже:

    const template = document.createElement("div");
    template.insertAdjacentHTML('beforeend', `
    <div class="place-card">
        <div class="place-card__image">
            <button class="place-card__delete-icon"></button>
        </div>
        <div class="place-card__description">
            <h3 class="place-card__name"></h3>
            <button class="place-card__like-icon"></button>
        </div>
    </div>`);
    const placeCard = template.firstElementChild;
    placeCard.querySelector(".place-card__name").textContent = name;
    placeCard.querySelector(".place-card__image").style.backgroundImage = `url(${link})`;
        
        
    Так же для создания разметки можно использовать тег tempate
    https://learn.javascript.ru/template-tag
    https://frontender.info/template/
    */
    const plaseCard = document.createElement('div');
    const plaseCardImage = document.createElement('div');
    const placeCardDeleteIcon = document.createElement('button');
    const placeCcardDescription = document.createElement('div');
    const placeCardName = document.createElement('h3');
    const placeCardLikeIcon = document.createElement('button');
    
    plaseCard.classList.add('place-card');
    plaseCardImage.classList.add('place-card__image');
    placeCardDeleteIcon.classList.add('place-card__delete-icon');
    placeCcardDescription.classList.add('place-card__description');
    placeCardName.classList.add('place-card__name');

    placeCardName.textContent = this.cardData.name;
    /*
    Отлично, что используется интерполяция строк из ES6, так держать!
    */
    plaseCardImage.style.backgroundImage = `url(${this.cardData.link})`
    placeCardLikeIcon.classList.add('place-card__like-icon');

    placeCcardDescription.appendChild(placeCardName);
    placeCcardDescription.appendChild(placeCardLikeIcon);
    plaseCardImage.appendChild(placeCardDeleteIcon);

    plaseCard.appendChild(plaseCardImage);
    plaseCard.appendChild(placeCcardDescription);

    placeCardLikeIcon.addEventListener('click', this.like) 
    placeCardDeleteIcon.addEventListener('click', this.remove) 
    plaseCardImage.addEventListener('click', this.openImage);
    
    return plaseCard
  }

  openImage=()=>{ 
    this.openImageCallback(this.cardData.link);   
    
  } 
}


  