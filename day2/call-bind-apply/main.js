let name = {
    firstname: "Raj",
    lastname: "Kishore",

}

let   printFullName =  (hometown, state) => {
        console.log(this.firstname + " " + this.lastname + " from " + hometown +" " + state);
    }
printFullName.call(name, "Patna", "Bihar")

let name2 = {
    firstname: "kushar",
    lastname: "raj"
}


printFullName.call(name2, "jaipur", "Rajasthan");
printFullName.apply(name2, ["mumbai", "mahrashtra"]);

let newfn = printFullName.bind(name2, "mumbai", "mahrashtra");
console.log(newfn);
printFullName();