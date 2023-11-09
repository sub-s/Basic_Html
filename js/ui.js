
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





// 탭 메뉴


function test() {
    console.log(this)
}
test(this);

const myObject = {
    myMethod : function()  {
        console.log(this); // 자기 자신을 가킨다. 
    },
    myMethod2 : () => {
        console.log(this); // 전역 자신을 가킨다. 
    }
};

myObject.myMethod();
myObject.myMethod2();

function regularFunction() {
    console.log(this); // 호출된 컨텍스트에 따라 결정됨
}
const arrowFunction = () => {
    console.log(this); // arrowFunction이 정의된 컨텍스트를 유지
};
regularFunction(); // 호출된 컨텍스트에 따라 달라짐
arrowFunction(); // arrowFunction이 정의된 컨텍스트를 유지




function tabMenu(num) {
    // console.log(this , "1");
    const _this = event.currentTarget;
    const tabButtons = document.querySelectorAll('.tab-menu button')
    //const _index = (num ? num : Array.from(tabButtons).indexOf(_this));
    const _index = (num !== undefined) ? num : Array.from(tabButtons).indexOf(_this); // 클릭한 요소에 index 구하기

    tabButtons.forEach((item, index) => {
        //console.log(this, "2");
        const controls = document.getElementById(item.getAttribute('aria-controls'))
        if(index === _index) { 
            item.classList.add('isActive')
            // tabContents[index].classList.add('on');
            controls.classList.add('isActive');
        } else {
            item.classList.remove('isActive');
            controls.classList.remove('isActive');
        }
    });


    //const tabContent = document.getElementById(id) // 클릭 했을 때 컨텐츠 아이디 값을 가져온다.
    //const tabContents = document.querySelectorAll('.tab-content div');

    // console.log(_index, "몇번째 요소")
    // console.log(id, "id") // 컨텐츠 아이디 값 
    // console.log(tabContent, "tabContent") // 컨텐츠 아이디 값 

    // 메뉴 활성화 
    // tabButtons.forEach((item, index) => {
    //     if(index === _index) { 
    //         item.classList.add('isActive')
    //     } else {
    //         item.classList.remove('isActive')
    //     }
    // });

    // // 컨텐츠를 초기화 한다.
    // tabContents.forEach((content) => {
    //     content.classList.remove('on');
    // });
    // tabContent.classList.add('on');
    // 컨텐츠를 초기화 한다.
    // tabContents.forEach((content) => {
    //     content.classList.remove('on');
    // });
    // tabContent.classList.add('on');
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


