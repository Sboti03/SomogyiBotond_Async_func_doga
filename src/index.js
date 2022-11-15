
document.addEventListener('DOMContentLoaded', ()=> {

    loadQoute().then((qoutls)=> {
        console.log(qoutls.quotes)
    })

    document.getElementById('all-quote').addEventListener('click', ()=> {
        loadQoute().then((quoteList) => {
            let out = document.getElementById('output');
            let ul = document.createElement('ul');

            console.log(quoteList)
            
            quoteList.quotes.sort((a, b) => a.author.localeCompare(b.author))
            .forEach(e=> {
                let li = document.createElement('li');
                li.textContent = 'Szerző: ' + e.author + 'idézet: ' + e.quote
                ul.append(li)
            });
            out.append(ul)
        });
    });

});

const loadQoute = async () => {
    let json = await (await fetch('../quotes.json')).json()
    return json
}

