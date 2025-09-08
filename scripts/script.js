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
        <div id="${category.id}" class="text-[10px] md:text-[12px] border border-[#15803D] md:border-none rounded-[4px] px-2 py-1 hover:cursor-pointer category-btns">${category.category_name}</div>
        `;

        // append new category to category container
        categoryBtnContainer.append(newCategory);

        // function for load category wise card
        newCategory.addEventListener('click', () => {

            const allCategoryBtns = document.getElementsByClassName('category-btns')

            for (let categoryBtn of allCategoryBtns) {
                // remove active classes
                categoryBtn.classList.remove('bg-[#15803D]', 'text-white');
                categoryBtn.classList.add('text-black');
            }


            document.getElementById(`${category.id}`).classList.add('bg-[#15803D]', 'text-white');
            document.getElementById(`${category.id}`).classList.remove('text-black');


            allCategoryWiseTree(`${category.id}`);
        });
    }
}

allCategories()


// total cost 

let totalCost = Number(document.getElementById('total-cost').innerText);


// function to remove cart item
const removeCartItem = (cartItem, plantPrice) => {
    const quantity = Number(cartItem.querySelector('.quantity').innerText);
    totalCost -= plantPrice * quantity;
    document.getElementById('total-cost').innerText = totalCost;

    cartItem.remove();
};


// function for show all plant cards

const showAllPlant = (plants) => {

    // card container
    const cardContainer = document.getElementById('card-container');

    // make sure the container is empty
    cardContainer.innerHTML = "";


    // add to cart
    const addToCartContainer = document.getElementById('add-to-cart-container');

    // create loop for every card
    for (let plant of plants) {

        // create new card for every tree
        const treeCard = document.createElement('div');
        treeCard.innerHTML = `
        <div class="bg-white rounded-[8px] p-1 md:p-3 h-full flex flex-col justify-between">
            <div>
                <img class="rounded-[8px] bg-black aspect-[3/2] w-full" src="${plant.image}" alt="">
                <button id="modal-${plant.name}" class="text-[10px] md:text-[12px] font-bold mt-2 hover:cursor-pointer">${plant.name}</button>
                <p class="text-[8px] md:text-[10px] mt-1.5 line-clamp-2">${plant.description}</p>
            </div>

            <div>
                <div class="flex justify-between items-center text-[8px] md:text-[12px] mt-1.5">
                    <div class="font-semibold bg-[#DCFCE7] rounded-full py-1 px-2 text-[#15803D]">${plant.category}
                    </div>
                    <p class="font-bold">৳<span>${plant.price}</span>
                    </p>
                </div>
                <button id= "plant-${plant.id}" class="text-[8px] md:text-[12px] py-1.5 hover:cursor-pointer font-semibold rounded-full bg-[#15803D] w-full text-white mt-2">Add to Cart
                </button>
            </div>
        </div>
        `;


        // append the new card to the container
        cardContainer.append(treeCard);

        // add to cart
        const addToCartBtns = document.getElementById(`plant-${plant.id}`);


        addToCartBtns.addEventListener('click', () => {

            // check if item already exist
            let existingTree = Array.from(addToCartContainer.children).find(tree => {
                return tree.querySelector("h3").innerText === plant.name;
            });

            if (existingTree) {
                let itemQuantity = existingTree.querySelector('.quantity');

                let itQuan = Number(itemQuantity.innerText);

                itemQuantity.innerText = itQuan + 1;

                totalCost += Number(plant.price);
            }

            else {
                // create new cart
                const newCart = document.createElement('div');

                newCart.innerHTML = `
                <div class="flex items-center justify-between bg-[#F0FDF4] rounded-[8px] px-2 py-1">
                            <div>
                                <h3 class="text-[10px] md:text-[12px] font-bold">${plant.name}</h3>
                                <p class="text-[11px] md:text-[14px] text-[#474f5a]">৳<span>${plant.price}</span> × <span class= "quantity">1</span></p>
                            </div>
                            <div class="text-xl md:text-2xl text-[#474f5a] hover:cursor-pointer cart-del-btn">
                                ×
                            </div>
                        </div>
                `;

                addToCartContainer.append(newCart);


                // total cost update
                totalCost += Number(plant.price);

                // cart delete and price update
                const cartDelBtn = newCart.querySelector('.cart-del-btn');
                cartDelBtn.addEventListener('click', () => {
                    removeCartItem(newCart, Number(plant.price));
                });

            }

            document.getElementById('total-cost').innerText = totalCost;

        })


        // modal with tree details
        const plantNameModal = document.getElementById(`modal-${plant.name}`);

        plantNameModal.addEventListener('click', () => {
            console.log(`modal clicked: modal-${plant.name}`);
        })
    }
}

allPlants()