// Currently not working for me but that's not surprising
const {Builder, By, Key, until} = require('selenium-webdriver');
const client = require('discord-rich-presence')('249572165337219073'); // Discord ID

let driver = new Builder().forBrowser('chrome').build();

async function findElements() {
    if (driver.getCurrentUrl() == "https://music.youtube.com/") {
        let title = await driver.findElement(By.className('title style-scope ytmusic-player-bar'));
        let artist = await driver.findElement(By.className('byline style-scope ytmusic-player-bar complex-string'));
        let cover = await driver.findElement(By.className('image style-scope ytmusic-player-bar'));
        let progress = await driver.findElement(By.className('time-info style-scope ytmusic-player-bar'))
        return [title, artist, cover, progress]
    }
}

async function run() {
    let info = await findElements();
    let start, end = info.progress.split(' / ');
    setTimeout(function() {
        client.updatePresence({
            state: 'LISTENING',
            details: info.title.getText(),
            startTimestamp: start,
            endTimestamp: end,
            largeImageKey: info.cover.getAttribute('src'),
            instance: true
        })
    }, 1000);
}