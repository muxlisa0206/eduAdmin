let path = new URLSearchParams(location.search);

let id = path.get("teacherId");
let teacherStudent = document.querySelector(".teacherStudent");
let teacherInfo = document.querySelector(".teacherInfo")

async function getTeacherInfo() {
    try{

        let res1 = await axios(`https://69175b7fa7a34288a2807c12.mockapi.io/EduAdmin/teachers/${id}`);
        let result1 = res1.data;
        console.log(result1);

        teacherInfo.innerHTML = `
            <div class="overflow-hidden max-w-[300px] w-full rounded-[14px] border-1 border-[gray]/40 bg-[#ffffff] px-[15px] pt-[10px] pb-[90px] flex flex-col gap-[50px] relative group transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                    <div class="flex flex-col items-center justify-center">
                        <a href="/pages/teacher-info.html?teacherId=${result1.id}"><img class="w-[90px] h-[90px] rounded-[50%]" src="${result1.image}" alt=""></a>
                        <p>${result1.name}</p>
                        <p class="bg-[gray]/20 px-[3px] py-[2px] rounded-[3px] font-bold text-[12px]">${result1.profession}</p>
                        <p class="text-[#4A5565]">Experience: ${result1.experience}</p>
                        <p class="text-[#4A5565]">Age: ${result1.age}</p>
                        <p class="flex gap-1 items-center"><img class="w-[30px] h-[30px]" src="/images/star.svg" alt="">${result1.rating}</p>
                    </div>
                    <div>
                         <p class="text-[#4A5565] flex gap-1 items-center"><img class="w-[30px] h-[30px]" src="/images/phone.svg" alt=""> <span class="text-[#3B3B3B]">${result1.phone}</span></p>
                        <p class="text-[#4A5565] flex gap-1 items-center"><img class="w-[30px] h-[30px]" src="/images/email.svg" alt=""> <span class="text-[#3B3B3B]">${result1.email}</span></p>
                        <p class="text-[#4A5565] flex gap-1 items-center"><img class="w-[30px] h-[30px]" src="/images/telegram.svg" alt=""> <span class="text-[#3B3B3B]">${result1.telegram}</span></p>
                        <p class="text-[#4A5565] flex gap-1 items-center"><img class="w-[30px] h-[30px]" src="/images/linkedin.svg" alt=""> <span class="text-[#3B3B3B]">${result1.linkedin}</span></p>
                    </div>
                    <div class="absolute bottom-5 left-7 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 flex gap-2">

                        <button class="px-10 py-3 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600">
                            Edit
                        </button>

                        <button class="px-12 py-3 text-sm bg-red-500 text-white rounded-md hover:bg-red-600">
                            Delete
                        </button>

                    </div>

                </div>
        `
        

        let res2 = await axios(`https://69175b7fa7a34288a2807c12.mockapi.io/EduAdmin/teachers/${id}/students`)
        let result2 = res2.data;

        console.log(result2);

        result2?.map((el) =>{
            teacherStudent.innerHTML += `
                <div class="flex justify-between bg-[gray]/10 rounded-[14px] p-5">
                    <div class="flex gap-3 items-center">
                        <img class="w-[60px] h-[60px] rounded-[50%]" src="${el.image}" alt="">
                        <div class="flex flex-col">
                            <h1 class="text-[#101828] text-[24px]">${el.name}</h1>
                            <div class="flex gap-1 items-center text-[#4A5565] text-[20px]">
                                <p>garde ${el.grade}</p>
                                ●
                                <p>age ${el.age}</p>
                            </div>
                        </div>
                    </div>
                    <p class="text-[#101828] flex gap-1 items-center"><img class="w-[30px] h-[30px]" src="/images/star.svg" alt="">${el.rating}</p>
                </div>
            `
        })
    }catch(err){

    }
}
getTeacherInfo();
