
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
    // 페이지 동적으로 뿌린 후 업데이트 ui.update();
	update:function(){ 
		this.ex.set();
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
// ui.init();




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

// 클릭한 문자열이 있으면.. 문자열을 받아오고..
// 아니면 

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





// 모달 레이어 팝업
function openPopup(id){
    const _this = event.currentTarget;
    const _popup = document.getElementById(id)
    const _body = document.querySelector('body')

    _body.classList.add('isPopup')
    _popup.style.display = 'block'
}
function closePopup() {
    const _this = event.currentTarget;
    const _body = document.querySelector('body')

    _body.classList.remove('isPopup')
    _this.closest('.pop-layer').style.display = 'none'
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
            }
        });
    };

    _this.parentNode.classList.add('isActive');
    _this.closest('li').querySelector('.content').style.display = 'block';
    _this.closest('li').querySelector('.content').style.height = _this.closest('li').querySelector('.content').scrollHeight + 'rem';
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