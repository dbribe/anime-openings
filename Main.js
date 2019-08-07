import {openingsList} from "./anime-op";

const getDetails = (opening) => {
    const openingParts = opening.split(";");
    const anime = openingParts[0];
    const openingNumber = openingParts[1];
    const videoId = (new URLSearchParams(new URL(openingParts[2]).search).get("v")) || (new URL(openingParts[2]).pathname).slice(1);
    return {anime, openingNumber, videoId}
};

const videosList = [...document.querySelectorAll("ytd-playlist-video-renderer")].map((el, index) => {
    const videoId = new URLSearchParams(new URL("https://www.youtube.com" + el.querySelector("a.yt-simple-endpoint").href).search).get("v");
    const videoIndex = index + 1;
    const videoTitle = el.querySelector("span#video-title").innerText;
    const videoDeleted = videoTitle === "[Deleted video]";
    return {videoId, videoIndex, videoTitle, videoDeleted}
});

for (const opening of openingsList) {
    const {anime, openingNumber, videoId} = getDetails(opening);
    const match = videosList.find(el => el.videoId === videoId);
    if (!match) {
        console.warn("Video not found: ", anime, openingNumber);
    } else if (match.videoDeleted) {
        console.warn("Video deleted: ", match.videoIndex, anime, openingNumber);
    }
    // console.log(x);
}