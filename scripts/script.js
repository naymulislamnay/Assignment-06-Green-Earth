// all plant called

const allPlants = () => {
    fetch("https://openapi.programming-hero.com/api/plants").then((res) => res.json()).then((json) => showAllPlant(json.plants));
}


// all categories called

const allCategories = () => {
    fetch("https://openapi.programming-hero.com/api/categories").then((res) => res.json()).then((json) => showAllCategories(json.categories));
};


// category wise tree called

const allCategoryWiseTree = (category) => {
    manageSpinner(true);
    fetch(`https://openapi.programming-hero.com/api/category/${category}`).then((res) => res.json()).then((json) => showAllPlant(json.plants));
};


// plant details called for modal

const plantDetailsForModal = (id) => {
    fetch(`https://openapi.programming-hero.com/api/plant/${id}`).then((res) => res.json()).then((json) => showAllPlant(json.plants));
};


// spinner function

const manageSpinner = (status) => {
    if (status == true) {
        document.getElementById('spinner').classList.remove('hidden');
        document.getElementById('card-container').classList.add('hidden');
    }
    else {
        document.getElementById('spinner').classList.add('hidden');
        document.getElementById('card-container').classList.remove('hidden');
    }
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
                <img class="rounded-[8px] bg-black aspect-[16/9] w-full" src="${plant.image}" alt="">
                <button id="modal-${plant.name}" class="text-[10px] md:text-[12px] font-bold mt-2 hover:cursor-pointer">${plant.name}</button>
                <p class="text-[8px] md:text-[10px] mt-1.5 line-clamp-2">${plant.description}</p>
            </div>

            <div>
                <div class="flex justify-between items-center mt-1.5">
                    <div class="font-semibold bg-[#DCFCE7] rounded-full py-1 px-2 text-[#15803D] text-[8px] md:text-[11px]">${plant.category}
                    </div>
                    <p class="font-bold text-[8px] md:text-[12px]">৳<span>${plant.price}</span>
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

            // add to cart confermation
            addToCartBtns.innerText = '✓ Added Successfully';

            // return to default after 2sec
            setTimeout(() => {
                addToCartBtns.innerText = 'Add to Cart';
            }, 500);

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
        manageSpinner(false);

        // modal with tree details
        const plantNameModal = document.getElementById(`modal-${plant.name}`);

        plantNameModal.addEventListener('click', () => {
            console.log(`modal clicked: modal-${plant.name}`);

            const modalContainer = document.getElementById("modal-container");
            modalContainer.innerHTML = `
            <dialog id="my_modal_2" class="modal">
            <div class="modal-box w-1/2 max-w-sm md:max-w-lg p-2 md:p-5">
                <h3 class="text-[11px] md:text-[14px] md:text-lg font-bold">
                    ${plant.name}
                </h3>
                <div>
                    <img src="${plant.image}" class="mt-1.5 rounded-[8px] aspect-[16/9] w-full>
                </div>
                
                <p class="text-[8px] md:text-[12px] w-fit"> </p>
                <p class="text-[8px] md:text-[12px] w-fit mt-1.5"><span class="font-bold">Category: </span>${plant.category || '-'}</p>
                
                <p class="text-[8px] md:text-[12px] w-fit"><span class="font-bold">Price: </span>৳${plant.price || '-'}</p>

                <p class="text-[8px] md:text-[12px] w-fit mb-5 md:mb-10 mt-1.5"><span class="font-bold">Description: </span>${plant.description || '-'}</p>

            </div>
            
            <div class="relative">
                <form method="dialog" class="modal-backdrop text-black w-fit absolute right-0 bottom-0 z-10">
                    <button class="border border-[#bebaba] md:border-none py-0.5 md:py-1 px-1 md:px-3 rounded-[4px] md:rounded-[8px] md:btn text-[8px] md:text-[12px]">close</button>
                </form>
            </div>
                
        </dialog>
    `;

            const modal = document.getElementById("my_modal_2");
            modal.showModal();


        })
    }
}

allPlants()


// for select tree Quantity from plant a tree Today

const treeQuantitySelector = document.getElementById('tree-quantity-selector');
const numberOfTree = document.getElementById('tree-quantity');

treeQuantitySelector.addEventListener('click', () => {
    numberOfTree.classList.remove('hidden');
    numberOfTree.classList.add('block')
});

numberOfTree.querySelectorAll('a').forEach(option => {
    option.addEventListener('click', (e) => {
        e.preventDefault();
        const value = option.getAttribute('data-value');
        treeQuantitySelector.innerHTML = `${value} <i class="fa-solid fa-angle-down"></i>`;

        numberOfTree.classList.remove('block');
        numberOfTree.classList.add('hidden');
    });
});