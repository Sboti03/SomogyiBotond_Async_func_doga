
document.addEventListener('DOMContentLoaded', ()=> {
    document.getElementById('szerzo-input').style.display = 'none'

    loadQoute().then((qoutls)=> {
        console.log(qoutls.quotes)
    })

    document.getElementById('all-quote').addEventListener('click', ()=> {
        document.getElementById('szerzo-input').style.display = 'none'

        loadQoute().then((quoteList) => {
            let out = document.getElementById('output');
            let ul = document.createElement('ul');
            out.innerHTML = ''
            console.log(quoteList)
            
            quoteList.quotes.sort((a, b) => a.author.localeCompare(b.author))
            .forEach(e=> {
                let li = document.createElement('li');
                li.innerHTML = 'Szerző: ' + e.author + '<br>' + 'idézet: ' + e.quote
                ul.append(li)
            });
            out.append(ul)
        });
    });

    document.getElementById('the').addEventListener('click', ()=> {
        document.getElementById('szerzo-input').style.display = 'none'

        loadQoute().then((quoteList) => {
            let tomb = quoteList.quotes.filter(e => e.quote.includes('The') || e.quote.includes('the'))
            tomb.forEach(e => {
                e.quote = e.quote.replace('The', '<b>The</b>')
                e.quote = e.quote.replace('the', '<b>the</b>')
            })
            let out = document.getElementById('output')
            out.innerHTML = ''
            let ol = document.createElement('ol')
            tomb.forEach(e => {
                let li = document.createElement('li');
                li.innerHTML = e.quote
                ol.append(li)
            })
            out.append(ol)
        })
        
    });

    document.getElementById('hossz').addEventListener('click', ()=> {
        document.getElementById('szerzo-input').style.display = 'none'

        loadQoute().then((quoteList) => {
            let szamok = []
            quoteList.quotes.forEach(e => {
                
                szamok.push(e.quote.length)
            })
            console.log(szamok)
            let tagoltSzamok = szamok.join(', ')
            let out = document.getElementById('output')
            out.innerHTML = ''
            let p = document.createElement('p')
            p.textContent = tagoltSzamok
            out.append(p)
        })
    })

    document.getElementById('darabszam').addEventListener('click', ()=> {
        document.getElementById('szerzo-input').style.display = 'block'
        document.getElementById('output').innerHTML = ''

    });

    document.getElementById('szerzo').addEventListener('input', (e)=> {
        let input = e.currentTarget.value
        loadQoute().then((quoteList) => {

            let teljesEgyezes = document.getElementById('type').checked
            let res = quoteList.quotes.filter(e=> {
                if(teljesEgyezes) {
                    return e.author === input
                } else {
                    return e.author.toUpperCase() === input.toUpperCase()
                }
            })
            let out = document.getElementById('output')
            out.innerHTML= ''
            let resultOut = document.createElement('input')
            resultOut.readOnly = true
            resultOut.value = res.length
            resultOut.type = 'number'
            out.append(resultOut)
            
        })
    });

});

const loadQoute = async () => {
    let json = await (await fetch('../quotes.json')).json()
    return json
}

