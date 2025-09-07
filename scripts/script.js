// all plant called

const allPlants = () => {
    fetch("https://openapi.programming-hero.com/api/plants").then((res) => res.json()).then((json) => showAllPlant(json.plants));
}


// all categories called

const allCategories = () => {
    fetch("https://openapi.programming-hero.com/api/categories").then((res) => res.json()).then((json) => showAllCategories(json.categories))
}


// all categories called

const allCategoryWiseTree = (category) => {
    fetch(`https://openapi.programming-hero.com/api/category/${category}`).then((res) => res.json()).then((json) => showAllPlant(json.plants))
}


// function for show all categories button

const showAllCategories = (categories) => {

    // categories button container
    const categoryBtnContainer = document.getElementById("category-btn-container");

    // make sure the container is empty
    categoryBtnContainer.innerHTML = "";

    // loop for all category btn
    for (let category of categories) {

        // create new category item
        const newCategory = document.createElement('div');

        newCategory.innerHTML = `
        <div id="${category.id}" class="bg-[#15803D] text-white text-[12px] rounded-[4px] px-2 py-1 hover:cursor-pointer">${category.category_name}</div>
        `;

        // append new category to category container
        categoryBtnContainer.append(newCategory);

        // function for load category wise card
        newCategory.addEventListener('click', () => {
            allCategoryWiseTree(`${category.id}`)
        });
    }
}

allCategories()


// function for show all plant cards

const showAllPlant = (plants) => {

    // card container
    const cardContainer = document.getElementById('card-container');

    // make sure the container is empty
    cardContainer.innerHTML = "";

    // create loop for every card
    for (let plant of plants) {

        // create new card for every tree
        const treeCard = document.createElement('div');
        treeCard.innerHTML = `
        <div class="bg-white rounded-[8px] p-3 h-full flex flex-col justify-between">
            <div>
                <img class="rounded-[8px] bg-black aspect-[3/2] w-full" src="${plant.image}" alt="">
                <button class="text-[12px] font-bold mt-2 hover:cursor-pointer">${plant.name}</button>
                <p class="text-[10px] mt-1.5">${plant.description}</p>
            </div>

            <div>
                <div class="flex justify-between text-[12px] mt-1.5">
                    <div class="font-semibold bg-[#DCFCE7] rounded-full py-1 px-2 text-[#15803D]">${plant.category}
                    </div>
                    <p class="font-bold">৳<span>${plant.price}</span>
                    </p>
                </div>
                <button class="text-[12px] py-1.5 hover:cursor-pointer font-semibold rounded-full bg-[#15803D] w-full text-white mt-2">Add to Cart
                </button>
            </div>
        </div>
        `;


        // append the new card to the container
        cardContainer.append(treeCard);
    }
}

allPlants()