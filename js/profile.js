

(function(){
    document.addEventListener("DOMContentLoaded", function() {
        // 프로필 
        const profileData = '../js/data/profile.json'
        // const profileData = '../js/data/profile.json'

        fetch(profileData)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); // 이 부분에서 fetch의 결과를 다음 then 블록으로 전달합니다.
        })
        .then(data => {
            // console.log('JSON 데이터:', data);
            
            // 추가적인 작업 수행
            // const profile = document.querySelector('.profile tbody')
            const school = document.querySelector('.school tbody')
            const projectList = document.querySelector('.project tbody')


            // 학교 
            for(let i = 0; i < data[0].schoolProfile.length; i++){
                const tr = document.createElement('tr');

                const schoolTd = document.createElement('td')
                const dateTd = document.createElement('td')
                const graduationTd = document.createElement('td')
                const majorTd = document.createElement('td')

                schoolTd.textContent = data[0].schoolProfile[i].school
                dateTd.textContent = data[0].schoolProfile[i].date
                graduationTd.textContent = data[0].schoolProfile[i].graduation
                majorTd.textContent = data[0].schoolProfile[i].major

                school.appendChild(tr)

                tr.appendChild(schoolTd)
                tr.appendChild(dateTd)
                tr.appendChild(graduationTd)
                tr.appendChild(majorTd)
                
            }


            
            // 포트폴리오 
            for(let i = 0; i < data[0].careerProfile.length; i++){
                const tr = document.createElement('tr');

                const nameTd = document.createElement('td');
                const dateTd = document.createElement('td');
                const clientTd = document.createElement('td');
                const skillTd = document.createElement('td');
                
                nameTd.textContent = data[0].careerProfile[i].name; // 데이터의 구조에 맞게 수정하세요.
                dateTd.textContent = data[0].careerProfile[i].date; // 데이터의 구조에 맞게 수정하세요.
                clientTd.textContent = data[0].careerProfile[i].client; // 데이터의 구조에 맞게 수정하세요.
                //skillTd.textContent = "<img src='"+data[0].careerProfile[i].skill+"'>"; // 데이터의 구조에 맞게 수정하세요.
                
                let imgstr = data[0].careerProfile[i].skill;
                if(imgstr.length > 0){
                    for (let index = 0; index < imgstr.length; index++) {
                        // let img[index] = document.createElement('img');
                        // let img = document.createElement('img');
                        // img.src=imgstr[index];
                        // console.log(img);
                        // skillTd.append(img);
                    }
                }
            
                
                // projectList에 tr을 추가
                projectList.appendChild(tr);

                tr.appendChild(nameTd);
                tr.appendChild(dateTd);
                tr.appendChild(clientTd);
                tr.appendChild(skillTd);

                

            }
        })
        .catch(error => {
            console.error('Fetch 오류:', error);
        });
    });



   
})()