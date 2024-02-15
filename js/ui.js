// Written by: sub's
// Date: 30.11.2023
// last-update: 22.12.2023
//
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



var ui = { 
    // 초기구동
	init:function(){ 
		this.ex.init();
	},
    
	ex:{ 
		init: function() {
            this.evt()
		},
        evt:function(){
            
		},
		set:function(){
		}
	},
};





document.addEventListener('DOMContentLoaded', function () {
    ui.init();
    // ui.update();

    // tabMenu 함수 호출
    // tabMenu(2);
    tabString('tab-content01');
});


// 상단 검색창 텍스트 클리어 
function searchText(){
    // const value = str;
    const clearBtn = document.querySelector('.search')
    const ex = document.querySelector('.search input').value;
    if(ex === '') {
        clearBtn.querySelector('.clear-btn').style.display = 'none';
    } else {
        clearBtn.querySelector('.clear-btn').style.display = 'block';
    }
}
function searchClearBtn(){
    const clearInput = document.querySelector('.search')
    clearInput.querySelector('input').value = '';
    clearInput.querySelector('.clear-btn').style.display = 'none';
}





// 탭에 대한 함수를 정의 하고 그 조건에 맞게 호출한다.
function tabEvent(value){
    if(typeof value === 'string' || typeof value === 'object'){
        tabString(value)
    } else { 
        tabNumber(value)
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
    const _this = (typeof str === 'object') ? str : event.currentTarget; 
    const tabButtons = document.querySelectorAll('.tab-menu > button');
    const _getStr = (typeof str === 'object') ? str.getAttribute('aria-controls') : str
    const _id = (str !== undefined && typeof str === 'string') ? str : _this.getAttribute('aria-controls')
    
    tabButtons.forEach((item, index)=>{
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





// 라디오 버튼 텝 메뉴 
function radioTabMenu(str){
    const _this = (typeof str === 'object') ? str : event.currentTarget;
    const _id = _this.parentNode.getAttribute('aria-controls');

    console.log(_id, "_아이디")
    const radioButton = _this.closest('.radio-tabmenu').querySelectorAll('.radio-menu > label')

    radioButton.forEach((item)=>{
        const controls = document.getElementById(item.getAttribute('aria-controls'));
        console.log(controls)
        if(item.getAttribute('aria-controls') === _id){
            item.classList.add('isActive');
            controls.classList.add('isActive')
        } else {
            item.classList.remove('isActive');
            controls.classList.remove('isActive')
        }
    });
}









// 아코디언 이벤트 위임 메뉴
const accordion = document.querySelector('.accordion')
if(accordion){
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
}


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









if(document.querySelector('.styled-combo')) {
    // select
    function selectClicked(str){
        const _this = str;
    
        if(_this.closest('.styled-combo').classList.contains('isActive')) {
            _this.closest('.styled-combo').classList.remove('isActive');
        } else {
            _this.closest('.styled-combo').classList.add('isActive');
        }

        const selectOption = document.querySelectorAll('.custom-select-box li');
        selectOption.forEach((item, index)=>{
            const _index =  Array.from(selectOption).indexOf(item);

            item.addEventListener('click', (e)=>{
                console.log(item.getAttribute('data-value') , ":::::::::::")
                if(index === _index) {
                    item.closest('.styled-combo').querySelector('.combo-title').innerText = item.innerText
                    item.closest('.styled-combo').classList.remove('isActive');
                }
            })
        })
    }

    
    // select closed
    document.addEventListener('click', function(e){
        if(document.querySelector('.styled-combo').classList.contains('isActive')){
            console.log('ddddddddd');
            const _this = e.target;
            const combo = document.querySelector('body').querySelectorAll('.styled-combo');
        
            combo.forEach((item)=>{
                if(item !== _this.closest('.styled-combo')) {
                    item.classList.remove('isActive');
                }
            });
        }
    });    
}
    




// 모달 레이어 팝업
function openPopup(str, options){
    const _this = event.currentTarget;
    const _popup = document.getElementById(str); // 팝업 본체
    const _body = document.querySelector('body');

    // 옵션값 셋팅 
    options = options || {}
    const defaults = {
        position : null, // 포지션 값
        confirmFn : null, // 콜백 함수 실행
    }
    for(var key in defaults) {
        options[key] = typeof options[key] !== 'undefined' ? options[key] : defaults[key];
        // 기본 포지션 값에 대한 조건문.. [포지션 값이 null이면 기본으로 center로 하고 있으면 옵션의 포지션으로 셋팅]
        if (key === 'position' && (options[key] === '' || options[key] === null)) {
            options[key] = 'center';
        }
    }
    // 포지션 값이 null이면 기본으로 center로 하고 있으면 옵션의 포지션으로 셋팅
    // const position = (options.position == null || options.position == '')  ? 'center' : options.position; 
    _popup.classList.add(options.position); // 팝업 위치

    // 클릭한 요소가 버튼인지 아닌지여부 체크 : 필요 태그 추가 
    const isChecked = (
        _this.tagName === 'A' || 
        _this.tagName === 'BUTTON'
    )

    if(isChecked) {
        _this.setAttribute('data-popup', str) 
    }

    _body.classList.add('isPopup'); // 팝업을 호출하면 body에 딤 처리 isPopup 클래스를 추가
    _popup.style.display = 'block'; // 팝업을 보이게 
    _popup.classList.add('isActive'); // 팝업이 오픈 되었는지 체크하는 클래스

    const popupHeight = _popup.scrollHeight; // 팝업의 높이 값 찾아오기 

    // 확인 버특을 눌렀을 때 콜백 함수 실행 :: 반복 실행이 되어서 조건을 추가함.
    _popup.querySelector('.confirm').addEventListener('click', function(){
        if (_popup.classList.contains('isActive')) {
            if (typeof options.confirmFn === 'function') {
                options.confirmFn();
            }
            closePopup()
        }
    }, {once: true});


    // 헤더와 푸터 높이값 빼주고 맥스 높이값 세팅
    const headHeight = _popup.querySelector('.pop-header').scrollHeight;
    const footHeight = _popup.querySelector('.pop-footer').scrollHeight;
    const max = headHeight + footHeight;
    _popup.querySelector('.pop-content').style.height = `calc(100% - ${max}rem)`;


    if(_popup.classList.contains('top')) { 
        // 상단에 대한 노출 값.
        _popup.style.height = popupHeight + 'rem';
        _popup.style.top = - popupHeight + 'rem';
        setTimeout(() => {
            _popup.classList.add('isAnimated');
            _popup.style.top = 0 + 'rem';
        }, 1);
        
    } else if(_popup.classList.contains('center') ) {
        // 상단에 대한 노출 값.
        if(window.innerHeight <= _popup.clientHeight){
            _popup.style.height = popupHeight - 40 + 'rem';
        }else {
            _popup.style.height = popupHeight + 'rem';
        }
        // 중앙 노출 
        setTimeout(() => {
            _popup.classList.add('isAnimated');
            _popup.style.transform = 'translate(-50%, -50%)';
        }, 1);
    } else if (_popup.classList.contains('bottom') ){
        // 하단 노출 
        _popup.style.height = popupHeight + 'rem';
        _popup.style.bottom = - popupHeight + 'rem';
        setTimeout(() => {
            _popup.classList.add('isAnimated');
            _popup.style.bottom = 0 + 'rem';
        }, 1);
    } else {
        // 중앙 노출 
        setTimeout(() => {
            _popup.classList.add('isAnimated');
        }, 1);
    }


    // 팝업 텝키 이벤트 
    const focusElements = _popup.querySelectorAll('a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]');
    const firstFocus = focusElements[0];
    const lastFocus = focusElements[focusElements.length - 1];
        
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
}


// 모달 레이어 팝업 닫기
function closePopup() { 
    event.preventDefault();
    const _this = event.currentTarget;
    const _body = document.querySelector('body');

    _this.closest('.ui-popup').classList.remove('isActive');

    const popupHeight = _this.closest('.ui-popup').scrollHeight;
    const _id = _this.closest('.ui-popup').id

    if(_this.closest('.ui-popup').classList.contains('top')){
        // 상단 종료 
        _this.closest('.ui-popup').style.top = `-${popupHeight}` + 'rem'
    }else if(_this.closest('.ui-popup').classList.contains('center')) {
        // 중앙 종료 
        _this.closest('.ui-popup').style.transform = 'translate(-50%, -55%)';
    }else {
        // 하단 종료 
        _this.closest('.ui-popup').style.bottom = `-${popupHeight}` + 'rem'
    }

    // 팝업 종료 될 때 transition이 끝난 후에 실행 되는 이벤트
    _this.closest('.ui-popup').addEventListener('transitionend', function(){
        if(!_this.closest('.ui-popup').classList.contains('isActive') && _this.closest('.ui-popup').style.display === 'block') {
            _this.closest('.ui-popup').classList.remove('isAnimated');
            _this.closest('.ui-popup').style.display = 'none';
            _body.classList.remove('isPopup');

            // 스와이퍼 닫을 때 초기화 
            if(_this.closest('.swiper-pop')){
                
                setTimeout(()=>{
                    _this.closest('.swiper-pop').querySelector('.container-swiper').remove();
                }, 50)
            }
        }
    })

    // 팝업 종료 했을 때 포커스 이동
    const focusElement = document.querySelector(`[data-popup="${_id}"]`);
    if (focusElement) {
        focusElement.focus(); 
    }
}





// 체크 박스 전체 체크 
function check(str){
    const checkbox = str.closest('.check-list').querySelectorAll('input[type="checkbox"]');
    const allCheckbox = str.closest('.check-list').querySelectorAll('input[type="checkbox"]:checked');
    if(str.checked == true) {
        str.setAttribute('aria-checked', true);
    } else {
        str.setAttribute('aria-checked', false);
    }
    for(let i = 0; i < checkbox.length; i++) {
        if(allCheckbox.length == checkbox.length) {
            str.closest('.all-checkbox').querySelector('.all input[type="checkbox"]').checked = true;
        } else {
            str.closest('.all-checkbox').querySelector('.all input[type="checkbox"]').checked = false;
        }
    }
}

function allCheck(str) {
    // 체크가 되어있으면 true 아니면 false 로 세팅 하고 
    console.log(str.checked)
    if(str.checked == true) {
        str.setAttribute('aria-checked', true) 
        str.closest('.all-checkbox').querySelectorAll('.check-list label').forEach((item)=>{
            item.querySelector('input[type="checkbox"]').checked = true;
            item.querySelector('input[type="checkbox"]').setAttribute('aria-checked', true)
        });
    }else {
        str.setAttribute('aria-checked', false)
        str.closest('.all-checkbox').querySelectorAll('.check-list label').forEach((item)=>{
            item.querySelector('input[type="checkbox"]').checked = false;
            item.querySelector('input[type="checkbox"]').setAttribute('aria-checked', false)
        });
    }
}




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

// 알럿, 컨펌 닫기 함수
function closeAlert() {
    const _this = event.currentTarget;
    const _body = document.querySelector('body');
    const _id = _this.closest('.ui-alert').getAttribute('data-alert')
    
    _body.classList.remove('isAlert');
    _this.closest('.ui-alert').remove();
    
    // 클릭한 요소의 아이디 값을 
    document.getElementById(_id).focus()
    document.getElementById(_id).removeAttribute('id');
    
}




// 인풋 레인지 입력
function updateSlider(_this, inputType) {
    const wrap = _this.closest('.range-box');
    const minInput = wrap.querySelector('.min');
    const maxInput = wrap.querySelector('.max');
    const minSlider = wrap.querySelector('.range-min');
    const maxSlider = wrap.querySelector('.range-max');
    const progress = wrap.querySelector('.progress');

    const maxNum = parseInt(maxSlider.max);
    const gap = 100;

    let minValue = parseInt(minInput.value);
    let maxValue = parseInt(maxInput.value);
    
    const progressLeft = (minValue / maxNum) * 100;
    const progressRight = 100 - (maxValue / maxNum) * 100;
    
    // 맥스값을 넘어가지 못하게 
    maxNum <= Number(_this.value) ? _this.value = maxNum : '';

    if (inputType === 'min') {
        minSlider.value = _this.value;

        console.log( minSlider.value)

        progress.style.left = (maxValue - gap) / maxNum * 100 + '%';

        if (maxValue - minValue <= gap) {
            _this.value = maxValue;
            minSlider.value = maxValue;
        }

        // 인풋에 값이 있는지 없는지 체크
        if (_this.value.trim() === '') {
            // 인풋에 값이 없음
            console.log('입력값이 없습니다.', );
            minSlider.value = 0;
            progress.style.left = 0;
        }
        
    } else { 
        maxSlider.value = _this.value;
        console.log( maxSlider.value)
        progress.style.right = (100 - (minValue + gap) / maxNum * 100) + '%';

        if (maxValue - minValue <= gap) {
            _this.value = minValue;
            maxSlider.value = minValue;
        }

        // 인풋에 값이 있는지 없는지 체크
        if (_this.value.trim() === '') {
            // 인풋에 값이 없음
            console.log('입력값이 없습니다.', );
            maxSlider.value = maxNum;
            progress.style.right = 0;
        }
    }
    // 진행 바 위치 업데이트
    progress.style.left = progressLeft + '%';
    progress.style.right = progressRight + '%';


    // 레인지 텍스트 박스 초기 위치 
    const leftText = document.querySelector('.range-box .left-txt');
    const rightText = document.querySelector('.range-box .right-txt'); 


    leftText.style.transform = 'translate(-50%, 0)';
    leftText.style.left = progressLeft  + '%';
    rightText.style.right = progressRight + '%';
    rightText.style.transform = 'translate(50%, 0)';
}

if(document.querySelector('.range-box .left-txt')){

    // 레인지 텍스트 박스 초기 위치 
    const leftText = document.querySelector('.range-box .left-txt');
    const rightText = document.querySelector('.range-box .right-txt'); 
    
    // 너비 값.
    const leftWidth = leftText.clientWidth;
    const rightWidth = rightText.clientWidth;
    
    leftText.style.transform = 'translate(-50%, 0)';
    rightText.style.transform = 'translate(50%, 0)';
}




// 인풋 레인지 
function handleRange(_this, rangeType) {
    const wrap = _this.closest('.range-box');
    const progress = wrap.querySelector('.progress');

    const minValue = parseInt(wrap.querySelector('.range-min').value); // 이동하는 가변에 따라서 value값이 가변적으로 변동됨
    const maxValue = parseInt(wrap.querySelector('.range-max').value); // 이동하는 가변에 따라서 value값이 가변적으로 변동됨

    const maxNum = parseInt(wrap.querySelector('.range-max').max); // 값은 변동 하지 않음.

    const gap = 0; // 갭 변수가 어디서 온 것인지 명시되어 있지 않아 임의로 설정

    let progressLeft = (minValue / maxNum) * 100;
    let progressRight = 100 - (maxValue / maxNum) * 100;

    // 움직일때 값이 변경되면서 max와 min값을 빼준다. 그리고 gap이 크거나 작으면 실행
    const leftText = wrap.querySelector('.left-txt');
    const rightText = wrap.querySelector('.right-txt'); 

    // z-index setting
    if(rangeType === 'minRange' ) {
        _this.closest('.range-wrap').querySelector('.range-min').style.zIndex = 1;
        _this.closest('.range-wrap').querySelector('.left-txt').style.zIndex = 1;
    }else {
        _this.closest('.range-wrap').querySelector('.range-min').style.zIndex = 0;
        _this.closest('.range-wrap').querySelector('.left-txt').style.zIndex = 0;
    }


    if (maxValue - minValue <= gap) { // 충돌 지점
        // rangeType , "타입 : min 인지 max인지 체크 "
        if (rangeType === 'minRange') {
            _this.value = Math.min(maxValue - gap);
            wrap.querySelector('.min').value = Math.min(maxValue - gap);
            document.querySelector('.range-box .left-txt').innerText = Math.min(maxValue - gap) + ' km';

            progress.style.left = (maxValue - gap) / maxNum * 100 + '%';

        } else {
            _this.value = Math.min(minValue + gap)
            wrap.querySelector('.max').value = Math.min(minValue + gap);
            document.querySelector('.range-box .right-txt').innerText  = Math.min(minValue + gap) + ' km';
            progress.style.right = (100 - (minValue + gap) / maxNum * 100)  + '%';
        }
    } else {
        wrap.querySelector('.min').value = minValue;
        wrap.querySelector('.max').value = maxValue;

        document.querySelector('.range-box .left-txt').innerText = minValue + ' km';
        document.querySelector('.range-box .right-txt').innerText = maxValue + ' km';

        progress.style.left = progressLeft + '%';
        progress.style.right = progressRight + '%';

        leftText.style.transform = 'translate(-50%, 0)';
        leftText.style.left = progressLeft  + '%';
        rightText.style.right = progressRight + '%';
        rightText.style.transform = 'translate(50%, 0)';
        
    }

}



// 최소 값 
function rangeMin(){
    const _this = event.currentTarget;
    _this.closest('.range-box').querySelector('.input-km .min').value = 0;
    _this.closest('.range-box').querySelector('.item-box .left-txt').innerText = 0 + ' km'
    _this.closest('.range-box').querySelector('.item-box .left-txt').style.left = 0;
    _this.closest('.range-box').querySelector('.range-min').value = 0;
    _this.closest('.range-box').querySelector('.range-wrap .progress').style.left = 0;
}
// 최대 값 
function rangeMax(){
    const _this = event.currentTarget;
    const maxNum = Number(_this.closest('.range-box').querySelector('.range-max').max)
    _this.closest('.range-box').querySelector('.input-km .max').value = maxNum;
    _this.closest('.range-box').querySelector('.item-box .right-txt').innerText = maxNum + ' km'
    _this.closest('.range-box').querySelector('.item-box .right-txt').style.right = 0;
    _this.closest('.range-box').querySelector('.range-max').value = maxNum;
    _this.closest('.range-box').querySelector('.range-wrap .progress').style.right = 0 + '%';
    
}






// 헤더 인쿨르드 
// document.addEventListener("DOMContentLoaded", function() {

    const parentDiv = document.querySelector('.wrap');
    const header = document.createElement('header');
    header.classList.add('header')
    header.innerHTML = 
    `<div class="inner">
        <div class="item">
            <h1>
                <a href="ui.html">
                    <img src="../img/common/constant_logo.svg" alt="컨스턴트 로고" />
                </a>
            </h1>
        </div>
        <div class="item">
            <div class="gnb">
                <a href="profile.html">sub's Profile</a>
                <a href="javascript: void(0);">메뉴 2</a>
                <a href="javascript: void(0);">메뉴 3</a>
            </div>
            <div class="search">
                <input type="text" oninput="searchText(this.value)" />
                <button class="search-btn" type="button">
                    <span class="blind">검색버튼</span>
                </button>
                <button class="clear-btn" onclick="searchClearBtn()" type="button">
                    <span class="blind">검색삭제</span>
                </button>
            </div>
            <div class="util">
                <a href="https://github.com/sub-s" target="_blank" class="git" title="sub's git page">
                    <span class="blind">sub's git page</span>
                </a>
            </div>
        </div>
    </div>`

    const parentNode = parentDiv.firstChild;
    parentDiv.insertBefore(header, parentNode);

    const footer = document.createElement('footer');
    footer.classList.add('footer')
    footer.innerHTML = 
    `<footer class="footer">
        <div class="inner">
            Copyright © 2023 - <span class="year"></span> Constant Company All rights reserved.
        </div>
    </footer>`
    parentDiv.appendChild(footer)
    
    // footer copyright 년도 
    const year = document.querySelector('footer.footer')
    year.querySelector('.year').innerHTML = new Date().getFullYear();



   
// });




// // 페이지에 있는 모든 테그네임을 가져와서 배열로 변환
// var allElements = document.getElementsByTagName('*');
// // console.log(allElements , "allElements")
// // 배열의 각 요소에 대해 반복문 실행
// Array.prototype.forEach.call(allElements, function (el) {
//     // 현재 요소의 data-include-path 속성 값을 가져옴
//     var includePath = el.dataset.includePath;

//     // data-include-path 속성이 존재하는 경우
//     if (includePath) {
//         // XMLHttpRequest를 사용하여 외부 HTML 파일을 가져옴
//         var xhttp = new XMLHttpRequest();
//         xhttp.onreadystatechange = function () {
//             // 요청이 완료되고 성공한 경우
//             if (this.readyState == 4 && this.status == 200) {
//                 // 현재 요소의 outerHTML을 가져온 파일의 내용으로 대체
//                 el.outerHTML = this.responseText;
//             }
//         };
//         xhttp.open('GET', includePath, true);
//         xhttp.send(); // 서버에 요청을 보냄
//     }
// });




