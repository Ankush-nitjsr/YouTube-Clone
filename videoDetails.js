let apiKey = "AIzaSyCX5nmr0zhmTrd2Dmyql2lDIfB6kEw1rT0";
const baseUrl = "https://www.googleapis.com/youtube/v3";

async function fetchChannelDetails(channelId = "UCBwmMxybNva6P_5VmxjzwqA"){
    let url = `${baseUrl}/channels?key=${apiKey}&part=snippet,statistics&id=${channelId}`;

    const response = await fetch(url);
    const result = await response.json();

    return result;
}

async function fetchVideoDetails(videoId = "B7wHpNUUT4Y"){
    let url = `${baseUrl}/videos?key=${apiKey}&part=snippet,contentDetails,statistics&id=${videoId}`;

    const response = await fetch(url, {method: "GET"});
    const videoInfo = await response.json();

    const channelDetails = await fetchChannelDetails(videoInfo.items[0].snippet.channelId);
    addDetailsOntoDOM(videoInfo, channelDetails);
}

function addDetailsOntoDOM(videoInfo, channelDetails) {
    /*
    <div class="container">
        <div class="video">

        </div>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut, accusamus architecto odio asperiores consectetur quis vel repellat quia autem at, ea doloribus enim corporis. Molestias amet veritatis quod. At, quisquam.</p>
        <div class="statistics">
            <div class="left">
                576,969 views . Oct 8, 2021
            </div>
            <div class="right">
                <div>
                    <span class="material-icons">
                        thumb_up
                    </span>
                    <span>1.7k</span>
                </div>
                <div>
                    <span class="material-icons">
                        thumb_down
                    </span>
                    <span>0.4k</span>
                </div>
            </div>
        </div>
        <div class="channel-container">
            <div class="left">
                <img src="" alt="">
                <div>
                    <span>Marcus Levin</span>
                    <span style="color: #AAA">1.2M subscribers</span>
                </div>
            </div>
            <button class="right">Subscribe</button>
        </div>
    </div>
    */

    const container = document.createElement('div');
    container.id = "container";

    container.innerHTML = `
                <div class="video">
                    <img src="${videoInfo.items[0].snippet.thumbnails.high.url}" alt="video image">
                </div>
                <p>${videoInfo.items[0].snippet.title}</p>
                <div class="statistics">
                    <div class="left">
                        ${videoInfo.items[0].statistics.viewCount} views
                    </div>
                    <div class="right">
                        <div>
                            <span class="material-icons">
                                thumb_up
                            </span>
                            <span>${videoInfo.items[0].statistics.likeCount}</span>
                        </div>
                        <div>
                            <span class="material-icons">
                                thumb_down
                            </span>
                            <span>${"NA"}</span>
                        </div>
                    </div>
                </div>
                <div class="channel-container">
                    <div class="left">
                        <img src="${channelDetails.items[0].snippet.thumbnails.high.url}" alt="">
                        <div>
                            <span>${channelDetails.items[0].snippet.title}</span>
                            <span style="color: #AAA">${channelDetails.items[0].statistics.subscriberCount} subscribers</span>
                        </div>
                    </div>
                    <button class="right">Subscribe</button>
                </div>
    `;

    document.body.appendChild(container);
}

fetchVideoDetails();