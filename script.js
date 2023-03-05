// for get data on clicking butttons
function clicked(a) {
    // console.log('hi');
    document.querySelector(".new-section").style.display = "flex";
    document.querySelector(".saved-section").style.display = "none";
    let btns = document.querySelectorAll(".current1 button");
    for (let i = 0; i < btns.length; i++) {
        btns[i].style.backgroundColor = "#ffc107";
    }
    a.style.backgroundColor = "rgb(203, 253, 122)";

    var remove = document.getElementsByClassName('remove');
    for (var i = 0; i < remove.length; i++) {
        remove[i].remove();
    }
    document.querySelector(".current").innerHTML = "";


    // axios 
    // API integrate here
    var x = [];
    let val = a.value;
    fetch(`https://inshorts.deta.dev/news?category=${val}`)
        .then((res) => {return res.json()}).then((value)=>{
            console.log(value.data);
            let x = value.data;
            for (var i = 0; i < x.length; i++) {
                var id = x[i].id;
                var title = x[i].title;
                var author = x[i].author;
                var content = x[i].content;
                var date = x[i].date;
                var time = x[i].time;
                var readMoreUrl = x[i].readMoreUrl;

                filling(id,title, author, content, date, time, readMoreUrl);
            }
            a = "";
        });

    // get output in the HTML part 
    var current = document.querySelector('.current');
    function filling(id,title, author, content, date, time) {

        var span = document.createElement('span');
        var span1 = document.createElement('span');
        var span2 = document.createElement('span');
        var span3 = document.createElement('span');
        var span4 = document.createElement('span');
        var p = document.createElement('p');
        // var p1 = document.createElement('p');
        var div = document.createElement('div');
        var l = document.createElement('i');
        l.setAttribute('class', 'fa-solid fa-heart myicon');
        l.setAttribute('onclick', 'saved(this)');
        div.setAttribute('class', 'textarea remove');
        span1.setAttribute('class', 'right');
        div.appendChild(span);
        div.appendChild(span1);
        div.appendChild(span2);
        div.appendChild(span3);
        div.appendChild(span4);
        div.appendChild(p);
        // div.appendChild(p1);
        div.appendChild(l);
        current.appendChild(div);

        span.innerHTML =  "<span class='title'> Title: "+ title + "</span>";
        span1.innerHTML = "<br><span class='author'>Author: " + author + "</span>";
        span2.innerHTML = "<br><span class='date'>Date and Time: " + date + " / "+ time + "</span>";
        span3.innerHTML = "<span class='category'>Category: " + a.innerText +"</span>";
        span4.innerHTML = "<span class='id'>" + id +"</span>";
        // console.log(a);
        p.innerHTML = "<span class='para'>"+ content +"</sapn>"


    }
}
// local storage
function saved(a){
    let id=a.parentElement.getElementsByClassName('id')[0].innerHTML;
    console.log(id);

    localStorage.setItem(id,"<div class='textarea remove'>"+a.parentElement.innerHTML+"</div>");
    
    let saved2 = localStorage.getItem(id);
    document.querySelector(".stored").appendChild(saved2);
}

// saved button function
function saved_N(a){
    a.style.backgroundColor = "rgb(203, 253, 122)";
    document.querySelector(".new-section").style.display = "none";
    document.querySelector(".saved-section").style.display = "flex";
    // document.querySelector(".myicon").style.color = "red";
    for(var i=0; i<localStorage.length; i++){
       document.querySelector(".stored").appendChild(localStorage.getItem(localStorage.key(i)));
    }
}