async function talknikAdEngine() {
    // ???? id='talknik-ad' ??? ???? ??????? ?????
    const adContainer = document.getElementById('talknik-ad');
    if (!adContainer) return;

    try {
        const response = await fetch('https://talknik-backend.onrender.com/get-active-ad');
        const adHtml = await response.text();
        adContainer.innerHTML = adHtml;
        
        // ??????????? ??? ?????????? ????? ?????
        const scripts = adContainer.getElementsByTagName('script');
        for (let script of scripts) {
            const newScript = document.createElement('script');
            if (script.src) newScript.src = script.src;
            newScript.textContent = script.textContent;
            script.parentNode.replaceChild(newScript, script);
        }
    } catch (err) {
        console.error('Ad Engine Error:', err);
    }
}
// ????? ???? ???
talknikAdEngine();
