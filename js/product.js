//get data
db.collection('products').get().then(snapshot => {
    setupGuides(snapshot.docs);
});

const guideList = document.querySelector('.guides');

//setup guides
const setupGuides = (data) => {
    let html = '';
    data.forEach(doc => {
        const guide = doc.data();
        console.log(guide);
        var image = new Image();
        image.src = "data:image/jpg;base64," + guide.img;
        var afbeelding = image.src;

        const li = `
            <div class="card-panel recipe white row">
            <img alt="recipe thumb" src="${afbeelding}">
                <div class="recipe-details">
                  <div class="recipe-title">${guide.title}</div>
                  <div class="recipe-product">${guide.author}</div>
                </div>
                <div class="recipe-delete">
                  <i class="material-icons">delete_outline</i>
                </div>
            </div>
            
        `;
        
        html += li
    });

    guideList.innerHTML = html;

}

/*<li>
                <div class="collapsible-header grey lighten-4">${guide.title}</div>
                <div class="collapsible-body white">${guide.author}</div>
            </li>
            */