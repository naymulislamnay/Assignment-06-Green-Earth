1) What is the difference between var, let, and const?
    Answer: var - value can be change
                - Declare again possible
            
            let - value can be change
                - Declare again not possible

            const - changing value is not possible
                  - Declare again is not possible



2) What is the difference between map(), forEach(), and filter()?
    Answer: forEach() - return undefined
                      - use for take action in every element
            
                map() - return new array with the same length of the previous array
                      - use for create new array by changing the elements
                
             filter() - return new array with less length of the previous array
                      - use for select element/elements by condition



3) What are arrow functions in ES6?
    Answer: Arrow function is a small/simple version of syntax function.
            Example: 
                here below is a normal syntax function:

                function add(a, b) {
                return a + b;
                }



                here below is the Arrow function of that function:
                
                const add = (a, b) => a+b;


4) How does destructuring assignment work in ES6?
    Answer: by using destructuring it can be extract variable from array or object.


5) Explain template literals in ES6. How are they different from string concatenation?
    Answer: 
        Template Literals:
            Template literals is a string that is made with backtick (`)
            It accept variable or expression through ${}
            It accept multiline string

        String concatenation:
            It needs multiple string even it is only a space

        Example:
        let, i have fistName and lastName variables like below:

        const firstName = "Programming";
        const lastName = "Hero";


        now get fullName with string concatenation is like-

        const fullName = fistName + " " + lastName;
        console.log(fullName);


        where i can get the fullName with template literal like-

        const fullName = `${firstName} ${lastName}`;
        console.log(fullName);