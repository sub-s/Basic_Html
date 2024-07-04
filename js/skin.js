// Written by: sub's
// Date: 30.11.2023
// last-update: 20.02.2024
//
// Description: This code deals with HTML, CSS, and vanilla JavaScript.
// Please specify any particular points or features you want to emphasize.
// Feel free to reach out if you have any questions or need additional explanations!


// 쿠키 설정 함수
// 주어진 이름(name), 값(value), 유효기간(days)을 가진 쿠키를 설정합니다.
// days는 쿠키가 유지될 일 수를 의미합니다. 7일 동안 유지되도록 설정되어 있습니다.
function setCookie(name, value, days) {
    var expires = ""; // 쿠키의 만료일을 저장할 변수입니다.
    if (days) {
        // days가 설정된 경우, 현재 시간에서 days일을 더하여 만료일을 계산합니다.
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000)); // days를 밀리초로 변환하여 더합니다.
        expires = "; expires=" + date.toUTCString(); // UTC 형식으로 만료일을 설정합니다.
    }
    // 쿠키를 설정합니다. 쿠키 이름, 값, 만료일, 경로(path)를 설정합니다.
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

// 쿠키 읽기 함수
// 주어진 이름(name)의 쿠키 값을 읽어 반환합니다.
function getCookie(name) {
    var nameEQ = name + "="; // 찾으려는 쿠키 이름을 "name=" 형식으로 저장합니다.
    var ca = document.cookie.split(';'); // 쿠키 문자열을 세미콜론으로 분리하여 배열로 만듭니다.
    for(var i=0; i < ca.length; i++) {
        var c = ca[i];
        // 쿠키 문자열의 앞부분 공백을 제거합니다.
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        // 쿠키 이름이 일치하면 해당 쿠키 값을 반환합니다.
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null; // 쿠키가 존재하지 않으면 null을 반환합니다.
}

// 쿠키 삭제 함수
// 주어진 이름(name)의 쿠키를 삭제합니다.
function eraseCookie(name) {   
    // 쿠키의 만료일을 과거로 설정하여 쿠키를 삭제합니다.
    document.cookie = name + '=; Max-Age=-99999999;';  
}

// 스킨 적용 함수
// 주어진 스킨 이름(skin)에 따라 스킨을 적용합니다.
function applySkin(skin) {
    if (skin === 'dark') {
        // 'dark' 스킨인 경우, 'dark-skin' 클래스를 body 요소에 추가합니다.
        document.body.classList.add('dark-skin');
    } else {
        // 'default' 스킨인 경우, 'dark-skin' 클래스를 body 요소에서 제거합니다.
        document.body.classList.remove('dark-skin');
    }
}

// DOMContentLoaded 이벤트 리스너
// 문서가 완전히 로드되었을 때 실행됩니다.
document.addEventListener("DOMContentLoaded", function() {
    // 저장된 스킨을 쿠키에서 읽어옵니다.
    var savedSkin = getCookie('skin');
    if (savedSkin) {
        // 저장된 스킨이 있는 경우, 해당 스킨을 적용합니다.
        applySkin(savedSkin);
    }
});

// 기본 스킨 버튼 클릭 이벤트 리스너
document.getElementById('default-skin').addEventListener('click', function() {
    // 쿠키에 'default' 스킨을 7일 동안 저장합니다.
    setCookie('skin', 'default', 7);
    // 'default' 스킨을 적용합니다.
    applySkin('default');
});

// 다크 스킨 버튼 클릭 이벤트 리스너
document.getElementById('dark-skin').addEventListener('click', function() {
    // 쿠키에 'dark' 스킨을 7일 동안 저장합니다.
    setCookie('skin', 'dark', 7);
    // 'dark' 스킨을 적용합니다.
    applySkin('dark');
});
