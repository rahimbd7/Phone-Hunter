const fetchData = async (searchText=13,viewMoreStatus) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    // console.log(data)
    showAllData(data, viewMoreStatus)
}

const showAllData = (phones, viewMoreBtnStatus) => {
    // console.log(viewMoreBtnStatus)
    let mobiles = phones.data;
    const container = document.querySelector('#container');
    container.innerText = '';
    // if mobile length is greater then 10 and make visible of show all button
    if (mobiles.length >= 10 && !viewMoreBtnStatus) {
        mobiles = mobiles.slice(0, 11)
        document.querySelector('#showAllBtn').classList.remove('hidden');
    } else {
        document.querySelector('#showAllBtn').classList.add('hidden');
    }
    mobiles.forEach(mobile => {
    
        const card = document.createElement('div');
        card.innerHTML = `
        <div class="card  bg-base-100 shadow-xl">
                        <figure class="px-10 pt-10">
                            <img src="${mobile.image}" />
                        </figure>
                        <div class="card-body items-center text-center">
                            <h2 class="card-title">${mobile.brand}</h2>
                            <p>${mobile.phone_name}</p>
                            <div class="card-actions">
                                <button onclick="detailsPhone('${mobile.slug}')" class="btn btn-primary">Show details</button>
                            </div>
                        </div>
                    </div>
        
        `;
        container.appendChild(card);
    });
    spinner(false)
}

fetchData()

const search = (status) => {
    const searchText = document.querySelector('#searchText').value;
    fetchData(searchText,status);
    spinner(true);
}
const spinner  = (isVisible) => {
    const spinnerBtn = document.querySelector('#spinner'); 
    if (isVisible) {
        spinnerBtn.classList.remove('hidden');
    } else {
        spinnerBtn.classList.add('hidden');
    }
}

const viewMore = () => {
    search(true)
}

const detailsPhone = async (id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    console.log(data);
    const modalContents = document.querySelector('.modal-box');
    mobile_details.showModal();
    modalContents.innerHTML = `
    <div class="flex justify-center">
        <img src="${data.data.image}"/>
    </div>
    <h3 class="text-2xl text-blue-500">${data.data.brand}</h3>
    <h3 class="text-2xl text-blue-500">${data.data?.mainFeatures?.storage
}</h3>
    `
}






