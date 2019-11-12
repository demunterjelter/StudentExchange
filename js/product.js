//get data
db.collection('products').get().then(snapshot => {
    setupProducts(snapshot.docs);
});

const productList = document.querySelector('.productBook');
const productForm = document.querySelector('#create-form');

//setup products
const setupProducts = (data) => {
    let html = '';
    data.forEach(doc => {
        const product = doc.data();
        //console.log(product);
        var image = new Image();
        image.src = "data:image/jpg;base64," + product.img;
        var afbeelding = image.src;
        var docId = doc.id;

        const li = `
            <div class="card-panel recipe white row " data-id="${docId}">
            <img alt="recipe thumb" src="${afbeelding}">
                <div class="recipe-details">
                  <div class="recipe-title">${product.title}</div>
                  <div class="recipe-product">${product.author}</div>
                </div>
                <div class="deleteItem">x</div>   
            </div>
            
        `;
        
        html += li
    });

    productList.innerHTML = html;
    //deleting data
    document.querySelectorAll('.deleteItem').forEach(function(item){
        item.addEventListener('click', (e) => {
            //e.stopPropagation();
            console.log("je hebt op delete gedrukt");
            let id = e.target.parentElement.getAttribute('data-id');
            db.collection('products').doc(id).delete();
            console.log(id);
            e.target.parentElement.parentElement.removeChild(e.target.parentElement);
        });
    })
    
}

//saving data
productForm.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('products').add({
       
        title: productForm.title.value,
        author: productForm.author.value
    });
    const modal = document.querySelector('#modal-create');
    M.Modal.getInstance(modal).close();
    productForm.reset();
});



