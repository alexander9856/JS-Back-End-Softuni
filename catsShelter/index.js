const fs = require('fs/promises');
const fss = require('fs')
const http = require('http');
const formidable = require('formidable')
const cats = require('./data/cats.json');
const breeds = require('./data/breeds.json');
const path = require('path')
const url = require('url')
const qs = require("querystring");

const server = http.createServer(async (req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/html',
    });


    if (req.url == '/' && req.method == 'GET') {
        const homePage = await readFile('./views/home.html')
        let catsModified = cats.map(x => catTemplate(x)).join('')
        let result = homePage.replace('{{cats}}', catsModified)
        res.write(result)
    }
    else if (/\?search=[a-zA-z1-9]?.*/.test(req.url)) {
        const homePage = await readFile('./views/home.html')
        let searchedName = req.url.split('search=')[1].toLowerCase();
        let filtered = cats.filter(x => {
            if (x.name.toLowerCase().startsWith(searchedName) || x.name.toLowerCase() == searchedName) {
                return x
            }
        })
        let catsModified = filtered.map(x => catTemplate(x)).join('')
        let result = homePage.replace('{{cats}}', catsModified)
        res.write(result)
    }
    else if (/cats\/add-breed/.test(req.url) && req.method == 'GET') {
        let addBreedPage = await readFile('./views/addBreed.html');
        res.write(addBreedPage)
    }
    else if (/cats\/add-breed/.test(req.url) && req.method == 'POST') {
        let form = new formidable.IncomingForm();
        let breeds = JSON.parse(fss.readFileSync('./data/breeds.json', { encoding: 'utf-8' }));

        form.parse(req, (err, fields, files) => {
            breeds.push(fields.breed)
            fss.writeFileSync('./data/breeds.json', JSON.stringify(breeds))

        })
        res.writeHead(301, { "location": "/" })
    }
    else if (/cats\/add-cat/.test(req.url) && req.method == 'GET') {
        const addCatPage = await readFile('./views/addCat.html');
        let catBreedsModified = breeds.map(x => breedTemplate(x)).join('');
        let result = addCatPage.replace('{{catBreeds}}', catBreedsModified);
        res.write(result)
    }
    else if (/cats\/add-cat/.test(req.url) && req.method == 'POST') {
        let form = new formidable.IncomingForm();
        form.parse(req, (err, fields, files) => {
            if (err) throw err;
            let name = fields.name;
            let breed = fields.breed;
            let description = fields.description
            let fileUploaded = files.upload.originalFilename;
            let oldPath = files.upload.filepath;

            if (name && breed && fileUploaded) {
                let filUploadedName = files.upload.originalFilename
                let newPath = path.normalize(path.join(__dirname, "./data/images/" + filUploadedName))
                fss.copyFile(oldPath, newPath, (err) => {                   // transfer     
                    if (err) throw err;
                    console.log("Files was uploaded sccessfully!");
                });
                console.log(fields)
                cats.push({ 'id': cats.length + 1, 'name': name, 'description': description, 'breed': breed, 'imageUrl': filUploadedName })
                fss.writeFileSync('./data/cats.json', JSON.stringify(cats))


            }
        })
        res.writeHead(301, { "location": "/" })
    }
    else if (/cats\/\d+\/edit/.test(req.url) && req.method == 'GET') {
        let editPage = fss.readFileSync('./views/editCat.html', { encoding: 'utf-8' });;
        let catId = req.url.split('cats/')[1].split('/')[0];
        let cat = cats.find((o) => o.id == catId)
        let result = editPage.replaceAll('{{name}}', cat.name);
        result = result.replace('{{description}}', cat.description);
        result.replace('{{id}}', cat.id)
        let catBreedsModified = breeds.map(x => breedTemplate(x))
        for (let i = 0; i < catBreedsModified.length; i++) {
            let poroda = catBreedsModified[i];
            poroda = poroda.split('="')[1].split('"')[0];
            if (cat.breed == poroda) {
                catBreedsModified.splice(i, 1);
                catBreedsModified.unshift(`<option value="${poroda}">${poroda}</option>`)
                break
            }
        }

        result = result.replace('{{breeds}}', catBreedsModified.join(''))
        res.write(result)
    }
    else if (/cats\/\d+\/edit/.test(req.url) && req.method == 'POST') {
        let form = new formidable.IncomingForm();
        let catId = req.url.split('cats/')[1].split('/')[0];
        let cat = cats[catId - 1]
        form.parse(req, (err, fields, files) => {
            if (err) throw err;
            let name = fields.name;
            let breed = fields.breed;
            let description = fields.description
            let fileUploaded = files.upload.originalFilename;
            let oldPath = files.upload.filepath;

            if (fileUploaded) {
                let filUploadedName = files.upload.originalFilename
                let newPath = path.normalize(path.join(__dirname, "./data/images/" + filUploadedName))
                fss.copyFile(oldPath, newPath, (err) => {                   // transfer     
                    if (err) throw err;
                    console.log("Files was uploaded sccessfully!");
                });
                cat.imageUrl = filUploadedName
                fss.writeFileSync('./data/cats.json', JSON.stringify(cats))
            }
            cat.name = name;
            cat.breed = breed;
            cat.description = description;
        })
        res.writeHead(301, { "location": "/" })
    }

    else if (/cats\/\d+\/delete/.test(req.url) && req.method == 'GET') {
        let catShelterPage = fss.readFileSync('./views/catShelter.html', { encoding: 'utf-8' });
        let catId = req.url.split('cats/')[1].split('/')[0];
        let cat = cats.find((o) => o.id == catId)

        let result = catShelterPage.replace('{{name}}', cat.name)
        result = result.replace('{{description}}', cat.description)
        result = result.replace('{{breed}}', cat.breed)
        result = result.replace('{{imageUrl}}', cat.imageUrl)
        res.write(result)
    }
    else if (/cats\/\d+\/delete/.test(req.url) && req.method == 'POST') {
        let catId = req.url.split('cats/')[1].split('/')[0];
        let cat = cats[catId - 1];
        let index = cats.indexOf(cat)

        cats.splice(index, 1);;
        fss.writeFileSync('./data/cats.json', JSON.stringify(cats))

        res.writeHead(301, { "location": "/" })

    }

    else if (req.url == '/css/site.css') {
        const css = await readFile('./css/site.css')
        res.writeHead(200, {
            'Content-Type': 'text/css',
        });
        res.write(css)
    }
    else if (req.url.includes('/data/images/') && req.url.endsWith('jpg') || req.url.endsWith('jpeg')) {
        let data = fss.readFileSync('.' + req.url)
        res.writeHead(200, {
            "Content-Type": "image/jpeg"
        });
        res.write(data);
    }
    else if (req.url.includes('/data/images/') && req.url.endsWith('png')) {
        let data = fss.readFileSync('.' + req.url)
        res.writeHead(200, {
            "Content-Type": "image/png"
        });
        res.write(data);
    }
    else {
        res.write(`
                <h1>404</h1>
        `);
    }


    res.end()
})

function readFile(path) {
    return fs.readFile(path, { encoding: 'utf-8' })
}
function catTemplate(cat) {
    const html = fss.readFileSync('./views/partials/cat.html', { encoding: 'utf-8' });
    let result = html.replaceAll('{{name}}', cat.name);
    result = result.replace('{{imageUrl}}', cat.imageUrl);
    result = result.replace('{{breed}}', cat.breed);
    result = result.replace('{{description}}', cat.description);
    result = result.replaceAll('{{id}}', cat.id)
    return result
}
function breedTemplate(cat) {
    const html = fss.readFileSync('./views/partials/addCat.html', { encoding: 'utf-8' })
    let result = html.replaceAll('{{catBreed}}', cat);
    return result
}

server.listen(5000)
console.log('Server is running on port 5000...!!!!!!!')