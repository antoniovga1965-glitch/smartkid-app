const sidebar =document.getElementById('sidebar');
const hamburgermenu = document.getElementById('hamburgermenu');
const loginform = document.getElementById('loginform');
const registrationform = document.getElementById('registrationform');
const dashboard = document.getElementById('dashboard');
const spinner = document.getElementById('spinner');
const spinners = document.getElementById('spinners');
loginform.addEventListener('submit',(e)=>{
    e.preventDefault();
})
  hamburgermenu.style.display ='none';

registrationform.addEventListener('submit',(e)=>{
    e.preventDefault();
})



hamburgermenu.addEventListener('click',()=>{
   sidebar.classList.toggle('active')
  
})




const reglink = document.getElementById('reglink');

reglink.addEventListener('click',()=>{
    registrationform.classList.remove('hidden');
    loginform.classList.add('hidden');
})


const usernameinput = document.getElementById('usernameinput');
const passwordinput = document.getElementById('passwordinput');
const loginbtn = document.getElementById('loginbtn');
const loginresults = document.getElementById('loginresults');
const usernameerror  =document.getElementById('usernameerror');
const passworderror = document.getElementById('passworderror');

loginbtn.addEventListener('click',()=>{
const username = usernameinput.value.trim();
const password = passwordinput.value.trim();

if(username==="" || password===""){
    usernameerror.classList.remove('hidden');
    passworderror.classList.remove('hidden');
    setTimeout(() => {
         usernameerror.classList.add('hidden');
    passworderror.classList.add('hidden');
    }, 4000);
    return;
}
fetch('/login/login',{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    credentials:'include',
    body:JSON.stringify({username,password}),
})
.then(res=>res.json())
.then(data=>{
    if(data.message.includes('welcome honourable')){
        loginform.classList.add('hidden');
        dashboard.classList.remove('hidden');
        hamburgermenu.style.display = 'flex'
        
    }
    loginresults.textContent = data.message;
    loginresults.classList.remove('hidden');
    setTimeout(() => {
       loginresults.classList.remove('hidden'); 
       loginresults.innerHTML="";
    }, 5000);

    

})
.catch(err=>{
    loginresults.textContent = err.message;
    loginresults.classList.remove('hidden');
    setTimeout(() => {
        loginresults.classList.add('hidden');
    }, 3000);
})
usernameinput.value="";
passwordinput.value="";
})


const Rusernameinput = document.getElementById('Rusernameinput');
const Rageinput = document.getElementById('Rageinput');
const Rpasswordinput = document.getElementById('Rpasswordinput');
const submitbtn = document.getElementById('submitbtn');
const registrationresults = document.getElementById('registrationresults');


submitbtn.addEventListener('click',()=>{
    const regusername = Rusernameinput.value.trim();
    const  regage = Rageinput.value.trim();
    const regpassword = Rpasswordinput.value.trim();

    fetch('/register/registration',{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    credentials:'include',
    body:JSON.stringify({regusername,regage,regpassword}),
    })
    .then(res=>res.json())
.then(data=>{
    registrationresults.textContent = data.message;
    registrationresults.classList.remove('hidden');
    registrationform.classList.add('hidden');
    dashboard.classList.remove('hidden');
})
.catch(err=>{
    registrationresults.textContent = err.message;
    registrationresults.classList.remove('hidden');
    setTimeout(() => {
         registrationresults.classList.add('hidden');
    }, 2000);
})
Rusernameinput.value="";
Rpasswordinput.value="";
Rageinput.value="";

})



const taskinput  =document.getElementById('taskinput');
const addtask = document.getElementById("addtask");
const deletetask = document.getElementById('deletetask');
const tasksresults = document.getElementById('tasksresults');

addtask.addEventListener('click',()=>{
    const taskEl = taskinput.value.trim();
    if(!taskEl){
        tasksresults.textContent = 'please enter a note';
        tasksresults.classList.remove('hidden');
        setTimeout(() => {
            tasksresults.classList.add('hidden');
        }, 300);
        return;
    }
 fetch('/tasks/addtaskfunction',{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    credentials:'include',
    body:JSON.stringify({taskEl}),
    })
    .then(res=>res.json())
.then(data=>{
    const li = document.createElement('li');
    li.textContent = data.message;
    tasksresults.appendChild(li);
    tasksresults.classList.remove('hidden');
})
.catch(err=>{
    tasksresults.textContent = err.message;
    tasksresults.classList.remove('hidden');
})
taskinput.value = "";

});

deletetask.addEventListener('click',()=>{
    if(tasksresults.lastChild){
     tasksresults.lastChild.remove();
    }
    if(tasksresults.children.length===0){
        tasksresults.classList.add('hidden');

    }
})


const searchweatherinput = document.getElementById('searchweatherinput');
const getweatherbtn =document.getElementById('getweatherbtn');
const weatherresults = document.getElementById('weatherresults');

getweatherbtn.addEventListener('click',()=>{
    const searchresults = searchweatherinput.value.trim();
    if(!searchresults){
        weatherresults.textContent = 'please search a region';
        weatherresults.classList.remove('hidden');

        setTimeout(() => {
                weatherresults.classList.add('hidden');
        }, 200);
        return;
    }
     spinner.classList.remove('hidden')
     fetch('/weather/getweather',{
    method:'post',
       headers: { 'Content-Type': 'application/json' },
    credentials:'include',
      body: JSON.stringify({ searchresults })
    })
    .then(res=>res.json())
   
     .then(data=>{
        console.log(data);
     
        
      weatherresults.innerHTML=`
   Name: ${data.data.name}<br>
  Temp: ${Math.round(data.data.main.temp)}°C<br>
  Feels like: ${Math.round(data.data.main.feels_like)}°C<br>
  Weather: ${data.data.weather[0].description}
`;
     weatherresults.classList.remove('hidden');

})
.catch(err=>{
    weatherresults.textContent = err.message;
    weatherresults.classList.remove('hidden');
}).finally(()=>{
spinner.classList.add('hidden');
})


searchweatherinput.value="";

})

const getcodingbtn = document.getElementById('getcodingbtn');
const codingresult = document.getElementById('codingresult');

getcodingbtn.addEventListener('click',()=>{
    fetch('/getlanguages',{
        method:'GET'
    })
    .then(res=>res.json())
    .then(data=>{
        codingresult.textContent = data.message;
        codingresult.classList.remove('hidden')
    })
    .catch(err=>{
        codingresult.textContent = err.message;
        codingresult.classList.remove('hidden');
    })
})

const moviesearch = document.getElementById('moviesearch');
const searchbtn =document.getElementById('searchbtn');
const movieresults =document.getElementById('movieresults');


searchbtn.addEventListener('click',()=>{
    const movieEl = moviesearch.value.trim();
    if(!movieEl){
        movieresults.textContent = 'please search a movie';
        movieresults.classList.remove('hidden');
        setTimeout(() => {
            movieresults.classList.add('hidden');
        }, 3000);
        return;
    }
    spinners.classList.remove('hidden');
    fetch('/movie/movie',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        credentials:'include',
        body:JSON.stringify({movieEl}),
    })
       .then(res=>res.json())
    .then(data=>{
    
        data.data.Search.forEach(movie => {
             const div = document.createElement('div');
  div.className = 'movie-card';
  div.innerHTML = `
    <img src="${movie.Poster}" alt="movie poster">
    <p><b>${movie.Title}</b></p>
  `;
  movieresults.appendChild(div);
        });
    
        movieresults.classList.remove('hidden')
    })
    .catch(err=>{
        movieresults.textContent = err.message;
        movieresults.classList.remove('hidden');
    })
    .finally(()=>{
spinners.classList.add('hidden');
})
    moviesearch.value = "";

})
const homebtn = document.getElementById('homebtn');
homebtn.addEventListener('click',()=>{
    dashboard.classList.add('hidden');
    loginform.classList.remove('hidden');
})


const helbhef = document.getElementById('helbhef');

helbhef.addEventListener('click',()=>{
    window.location.href="https://portal.hef.co.ke/";
})
const portal = document.getElementById('portal');
portal.addEventListener('click',()=>{
    window.location.href="https://portal.mu.ac.ke/Dashboard/Dashboard#";
})

document.addEventListener('click',(e)=>{
    if(!sidebar.contains(e.target) && !hamburgermenu.contains(e.target)){
        sidebar.classList.remove('active');
    }
})

