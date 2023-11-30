// Written by: sub's
// Date: 30.11.2023
// Description: This code deals with HTML, CSS, and vanilla JavaScript.
// Please specify any particular points or features you want to emphasize.
// Feel free to reach out if you have any questions or need additional explanations!



// elemet index return
HTMLElement.prototype.getIndex = function(){
    let temp = -1;
    const _p = this.parentNode;
    const _c = _p.children;
    for(let i=0; i<_c.length; i++){
        const c = _c[i];
        if(c === this){
            temp = i;
            break;
        }
    }
    return temp;
}

// parents
HTMLElement.prototype.parent = function(t){
    let temp = null;
    const firstTxt = t.match(/^./g)[0];
    const check = (firstTxt === ".")?"c":(firstTxt === "#")?"i":"t"
    const txt = t.replace(/(^\.|^#)/g,'');
    const innerFn = (e)=>{
        switch(check) {
            case "c" :
                if(e.classList.contains(txt)) temp = e;
                break;
                case "i" :
                if(e.id === txt) temp = e;
                break
            default :
                if(e.tagName && e.tagName.toLowerCase() === txt) temp = e;
                break
        }
        if(temp === null && e.parentNode.tagName) innerFn(e.parentNode);
    }
    innerFn(this);
    return temp;
}

// 탭에 대한 함수를 정의 하고 그 조건에 맞게 호출한다.
function tabEvent(value){
    // console.log(typeof value)
    if(typeof value === 'string' || typeof value === 'object'){
        tabString(value)
       //console.log('문자열')
    } else { 
        tabNumber(value)
        //console.log('숫자열')
    }
}

function tabNumber(num){
    const _this = event.currentTarget;
    const tabButtons = document.querySelectorAll('.tab-menu > button');
    const _index = (num !== undefined) ? num : Array.from(tabButtons).indexOf(_this);

    tabButtons.forEach((item, index)=>{
        const controls = document.querySelector(`#${item.getAttribute('aria-controls')}`)
        if(index === _index){
            item.classList.add('isActive');
            controls.classList.add('isActive');
        }else {
            item.classList.remove('isActive');
            controls.classList.remove('isActive');
        }   
    });
}

function tabString(str){
    /// console.log(typeof str , "ddd") // typeof 로 어떤 형태로 넘어오는지 확인

    const _this = (typeof str === 'object') ? str : event.currentTarget; 
    const tabButtons = document.querySelectorAll('.tab-menu > button');
    const _getStr = (typeof str === 'object') ? str.getAttribute('aria-controls') : str
    const _id = (str !== undefined && typeof str === 'string') ? str : _this.getAttribute('aria-controls')
    // console.log(_id, "id");

    // console.log(str.getAttribute('aria-controls') , 'this?')

    tabButtons.forEach((item, index)=>{
        // console.log(controls , "controls")
        const controls = document.getElementById(item.getAttribute('aria-controls'));
        if(item.getAttribute('aria-controls') === _id){
            item.classList.add('isActive');
            controls.classList.add('isActive')
        } else {
            item.classList.remove('isActive');
            controls.classList.remove('isActive')
        }
    })
}




// 아코디언 이벤트 위임 메뉴
const accordion = document.querySelector('.accordion')
accordion.addEventListener('click', function(e){
    const currentTarget = e.target;
    const prevActive = this.querySelector('.isActive');

    if( e.target.closest('.content') ) return; // 컨텐츠를 클릭 했을때 리턴
    if (prevActive) {
        prevActive.classList.remove('isActive');
        prevActive.querySelector('.content').style.height = ''; 

        // 트랜지션이 종료 된 후 실행
        prevActive.querySelector('.content').addEventListener('transitionend', ()=>{
            if(!prevActive.classList.contains('isActive') && prevActive.querySelector('.content').style.height == ''){
                prevActive.querySelector('.content').style.display = 'none';
                prevActive.querySelector('.content').setAttribute('aria-hidden', true);
                prevActive.querySelector('.headBtn').setAttribute('aria-expanded', false);
            }
        });
    }
    if(currentTarget.classList.contains('headBtn')) {
        currentTarget.parentNode.classList.add('isActive');
        currentTarget.parentNode.querySelector('.content').style.display = 'block';
        currentTarget.parentNode.querySelector('.content').style.height = currentTarget.parentNode.querySelector('.content').scrollHeight + 'rem'
        currentTarget.parentNode.querySelector('.content').setAttribute('aria-hidden', false);
        currentTarget.parentNode.querySelector('.headBtn').setAttribute('aria-expanded', true);
    }
});


// 아코디언 함수형
function accaordionFn(){
    const _this = event.currentTarget; 
    const prevActive = _this.closest('ul').querySelector('.isActive');

    if(prevActive){
        prevActive.classList.remove('isActive');
        prevActive.querySelector('.content').style.height = '';
        prevActive.addEventListener('transitionend', ()=>{
            if(!prevActive.classList.contains('isActive')){
                prevActive.querySelector('.content').style.display = 'none';
                prevActive.querySelector('.content').setAttribute('aria-hidden', true)
                prevActive.querySelector('.headBtn').setAttribute('aria-expanded', false)
            }
        });
    };
    _this.parentNode.classList.add('isActive');
    _this.closest('li').querySelector('.content').style.display = 'block';
    _this.closest('li').querySelector('.content').style.height = _this.closest('li').querySelector('.content').scrollHeight + 'rem';
    _this.closest('li').querySelector('.content').setAttribute('aria-hidden', false);
    _this.closest('li').querySelector('.headBtn').setAttribute('aria-expanded', true);
}


// 아코디언 메뉴 forEach
// const accordion = document.querySelectorAll('.accordion .headBtn')
// accordion.forEach((currentElement, idx)=>{
//     currentElement.addEventListener('click', function(){
//         const controls = this.getAttribute('aria-controls');
//         accordion.forEach((item, index)=>{
//             const id = document.getElementById(item.getAttribute('aria-controls')).id
//             const content = document.getElementById(id)

//             if(controls === id) {
//                 item.classList.add('isActive')
//                 item.setAttribute('aria-expanded', true)    
//                 content.setAttribute('aria-hidden', false)
//                 content.classList.add('isActive')
//                 content.style.display = 'block';
//                 content.style.height = content.scrollHeight + 'rem'
//             } else {
//                 item.classList.remove('isActive')
//                 content.classList.remove('isActive')
//                 content.style.height = '';
//                 content.addEventListener("transitionend", () => {
//                     if (!content.classList.contains('isActive') && content.style.height == '') {
//                         item.setAttribute('aria-expanded', false)
//                         content.setAttribute('aria-hidden', true)
//                         content.style.display = 'none';
//                     }
//                 });
               
//             }
//         });
        
//     });
// });




// 알럿, 컨펌 창
function openAlert(str, options){
    options = options || {} // option에 값이 들어오면 option 없으면 {} 
    const _this = event.currentTarget;

    const defaults = {
        title : '기본 타이틀 입니다.',
        text : '기본 알럿 텍스트 입니다.',
        confirmFn: null,
    }
    
    for (var key in defaults)  {
        options[key] = typeof options[key] !== 'undefined' ? options[key] : defaults[key];
    }

    _this.setAttribute('id', str); // 클릭한 요소에 str에서 받은 id값 지정 
   
    document.querySelector('body').classList.add('isAlert');

    const alertContent = document.createElement('div');
    alertContent.setAttribute('class', 'ui-alert');
    alertContent.setAttribute('role', 'alert');
    alertContent.setAttribute('data-alert', str);
    alertContent.setAttribute('aria-labelledby', options.title);
    
    // 알럿인지 컨펌인지 확인 클래스에 alert, confirm으로 확인
    if(_this.classList.contains('alert')){
        alertContent.innerHTML = 
        `<div class="pop-header"> 
            <h3>${options.title}</h3> 
            <button class="btn" onclick="closeAlert()">닫기</button> 
        </div> 
        <div class="pop-content">${options.text}</div> 
        <div class="pop-footer"> 
            <button class="btn confirm">확인</button> 
        </div>`
    } else if (_this.classList.contains('confirm')) {
        alertContent.innerHTML = 
        `<div class="pop-header"> 
            <h3>${options.title}</h3> 
            <button class="btn" onclick="closeAlert()">닫기</button> 
        </div> 
        <div class="pop-content">${options.text}</div> 
        <div class="pop-footer"> 
            <button class="btn confirm">확인</button> 
            <button class="btn" onclick="closeAlert()">취소</button> 
        </div>`
    }

    document.body.append(alertContent)

    // 확인 버특을 눌렀을 때 콜백 함수 실행
    document.querySelector(`[data-alert="${str}"] .confirm`).addEventListener('click', function(){
        options.confirmFn();
        closeAlert();
    });

    const focus = document.querySelector('.ui-alert');
    
    // 팝업 내에서 포커스 이벤트 관리를 위한 코드
    // const focusElements = alertContent.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    const focusElements = alertContent.querySelectorAll('a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]');
    const firstFocus = focusElements[0];
    const lastFocus = focusElements[focusElements.length - 1];
    
    firstFocus.focus(); // 알럿 실행 후 포커스 
   
    focus.setAttribute('tabindex', "0");
    // 알럿을 클릭 했을 때 강제로 처음 포커스로 이동 
    focus.addEventListener('click', ()=>{
        if(focus.getAttribute('tabindex') !== null) firstFocus.focus();
    })
    
    
    alertContent.addEventListener('keydown', function (event) {
        // Tab 키를 눌렀을 때 포커스 이동을 위한 이벤트 처리
        if (event.key === 'Tab' ) {
            if (event.shiftKey && event.keyCode === 9) {
                // Shift 키와 함께 Tab 키를 눌렀을 때
                if (document.activeElement === firstFocus) {
                    event.preventDefault();
                    lastFocus.focus();
                }
            } else {
                // Tab 키를 눌렀을 때
                if (document.activeElement === lastFocus) {
                    event.preventDefault();
                    firstFocus.focus();
                }
            }
        }
    });
}
function closeAlert() {
    const _this = event.currentTarget;
    const _body = document.querySelector('body');
    const _id = _this.closest('.ui-alert').getAttribute('data-alert')
    
    _body.classList.remove('isAlert');
    _this.closest('.ui-alert').remove();
    
    // 클릭한 요소의 아이디 값을 
    document.getElementById(_id).focus()
}



// 모달 레이어 팝업
let isOpenPopup = false;
function openPopup(str, options){

    console.log(isOpenPopup);
    if(isOpenPopup === true) {
        return false;
    }

    isOpenPopup = true;

    options = options || {}

    // event.preventDefault()
    const _this = event.currentTarget;
    const _popup = document.getElementById(str); // 팝업 본체
    const _body = document.querySelector('body');

    //console.log(_popup , ":::::::")

    const defaults = {
        position : null,
        confirmFn : null,
    }

    for(var key in defaults) {
        options[key] = typeof options[key] !== 'undefined' ? options[key] : defaults[key];
    }

    // console.log(options.confirmFn , "실행이 되는것이 무엇일까?")
    // 포지션 값이 null이면 기본으로 center로 하고 있으면 옵션의 포지션으로 셋팅
    const position = (options.position == null) ? 'center' : options.position; 

    _popup.classList.add(position);
    _this.setAttribute('data-popup', str)

    _popup.style.display = 'block';


    // 확인 버특을 눌렀을 때 콜백 함수 실행 :: 반복 실행이 되어서 조건을 추가함.
    if(!_popup.querySelector('.confirm').classList.contains('isPopupCheck')){
        _popup.querySelector('.confirm').classList.add('isPopupCheck')
            _popup.querySelector('.confirm').addEventListener('click', function(){
            console.log(111111)
            options.confirmFn();
            closePopup();
        });
    }


    // 팝업이 여러개 일 경우에 루프를 돌려서 실행한다.
    const popupStore = document.querySelectorAll('.pop-layer');
    popupStore.forEach(()=>{
        // el의 높이 값 
        const popupHeight = _popup.scrollHeight;
        
        if(options.position === 'top') {
             // 상단에 대한 노출 값.
            _popup.style.height = popupHeight + 'rem';
            _popup.style.top = - popupHeight + 'rem';

            _popup.addEventListener('transitionend', function(){
                if(_body.classList.contains('isPopup')){
                    _popup.style.top = ''
                }else {
                    _popup.style.top = `- ${popupHeight}` + 'rem'
                    _popup.style.height = ''
                    _popup.style.display = 'none'

                    const targetElement = document.querySelector(`[data-popup="${str}"]`);
                    if (targetElement) {
                        targetElement.focus(); // 이것이 실행이 안됨
                    } 
                
                }
            });

        } else if(options.position === 'center') {
            // 중앙 노출 
            _popup.style.height =  'auto';
            _popup.style.top = 50 + '%';
            _popup.style.left = 50 + '%';
            _popup.style.translate = '-50%, -50%';
            
        } else if (options.position === 'bottom'){
            // 하단 노출 
            _popup.style.height = popupHeight + 'rem';
            _popup.style.bottom = - popupHeight + 'rem';
            _popup.addEventListener('transitionend', function(){
                if(_body.classList.contains('isPopup')){
                    _popup.style.bottom = '';
                }else {
                    _popup.style.bottom = `- ${popupHeight}` + 'rem';
                    _popup.style.height = '';
                    _popup.style.display = 'none';

                    const targetElement = document.querySelector(`[data-popup="${str}"]`);
                    if (targetElement) {
                        targetElement.focus(); // 이것이 실행이 안됨
                    } 
                }
            });
        } else {
            // 중앙 노출 
            _popup.style.height =  'auto';
            _popup.style.top = 50 + '%';
            _popup.style.left = 50 + '%';
            _popup.style.translate = '-50%, -50%';
            _popup.style.display = 'block';
        }
    });

    _body.classList.add('isPopup'); // 팝업을 호출하면 body에 딤 처리 isPopup 클래스를 추가 

    _popup.setAttribute('tabindex' , '0');

    const focusElements = _popup.querySelectorAll('a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]');
    const firstFocus = focusElements[0];
    const lastFocus = focusElements[focusElements.length - 1];
   
    _popup.setAttribute('tabindex', "0");

    // 알럿을 클릭 했을 때 강제로 처음 포커스로 이동 
    _popup.addEventListener('click', ()=>{
        if(_popup.getAttribute('tabindex') !== null) firstFocus.focus();
    });
        
    firstFocus.focus(); // 알럿 실행 후 포커스 
    
    _popup.addEventListener('keydown', function (event) {
        // Tab 키를 눌렀을 때 포커스 이동을 위한 이벤트 처리
        if (event.key === 'Tab' ) {
            if (event.shiftKey && event.keyCode === 9) {
                // Shift 키와 함께 Tab 키를 눌렀을 때
                if (document.activeElement === firstFocus) {
                    event.preventDefault();
                    lastFocus.focus();
                }
            } else {
                // Tab 키를 눌렀을 때
                if (document.activeElement === lastFocus) {
                    event.preventDefault();
                    firstFocus.focus();
                }
            }
        }
    });
    isOpenPopup = false;
}





function closePopup() {
    event.preventDefault()
    const _this = event.currentTarget;
    const _body = document.querySelector('body');

    _body.classList.remove('isPopup');

    const popupHeight = _this.closest('.pop-layer').scrollHeight;
    const _id = _this.closest('.pop-layer').id

    // console.log(_id , "id")

    _this.closest('.pop-layer').setAttribute('tabindex', "-1");

    if(_this.closest('.pop-layer').classList.contains('top')){
        // 상단 종료 
        _this.closest('.pop-layer').classList.remove('top');
        _this.closest('.pop-layer').style.top = `-${popupHeight}` + 'rem'
        _this.closest('.pop-layer').style.height = '';
        
    }else if(_this.closest('.pop-layer').classList.contains('center')) {
        // 중앙 종료 
        _this.closest('.pop-layer').style.display = 'none';
    }else {
        // 하단 종료 
        _this.closest('.pop-layer').classList.remove('top');
        _this.closest('.pop-layer').style.bottom = `-${popupHeight}` + 'rem'
        _this.closest('.pop-layer').style.height = '';
    }

    const focusElement = document.querySelector(`[data-popup="${_id}"]`);
    if (focusElement) {
        focusElement.focus(); 
    } 
    // focusElement.removeAttribute('data-popup')
    // document.querySelector(`[data-alert="${str}"] .confirm`)
}