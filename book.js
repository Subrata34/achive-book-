const book=()=>{
  searchField=document.getElementById('search-field');
  const searchText=searchField.value;
  //console.log(searchText);
  searchField.value='';
  const url=`https://openlibrary.org/search.json?q=${searchText}`;
  fetch(url)
  .then(res=>res.json())
  .then(data=>console.log(data.docs));
}

const Resultdisplay=docs=>{
 const searchresult=document.getElementById('search-result');
 console.log(searchresult);
 docs.forEach(book  => {
   console.log(book);
   const div=document.createElement('div');
   div.classList.add('col');
   div.innerHTML=`
   <div class="card h-100">
        <img src="..." class="card-img-top" alt="...">
         <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content.</p>
        </div>
      </div>
    </div>
   `;
   searchresult.appendChild(div);
 });
}