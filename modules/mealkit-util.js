//creating an array of objects that contains the data for the mealKits with different categories

let mealKits = [
    {
        title: "Cauliflower Tacos",
        includes: "Cauliflower, Tortillas, Red Cabbage",
        description: "tacos, cauliflower, healthy",
        category: "Vegan Meals",
        price:  18.08,
        cookingTime: 25,
        servings: 2,
        imageUrl: "assets/images/Cauliflower-Tacos.jpg",
        featuredMealKit: "true"
    },

    {
        title: "Coconut rice bowl",
        includes: "fresh cilantro, mint and  toasted Coconut flakes",
        description: "Jasmine rice, Coconut Milk, tofu",
        category: "Vegan meals",
        price: 25.5,
        cookingTime: 25,
        servings: 2,
        imageUrl: "assets/images/Coconut-Rice-Bowl.jpg",
        featuredMealKit: "false"
    },

    {
        title: "crispy Tempeh with Sesame Spinach",
        includes: "spinach leaves, tempeh, spring onions",
        description: "sesame oil, tempeh, dark soy sauce",
        category: "Classic Meals",
        price: 20,
        cookingTime: 25,
        servings: 2,
        imageUrl: "assets/images/crispy tempeh with sesame spinach.png",
        featuredMealKit: "true"
    },

    {
        title: "Roasted Cauliflower",
        includes: "cauliflower, olive oil, garlic",
        description: "pepper, cauliflower, salt",
        category: "Classic Meals",
        price: 15.6,
        cookingTime: 25,
        servings: 2,
        imageUrl: "roasted-cauliflower.jpg",
        featuredMealKit: "false"
    },

    {
        title: "Vegetable Lasagna",
        includes: "carrots, zucchini, spinach",
        description: "tomatoes, lasagna , vegetables",
        category: "Classic Meals",
        price: 17,
        cookingTime: 25,
        servings: 2,
        imageUrl: "assets/images/vegetable lasagna.jpeg",
        featuredMealKit: "true"
    },

    {
        title: "Vegetable Chilly",
        includes: "tortilla chips, cheddar cheese, lime wedges, cilantro",
        description: "sour cream, avocado ",
        category: "Classic Meals",
        price: 18.89,
        cookingTime: 25,
        servings: 2,
        imageUrl: "assets/images/vegetable chilly.jpeg",
        featuredMealKit: "false"
    }
];

//function that will return the array of meal kits
module.exports.getAllMealKits = function (){
    return mealKits;
};

//function that will return the featured meal kits
module.exports.getFeaturedMealKits = function (mealKits){
    const featuredMealKits = [];
    for (let i = 0; i  < mealKit.length; i++){
        if (mealKits[i].featuredMealKit){
            featuredMealKits.push(mealKits[i]);
        }
    }
    return featuredMealKits;
};

//function that will return the meal kits  by category
module.exports.getMealKitsByCategory = function(mealkits){
    const categories = [];
    mealKits.forEach(mealKit => {
        if (!categories[mealKit.catefory]){
            categories[mealKit.category] = [];
        }
        categories[mealKit.category].push(mealKit);
        
    });

    const mealKitsByCategory = Object.keys(categories).map(categoryName => {
        return {
            categoryName: categoryName,
            mealKits: categories[categoryName]
    
        };
    });
    return mealKitsByCategory;

}



