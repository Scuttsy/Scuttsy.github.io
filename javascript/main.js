// ==================== GLOBAL DATA ====================
let siteConfig = null;
let dataLoaded = false;

//data path
const DATA_PATH = './assets/data/';

async function fetchJSON(filename, params = null) {
    try {
        let url = DATA_PATH + filename;
        if (params) {
            url += '?' + params;
        }
        
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to load ' + filename);
        }
        return await response.json();
    } catch (error) {
        console.error('Error loading ' + filename + ':', error);
        return null;
    }
}


async function loadData() {
    try {
        const siteConfigData = await fetchJSON('site-config.json', 't=' + new Date().getTime());

        if (!siteConfigData) {
            throw new Error('Critical: could not load site config data');
        }

        siteConfig = siteConfigData;
        
        const dataVersion = siteConfig.versions && siteConfig.versions.data ? siteConfig.versions.data : '1.0';
        const vParam = 'v=' + dataVersion;

        console.log('loading data with version:', dataVersion);

        dataLoaded = true;
        return true;
    } catch (error) {
        console.error('Error loading data:', error);
        dataLoaded = false;   
        return false;
    }
}
   
// Function to copy email to clipboard
function copyEmail() {
    const email = "scutts001@gmail.com"
    
    navigator.clipboard.writeText(email).then(() => {
        alert(email + ' copied to clipboard!');
    }).catch(err => {
        console.error('Failed to copy email: ', err);
    });
}

function popOut(event) {
    const element = event.currentTarget;
    element.style.zIndex = 10;
    element.classList.toggle('open');
}

function renderMore(){
    const spotifyEmbed = document.getElementById('spotify-embed');
    if (spotifyEmbed && siteConfig.external && siteConfig.external.albumId) {
        spotifyEmbed.src = 'https://open.spotify.com/embed/playlist/' + siteConfig.external.albumId + '?utm_source=generator&theme=0';
    }
}

async function init(){
    await loadData();

    renderMore();

    // window.scrollTo({
    //     top: 0,
    //     behavior: 'smooth'
    // });
}

document.addEventListener('DOMContentLoaded', init);