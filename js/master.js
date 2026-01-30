
/////////////////reveal/////////////////////////
 document.addEventListener("DOMContentLoaded", () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("activ");
      }
    });
  },{
     threshold: 0.3
  });
  
  document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

});

/////////////////////////////////////landing///////////
let mypic=["1.jpg","3.jfif","4.jfif","5.jfif","6.jfif"]
let view=document.querySelector(".landing .container img")

setInterval(()=>{
    let myindex=Math.floor(Math.random()*mypic.length);
    view.src="../images/"+mypic[myindex];
     view.style.animation = "none";
  view.offsetHeight;
  view.style.animation = "slideIn 1s ease";
},2000)
/////////////////////////////inform/////////////////////
  const counter = document.getElementById("counter");
  const counter2 = document.getElementById("counter2");

  function scount(){

    let number = 15;
     
    const interval = setInterval(() => {
        counter.textContent = number;
      number+=10;
  
      if (number > Number(counter.dataset.value) ) {
        clearInterval(interval); 
      }
    }, 50);
  }

  function scount2(){
   let n=10;
   const interval2 = setInterval(() => {
       counter2.textContent = n;
     n+=10;
 
     if (n > Number(counter2.dataset.value) ) {
       clearInterval(interval2); 
     }
   }, 50);
  }


  const observ = new IntersectionObserver((e) => {
  e.forEach(en => {
    if (en.isIntersecting) {
      scount();
      scount2();
      observ.unobserve(target); 
    }
  });
}, {
  threshold: 0.5 
});

observ.observe(counter);
observ.observe(counter2);
  /////////////////////////////performance/////////////////////
const ac = document.querySelector('.ac');
const topd = document.querySelector('.top');

window.addEventListener('scroll', () => {
  const rect = topd.getBoundingClientRect();
  const windowHeight = window.innerHeight;

  if (rect.top < windowHeight && rect.bottom > 0) {
    const visibleRatio = 1 - (rect.top / windowHeight);

    ac.style.transform = `translate(0%, calc( ${visibleRatio * 90}px))`;
  }
});

////////////////////////////list//////////////////////////////
const images = [
  { title: "Demo", img: "1.jpg",class:"demo" },
  { title: "Dem",  img: "4.jfif",class:"demo" },
  { title: "Demo dark", img: "3.jfif",class:"demo" },
  { title: "full width", img: "4.jfif" ,class:"shop"},
  { title: "Boxed image", img: "4.jfif" ,class:"shop"},
  { title: "off canvas", img: "4.jfif" ,class:"shop"},
  { title: "right SideBar", img: "4.jfif",class:"shop" },
  { title: "Horizontal Filter1", img: "4.jfif",class:"shop" },
  { title: "Horizontal Filter2", img: "4.jfif" ,class:"shop"},
  { title: "list Type", img: "4.jfif",class:"product" },
  { title: "infinite scroll", img: "4.jfif",class:"product" },
  { title: "col", img: "5.jfif",class:"product" },
  { title: "grid", img: "6.jfif",class:"other" },
];

const container = document.querySelector(".list .container");

function getCount(title) {
  if (title === "Demo") return 21;
  if (title === "Demo dark") return 3;
  if (title === "col") return 10;
  if (title === "grid") return 41;
  return 1;
}

images.forEach(item => {
  const count = getCount(item.title);

  for (let i = 1; i <= count; i++) {
    const card = document.createElement("div");
    card.className = "card reveal";
     card.dataset.category = `${item.class}`;
    card.innerHTML = `
      <img src="images/${item.img}">
      <span>${count > 1 ? item.title + " " + i : item.title}</span>
    `;

    container.appendChild(card);
  }
});


//////hide element////
const filterItems = document.querySelectorAll(".lis li");
const cards = document.querySelectorAll(".list .container .card");

filterItems.forEach(item => {
  item.addEventListener("click", (e) => {

    filterItems.forEach(li => li.classList.remove("a"));
    e.currentTarget.classList.add("a");

    const filter = e.currentTarget.dataset.filter;

    cards.forEach(card => {
      if (filter === "all" || card.dataset.category === filter) {
        card.classList.remove("hide");
      } else {
        card.classList.add("hide");
      }
    });

  });
});
 
///////////////////////////reviews//////////////////////////////////

const track = document.querySelector(".reviews-track");
const reviews = Array.from(track.children);
const prevBtn = document.querySelector(".container .prev");
const nextBtn = document.querySelector(".container .next");

let currentIndex = 1;

function updateClasses() {
  reviews.forEach((rev, i) => {
    rev.classList.remove("left", "active", "right");
    if (i === currentIndex) rev.classList.add("active");
    else if (i === (currentIndex - 1 + reviews.length) % reviews.length) rev.classList.add("left");
    else if (i === (currentIndex + 1) % reviews.length) rev.classList.add("right");
  });
}

function moveNext() {
  currentIndex = (currentIndex + 1) % reviews.length;
  updateClasses();
}

function movePrev() {
  currentIndex = (currentIndex - 1 + reviews.length) % reviews.length;
  updateClasses();
}

nextBtn.addEventListener("click", moveNext);
prevBtn.addEventListener("click", movePrev);

updateClasses();

//سحب

let isDragging = false;
let startX = 0;
let diff = 0;
const threshold = 60; 

track.addEventListener("mousedown", (e) => {
  isDragging = true;
  startX = e.clientX;
  track.style.cursor = "grabbing";
});

track.addEventListener("mousemove", (e) => {
  if (!isDragging) return;
  diff = e.clientX - startX;
});

track.addEventListener("mouseup", () => {
  if (!isDragging) return;
  isDragging = false;
  track.style.cursor = "grab";

  if (diff < -threshold) moveNext();
  else if (diff > threshold) movePrev();

  diff = 0;
});

track.addEventListener("mouseleave", () => {
  isDragging = false;
  diff = 0;
});
 
//phone
track.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
});

track.addEventListener("touchmove", (e) => {
  diff = e.touches[0].clientX - startX;
});

track.addEventListener("touchend", () => {
  if (diff < -threshold) moveNext();
  else if (diff > threshold) movePrev();
  diff = 0;
});

/////////////////////elements/////////////////////////////////

const pics = [
  { title: "ACCORDIONS", icon: "fa-bars" },
  { title: "ALERTS", icon: "fa-triangle-exclamation" },
  { title: "PRODUCTS", icon: "fa-cart-shopping" },
  { title: "PRODUCT CATEGORIES", icon: "fa-basket-shopping" },
  { title: "ANIMATIONS", icon: "fa-asterisk" },
  { title: "BUTTONS", icon: "fa-minus" },
  { title: "BANNERS", icon: "fa-cloud" },
  { title: "CALL TO ACTION", icon: "fa-up-right-from-square" },
  { title: "COUNTERS", icon: "fa-arrow-down-1-9" },
  { title: "COUNT DOWN", icon: "fa-clock" },
  { title: "HEADINGS", icon: "fa-text-height" },
  { title: "ICONS", icon: "fa-check" },
  { title: "INFO BOX", icon: "fa-box" },
  { title: "POSTS", icon: "fa-calendar" },
  { title: "TABS", icon: "fa-table-columns" },
  { title: "TESTIMONIALS", icon: "fa-comments" }
];

const contant = document.querySelector(".elements .container");

pics.forEach(item => {
  const card = document.createElement("div");
  card.className = "pic";

  card.innerHTML = `
    <i class="fa-solid f ${item.icon}"></i>
    <i class="fa-solid f2 ${item.icon}"></i>
    <h4>${item.title}</h4>
  `;

  contant.appendChild(card);
});