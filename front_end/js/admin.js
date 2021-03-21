let xttp = new XMLHttpRequest();
const endPointRoot = "https://littlefatlamb.com/COMP4537/assignments/individual/";

document.getElementById("back").addEventListener("click", function() {
    window.location.href = "index.html";
});

function del(id) {
    document.getElementById(id).remove();
}

document.getElementById("add").addEventListener("click", function () {
    let total = document.forms.length + 1;
    let newDiv = document.createElement("LI");
    newDiv.id = "quote" + total;
    newDiv.innerHTML = `<form class="quoteForm">
                <label>
                    Quote:
                    <textarea rows="4" cols="50" name="quote" class="quote"></textarea>
                </label>
                <label>
                    Source:
                    <textarea rows="4" cols="50" name="source" class="source"></textarea>
                </label>
                <input type="button" value="delete" class="delete" onclick="del('quote' + (document.forms.length))">
                </form>
            <hr>`;
    let quoteDiv = document.getElementById("quoteList");
    quoteDiv.appendChild(newDiv);
});

document.getElementById("save").addEventListener("click", async function() {
    console.log(document.forms.length);
    xttp.open("POST", endPointRoot + "reset/", true);
    xttp.send("RESET");
    xttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            console.log(document.forms.length);
            for (let i = 0; i < document.forms.length; i++) {
                let quote = document.forms[i].elements[0].value;
                let source = document.forms[i].elements[1].value;
                console.log(quote);
                console.log(source);
                if (quote.trim() === "" || source.trim() === "") {
                    alert("Both the quote and the source fields must be entered.")
                } else {
                    console.log("posting to db");
                    let xttp = new XMLHttpRequest();
                    xttp.open("POST", endPointRoot + "quote/", true);
                    xttp.setRequestHeader("Content-Type", "application/json");
                    xttp.send(JSON.stringify({"quote": quote, "source": source}));
                    xttp.onreadystatechange = function () {
                        if (this.readyState === 4 && this.status === 200) {
                            console.log(xttp.responseText);
                        }
                    }
                }
            }
        }
    };
});

function showQuotes() {
    xttp.open("GET", endPointRoot + "quotes/", true);
    xttp.send();
    xttp.onreadystatechange = function () {

    if (this.readyState === 4 && this.status === 200) {
        let quotes = JSON.parse(xttp.responseText);

            quotes.forEach(obj => {
                let newDiv = document.createElement("LI");
                newDiv.id = "quote" + obj["id"];
                newDiv.innerHTML = `<form class="quoteForm" id="'quote' + obj['id']">
                    <label>
                        Quote:
                        <textarea rows="4" cols="50" name="quote" class="quote">${obj["quote"]}</textarea>
                    </label>
                    <label>
                        Source:
                        <textarea rows="4" cols="50" name="source" class="source">${obj["source"]}</textarea>
                    </label>
                    <input type="button" value="delete" class="delete" onclick="del('quote' + ${obj['id']})">
                    </form>
                <hr>`;
                let quoteDiv = document.getElementById("quoteList");
                quoteDiv.appendChild(newDiv);
            })
        }
    }
}

showQuotes();