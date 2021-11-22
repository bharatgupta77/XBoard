import {magazines} from '../data/magazines.js'
async function init(){
    const newsList = await fetchRSSFeeds() 
    console.log(newsList)
    addDataToDom(newsList)
}


async function fetchRSSFeeds() {
    try{
        const [coronaVirusResponse, indiaTechResponse, sportsResponse] = await Promise.all([
            fetch(`https://api.rss2json.com/v1/api.json?rss_url=${magazines[0]}`),
            fetch(`https://api.rss2json.com/v1/api.json?rss_url=${magazines[1]}`),
            fetch(`https://api.rss2json.com/v1/api.json?rss_url=${magazines[2]}`)
          ]);
          const coronaVirusNewsList = await coronaVirusResponse.json();
          const indiaTechNewsList = await indiaTechResponse.json();
          const sportsNewsList = await sportsResponse.json()
          return [coronaVirusNewsList, indiaTechNewsList, sportsNewsList];
        }catch(error){
            return null
        }
    }

function addDataToDom(newsList){
    for(let i=0; i<=2 ;i++) {

        let buttonElem = document.getElementById(`button-${i+1}`);
        let bodyElementAccordian = document.getElementById(`body-${i+1}`);

        //Prev Control
        let buttonControlPrevElem = document.createElement('button')
        //Next Control
        let buttonControlNextElem = document.createElement('button')

        buttonElem.innerHTML = newsList[i].feed.title;
        
        let newsItems = newsList[i].items


        const carouselElement = 
        `   <div id="carouselExampleInterval-${i+1}" class="carousel carousel-dark slide" data-bs-ride="carousel">
              <div id="InnerCarouselContainer-${i+1}" class="inner-carousel-container">  
              <div class="carousel-inner column-2"></div>
              <div>
            </div>
        `
        bodyElementAccordian.innerHTML = carouselElement;

        const carouselExampleInterval = document.getElementById(`carouselExampleInterval-${i+1}`)
        const innerCarouselContainer = document.getElementById(`InnerCarouselContainer-${i+1}`)



        //Set button control prev attribute

        buttonControlPrevElem.setAttribute('type', 'button')
        buttonControlPrevElem.setAttribute('data-bs-target', `#carouselExampleInterval-${i+1}`)
        buttonControlPrevElem.setAttribute('class', 'carousel-control-prev column-1')
        buttonControlPrevElem.setAttribute('data-bs-slide', 'prev')
        buttonControlPrevElem.setAttribute('style', 'color:black; width:2%; background: #ADD8E6; border-radius: 10px;')
        buttonControlPrevElem.setAttribute('id', `btn-prev-${i+1}`)



        buttonControlPrevElem.innerHTML = `
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
        `

        innerCarouselContainer.appendChild(buttonControlPrevElem)

        //Set button control next attribute

        buttonControlNextElem.setAttribute('type', 'button')
        buttonControlNextElem.setAttribute('data-bs-target',  `#carouselExampleInterval-${i+1}`)
        buttonControlNextElem.setAttribute('class', 'carousel-control-next column-3')
        buttonControlNextElem.setAttribute('data-bs-slide', 'next')
        buttonControlNextElem.setAttribute('style', 'color:black; width:2%; background: #ADD8E6; border-radius: 10px;')
        buttonControlNextElem.setAttribute('id', `btn-next-${i+1}`)


        buttonControlNextElem.innerHTML = `
        <span class="carousel-control-next-icon" style="color: black" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
        `
        innerCarouselContainer.appendChild(buttonControlNextElem)


        let index = 0
        const carouselInnerElem = document.getElementsByClassName("carousel-inner")


        newsItems.forEach(element => {

            let divCardElem = document.createElement('div')
            if(index == 0){
                divCardElem.setAttribute('class', 'active carousel-item')
            }
            else{
                divCardElem.setAttribute('class', 'carousel-item')
            }
            let date = new Date(element.pubDate)
            let d1 = date.toLocaleDateString('en-IN');

            divCardElem.innerHTML = 
            `
            <div class="card" style="width: 100%; height:100%;">
                <img src=${element.enclosure.link}  class="news-img" alt="">
                <div class="card-body" style="padding:2%; height:35%;">
                    <h5 class="card-title">${element.title}</h5>
                    <div class="d-flex" style="width:100%;margin-top:1%;">
                    <h6 class="card-subtitle text-muted">By ${element.author}</h6>
                    <h6 class="card-subtitle text-muted" style="margin-left:8%;">${d1}</h6>
                    </div>
                    <p class="card-text news-card-text">${element.description}</p>
                    <a href=${element.link} class="card-link" style="text-decoration : none">Details</a>
                </div>
            </div>
            
            `
            carouselInnerElem[i].appendChild(divCardElem)


            // let btn_prev = document.getElementById(`btn-prev-${i+1}`)
            // let btn_next = document.getElementById(`btn-next-${i+1}`)

            // console.log(index)
            // console.log(btn_prev)
            // console.log(btn_next)
            // if(index==0){
            //     btn_prev.style.display = "none"
            //     btn_next.style.display = "flex"

            // }
            // else if(index==9){
            //     btn_next.style.display = "none"
            //     btn_prev.style.display = "flex"
            // }
            // else{
            //     btn_prev.style.display = "flex"
            //     btn_next.style.display = "flex"
            // }

            index+=1

            
        });

        
    }

}


export { init };