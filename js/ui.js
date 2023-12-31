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


function settingRangeBox(){
    const _rangeBox = document.querySelectorAll(".range-box2");
    console.log("_rangeBox : ",_rangeBox);
        _rangeBox.forEach((range,index)=>{

						// <button type="button" class="btn sm a">최소</button>
						// <div class="range-input">
						// 	<div class="input-km">
						// 		<input type="text" class="min" value="0"  oninput="updateSlider(this, 'min')"/>
						// 		<span>km</span>
						// 	</div>
						// 	<span class="space">~</span>
						// 	<div class="input-km">
						// 		<input type="text" class="max" value="75000" oninput="updateSlider(this, 'max')" />
						// 		<span>km</span>
						// 	</div>
						// </div>
						// <button type="button" class="btn sm a">최대</button>
						// <div class="range-wrap">
						// 	<div class="hidden">
						// 		<div class="progress"></div>
						// 	</div>
						// 	<!-- range option : step 는 기본 이동단위 -->
						// 	<input type="range" class="range-min" min="0" max="75000" value="0" step="100"  oninput="handleRange(this,'minRange')">
						// 	<input type="range" class="range-max" min="0" max="75000" value="75000" step="100"  oninput="handleRange(this,'maxRange')">
						// 	<p class="left-txt">1 <span>km</span></p>
						// 	<p class="right-txt">75000 <span>km</span></p>
						// </div>
        const _cancleBt = document.createElement("button");
        _cancleBt.type = "button";
        _cancleBt.setAttribute("class","btn sm a");
        _cancleBt.innerText = "최소";
        range.appendChild(_cancleBt);
        _cancleBt.addEventListener("click",()=>{alert("dkdkdk")})

        const _rangeInput = document.createElement("div");
        _rangeInput.classList.add("range-input");

        const _inputKmR = document.createElement("div");
        _inputKmR.classList.add("input-km")

        const _inputKmL = document.createElement("div");
        _inputKmL.classList.add("input-km")

        const _inputKmLInput = document.createElement("input");
        _inputKmLInput.classList.add("min");
        _inputKmLInput.type = "text";
        

        const _inputKmRInput = document.createElement("input");
        _inputKmRInput.classList.add("max");
        _inputKmRInput.type = "text";

        const _inputKmLSpan = document.createElement("span");
        const _inputKmRSpan = document.createElement("span");
        _inputKmLSpan.innerText = "km";
        _inputKmRSpan.innerText = "km";

        const _space = document.createElement("span");
        _space.classList.add("space");
        _space.innerText = "~";


        _rangeInput.appendChild(_inputKmL);
        _rangeInput.appendChild(_space);
        _rangeInput.appendChild(_inputKmR);

        _inputKmL.appendChild(_inputKmLInput);
        _inputKmL.appendChild(_inputKmLSpan);


        _inputKmR.appendChild(_inputKmRInput);
        _inputKmR.appendChild(_inputKmRSpan);

        range.appendChild(_rangeInput);
        range.classList.add('range-box')

    })
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
    const gap = 0;
    let minValue = parseInt(minInput.value);
    let maxValue = parseInt(maxInput.value);
    const progressLeft = (minValue / maxNum) * 100;
    const progressRight = 100 - (maxValue / maxNum) * 100;
    
    // 맥스값을 넘어가지 못하게 
    maxNum <= Number(_this.value) ? _this.value = maxNum : '';

    if (inputType === 'min') {
        minSlider.value = _this.value;
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
}

// 인풋 레인지 
function handleRange(_this, rangeType) {
    
    const wrap = _this.closest('.range-box');
    const progress = wrap.querySelector('.progress');
    const minValue = parseInt(wrap.querySelector('.range-min').value);
    const maxValue = parseInt(wrap.querySelector('.range-max').value);
    const maxNum = parseInt(wrap.querySelector('.range-max').max);
    const gap = 0; // 갭 변수가 어디서 온 것인지 명시되어 있지 않아 임의로 설정

    let progressLeft = (minValue / maxNum) * 100;
    let progressRight = 100 - (maxValue / maxNum) * 100;

    // 움직일때 값이 변경되면서 max와 min값을 빼준다. 그리고 gap이 크거나 작으면 실행

    if (maxValue - minValue <= gap) {
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
    }

}
