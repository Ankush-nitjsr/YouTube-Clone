let apiKey = "AIzaSyCX5nmr0zhmTrd2Dmyql2lDIfB6kEw1rT0";
const baseUrl = "https://www.googleapis.com/youtube/v3";


const searchButton = document.getElementById("search");
const searchInput = document.getElementById("search-input");
const container = document.querySelector(".container");


searchButton.addEventListener('click', function () {
    let searchString = searchInput.value.trim();
    if(searchString === ""){
        searchString = "JavaScript";
    }
    getSearchResults(searchString);
});

async function getSearchResults (searchString) {
    let url = `${baseUrl}/search?key=${apiKey}&q=${searchString}&part=snippet&maxResults=20`;
    const response = await fetch(url, { method: "GET" });
    const result = await response.json();

    addDataOntoUI(result.items);
    console.log(result);
}

function addDataOntoUI(videoList) {
    /**
        <div class="video">
            <div class="mainImage">
                <img src="https://i.ytimg.com/vi/17xwHO94JP8/default.jpg" alt="">
            </div>
            <div class="imageAndTitle">
                <img src="https://i.ytimg.com/vi/17xwHO94JP8/default.jpg" alt="">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos, quae?</p>
            </div>
            <div class="titleAndViews">
                <div>
                    <b>Channel-title</b>
                </div>
                <div>
                    <span>15k views</span>
                    <span>1 week ago</span>
                </div>
            </div>
        </div>
     */

    videoList.forEach((video) => {
        const {snippet} = video;
        const videoElement = document.createElement('div');
        videoElement.className = "video";

        videoElement.innerHTML = `
                    <div class="mainImage">
                    <img src="${snippet.thumbnails.high.url}" alt="">
                    </div>
                    <div class="imageAndTitle">
                        <img src="${snippet.thumbnails.high.url}" alt="">
                        <p>${snippet.title}</p>
                    </div>
                    <div class="titleAndViews">
                        <div>
                            <b>${snippet.channelTitle}</b>
                        </div>
                        <div>
                            <span>15k views</span>
                            <span>1 week ago</span>
                        </div>
                    </div>
        `;
        container.prepend(videoElement);
    });

    
}