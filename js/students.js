let allStudents = document.querySelector(".allStudents");
let studentsCount = document.querySelector(".studentsCount");
let addTeacherBtn = document.getElementById("addTeacherBtn")
let outerModal = document.getElementById("outerModal");
let innerModal = document.getElementById("innerModal");
let submitBtn = document.getElementById("submitBtn");

let select = null;

addTeacherBtn.addEventListener("click" , function(){
    outerModal.classList.remove("hidden");
});

outerModal.addEventListener("click", function(){
    outerModal.classList.add("hidden");
    select = null;
})

innerModal.addEventListener("click" , function(e){
    e.stopPropagation();
})

async function getStudents() {
    try {
        let res = await axios.get("https://69175b7fa7a34288a2807c12.mockapi.io/EduAdmin/students");
        let result = res.data;
        let count = result.length;

        studentsCount.textContent = `Showing ${count} of ${count} students`

        console.log(result);
        
        result.map((el) =>{
            allStudents.innerHTML+=`
                 <div class="overflow-hidden max-w-[350px] w-full rounded-[14px] border-1 border-[gray]/40 bg-[#ffffff] px-[15px] pt-[10px] pb-[90px] flex flex-col gap-[50px] relative group transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                    <div class="flex flex-col items-center justify-center">
                        <img class="w-[90px] h-[90px] rounded-[50%]" src="${el.image}" alt="">
                        <p>${el.name}</p>
                        <p class="bg-[gray]/20 px-[3px] py-[2px] rounded-[3px] font-bold text-[12px]">Grade: ${el.grade}</p>
                        <p class="text-[#4A5565]">Age: ${el.age} y</p>
                        <p class="flex gap-1 items-center"><img class="w-[30px] h-[30px]" src="/images/star.svg" alt="">${el.rating}</p>
                        <p class="flex gap-1 items-center"><img class="w-[30px] h-[30px]" src="/images/coin.svg" alt=""> rate: ${el.coin}</p>
                    </div>
                    <div class="flex flex-col gap-2">
                        <p class="text-[#4A5565] flex gap-1 items-center"><img class="w-[30px] h-[30px]" src="/images/phone.svg" alt=""> <span class="text-[#3B3B3B]">${el.phone}</span></p>
                        <p class="text-[#4A5565] flex gap-1 items-center"><img class="w-[30px] h-[30px]" src="/images/email.svg" alt=""> <span class="text-[#3B3B3B]">${el.email}</span></p>
                        <p class="text-[#4A5565] flex gap-1 items-center"><img class="w-[30px] h-[30px]" src="/images/telegram.svg" alt=""> <span class="text-[#3B3B3B]">${el.telegram}</span></p>
                        <p class="text-[#4A5565] flex gap-1 items-center"><img class="w-[30px] h-[30px]" src="/images/linkedin.svg" alt=""> <span class="text-[#3B3B3B]">${el.linkedin}</span></p>
                    </div>
                    <div class="absolute bottom-5 left-7 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 flex gap-2">

                        <button 
                        onClick="editStudents(${el.id}"
                        class="px-10 py-3 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600">
                            Edit
                        </button>

                        <button 
                        onClick="deleteStudents(${el.id}]"
                        class="px-12 py-3 text-sm bg-red-500 text-white rounded-md hover:bg-red-600">
                            Delete
                        </button>

                    </div>

                </div>
            `
        })

    } catch (err) {
        console.log(err);
    }
}

getStudents()

async function deleteStudents(id){
    try{
        await axios.delete(`https://69175b7fa7a34288a2807c12.mockapi.io/EduAdmin/students/${id}`);
        getStudents();
    }catch(err){
        console.log(err);   
    }
}

innerModal.addEventListener("submit", async function(e){
    e.preventDefault();
    let options = {};
    options.image = e.target[0].value;
    options.name = e.target[1].value;
    options.profession = e.target[2].value;
    options.age = e.target[3].value;
    options.experience = e.target[4].value;
    options.gender = e.target[5].value;
    options.rating = e.target[6].value;
    options.phone = e.target[7].value;
    options.telegram = e.target[8].value;
    options.linkedin = e.target[9].value;
    options.email = e.target[11].value;

    try{
        select ? await axios.put(`https://69175b7fa7a34288a2807c12.mockapi.io/EduAdmin/students${select}`, options) 
        :await axios.post(`https://69175b7fa7a34288a2807c12.mockapi.io/EduAdmin/students`, options);
        outerModal.classList.add("hidden");
        getStudents();
        select = null;
    }catch(err){
        console.log(err);
    }
})

async function editStudents(id){
    outerModal.classList.remove("hidden");

    select = id;
    try{
        let res3 = await axios.get(`https://69175b7fa7a34288a2807c12.mockapi.io/EduAdmin/students/${id}`);
        console.log(res3.data);

        console.log(innerModal[0].value = res3.data.image);
        console.log(innerModal[1].value = res3.data.name);
        console.log(innerModal[2].value = res3.data.profession);
        console.log(innerModal[3].value = res3.data.age);
        console.log(innerModal[4].value = res3.data.experience);
        console.log(innerModal[5].value = res3.data.gender);
        console.log(innerModal[6].value = res3.data.rating);
        console.log(innerModal[7].value = res3.data.phone);
        console.log(innerModal[8].value = res3.data.telegram);
        console.log(innerModal[9].value = res3.data.linkedin);
        console.log(innerModal[10].value = res3.data.email);
        
    }catch(err){
        console.log(err);
    }
}