//? fetching all data

let catagoriData;
let allButton;

const fetchingData = async () => {
    const fetching = await fetch(`https://openapi.programming-hero.com/api/videos/categories`);
    const data = await fetching.json();
    const categories = data.data;
    displayCategories(categories);
}

const displayCategories = (categories) => {
    const catagoriesDiv = document.getElementById('catagories');
    categories.forEach(catagory => {
        const div = document.createElement('div');
        div.classList = `tabs`;
        div.innerHTML = `
            <button id="bttn" onclick="indivusalCategoryShow('${catagory.category_id}', this);" class="btn bg-gray-200 focus:bg-red-600 active:bg-red-700 focus:outline-none ">${catagory.category}</button>
        `
        catagoriesDiv.appendChild(div);
    });
}

const indivusalCategoryShow = async (id, target) => {
    const fetching = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`);
    const featureData = await fetching.json();
    catagoriData = featureData;

    displaySong(featureData.data);
}

const displaySong = (data) => {
    const songDiv = document.getElementById('songDiv');
    songDiv.innerHTML = '';
    const notFounDiv = document.getElementById('notFoundImage')
    notFounDiv.innerHTML = '';
    if (data.length === 0) {
        const div = document.createElement('div');
        div.innerHTML = `
            <div class="text-center flex flex-col justify-center items-center">
                <img src="./notFound.png" >
                <h1 class="text-5xl font-bold">Oops!! Sorry, There is no<br>content here </h1>
            <div>
        `;
        div.classList = `h-[620px] flex justify-center items-center`
        notFounDiv.appendChild(div);
    } else {
        data.forEach(itemSong => {
            const second = itemSong.others.posted_date;
            const hours = Math.floor(second / 3600);
            const minutes = Math.floor((second - (hours * 3600)) / 60);
            const div = document.createElement('div');
            div.classList = `card card-compact w-80 mt-8`;
            div.innerHTML = `
            <figure>
                <div class="relative">
                    <img class="rounded-lg w-[350px] h-[200px]" class="rounded-lg" src="${itemSong.thumbnail ? itemSong.thumbnail : 'no image found'}" />
                    <div class="absolute right-0 bottom-0 text-white mr-2 mb-2 p-1">       
                        <p class="bg-black rounded-sm">${itemSong.others.posted_date ? hours + 'hours ' + minutes + 'minutes ago' : ''
                } </p>
                    </div>
                </div>
            </figure>
            <div class="pt-4 space-y-2">
                <div class="flex gap-4">
                    <label tabindex="0" class="btn btn-ghost btn-circle avatar">
                        <div class="w-10 rounded-full">
                            ${itemSong.authors.map((item, index) => `<img src="${item.profile_picture}"/>`).join('')} 
                        </div>
                    </label>
                    <div>
                        <h2 class="card-title">${itemSong.title ? itemSong.title : 'title not found'}</h2>
                        <div class="flex items-center gap-2">
                            <p>
                                ${itemSong.authors.map((item, index) => `${item.profile_name}`).join('')}
                            </p>
                            <p>
                                ${itemSong.authors.map(item => item.verified ? `<img src="./fi_10629607.png" >` : '').join()}
                            </p>
                        </div>
                        <p>${itemSong.others.views} view</p>
                    </div>
                </div>
            </div>
        `;
            songDiv.appendChild(div);
        })
    }
    
}

const sortByView = () => {
    const sortedData = catagoriData.data.sort(function (a, b) {
        const item1 = a.others.views.split('');
        item1.pop();
        const number1 = item1.join('');
        const item2 = b.others.views.split('');
        item2.pop();
        const number2 = item2.join('');
        return number2 - number1;
    })
    displaySong(sortedData);
}

indivusalCategoryShow('1000')
fetchingData();
