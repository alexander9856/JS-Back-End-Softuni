const mongoose = require('mongoose');

const Cat = require('./models/Cat');

async function main() {
    mongoose.set('strictQuery', false);
    await mongoose.connect('mongodb://127.0.0.1:27017/catsShelter');

    console.log('Database Connected');
    const cats = await readCats();
    cats.forEach(cat => {
        cat.greet();
        console.log(cat.info);
    });

    await saveCat('sashko', 5, 'nai-hubavoto kote');
    let oneCat = await readCat('sashko');
    console.log(oneCat);

    // await updateCat('Nav', 'Nabuchadnezzar');
}

async function saveCat(name, age, breed) {
    // await Cat.create({
    //     name,
    //     age,
    //     breed,
    // });

    const cat = new Cat({
        name,
        age,
        breed,
    });

    await cat.save();
}

async function readCats() {
    const cats = await Cat.find();

    console.log(cats);

    return cats;
}

async function readCat(name) {
    const cat = await Cat.findOne({ breed: 'nai-hubavoto kote' });
    // const cat = await Cat.findById("63ced0fe497947c2fe08e07e");

    return cat;
}

async function updateCat(name, newName) {
    await Cat.updateOne({ name }, { name: newName });
}

main();
