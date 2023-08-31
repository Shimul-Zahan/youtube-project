//? fetching all data

const fetchingData = async () => {
    const fetching = await fetch(`https://openapi.programming-hero.com/api/videos/categories`);
    const data = await fetching.json();
    const categories = data.data;
    displayCategories(categories);
    // console.log(categories)
}

const displayCategories = (categories) => {
    const catagoriesDiv = document.getElementById('catagories');
    categories.forEach(catagory => {
        const div = document.createElement('div');
        div.classList = `tabs`;
        div.innerHTML = `
            <button onclick="indivusalCategoryShow('${catagory.category_id}')" class="btn">${catagory.category}</button>
        `
        catagoriesDiv.appendChild(div)
    });
}

const indivusalCategoryShow = async (id) => {
    // console.log(id);
    const isClicked = true;
    const fetching = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`);
    const featureData = await fetching.json();

    // ! here sort the data
    const sortedData = featureData.data.sort(function (a, b) {
        const item1 = a.others.views.split('');
        item1.pop();
        const number1 = item1.join('');
        const item2 = b.others.views.split('');
        item2.pop();
        const number2 = item2.join('');
        return number2 - number1;
    })
    // console.log(sortedData);
    displaySong(sortedData);
    // console.log(featureData.data[0].others.views)
}
const displaySong = (data) => {
    // console.log('clicked', isClicked)
    const songDiv = document.getElementById('songDiv');
    songDiv.innerHTML = '';
    data.forEach(itemSong => {
        const div = document.createElement('div');
        div.classList = `card card-compact w-80 mt-8`;
        div.innerHTML = `
            <figure>
                <img class="rounded-lg w-[350px] h-[200px]" class="rounded-lg" src="${itemSong.thumbnail ? itemSong.thumbnail: 'no image found'}" />
            </figure>
            <div class="pt-4 space-y-2">
                <div class="flex gap-4">
                    <label tabindex="0" class="btn btn-ghost btn-circle avatar">
                        <div class="w-10 rounded-full">
                            ${ itemSong.authors.map((item, index) => `<img src="${item.profile_picture}"/>`).join('') } 
                        </div>
                    </label>
                    <div>
                        <h2 class="card-title">${itemSong.title ? itemSong.title: 'title not found'}</h2>
                        <p>
                            ${ itemSong.authors.map((item, index) => `${item.profile_name}`).join('') }
                        </p>
                        <p>${itemSong.others.views} view</p>
                    </div>
                </div>
            </div>
        `;
        songDiv.appendChild(div);
    })
}
indivusalCategoryShow('1000')
fetchingData();