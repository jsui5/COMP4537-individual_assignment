let xttp = new XMLHttpRequest();
const endPointRoot = "https://littlefatlamb.com/COMP4537/assignments/individual/";

document.getElementById("back").addEventListener("click", function() {
    window.location.href = "index.html";
});

function clearScreen() {
    document.getElementById("quotes").removeChild(document.getElementById("quoteList"));
    let newList = document.createElement("UL");
    newList.id = "quoteList";
    document.getElementById("quotes").appendChild(newList);
}

function showQuotes() {
    clearScreen();

    xttp.open("GET", endPointRoot + "quotes/", true);
    xttp.send();
    xttp.onreadystatechange = function () {

        if (this.readyState === 4 && this.status === 200) {
            let quotes = JSON.parse(xttp.responseText);
            if (quotes.length === 0) {
                alert("There are no quotes in the DB.");
            } else {
                quotes.forEach(obj => {
                    let newDiv = document.createElement("LI");
                    newDiv.id = "quote" + obj["id"];
                    newDiv.innerHTML = `<form class="quoteForm" id="'quote' + obj['id']">
                        <label>
                            Quote:
                            <textarea rows="4" cols="50" name="quote" class="quote" disabled>${obj["quote"]}</textarea>
                        </label>
                        <label>
                            Source:
                            <textarea rows="4" cols="50" name="source" class="source" disabled>${obj["source"]}</textarea>
                        </label>
                        </form>
                    <hr>`;
                    let quoteDiv = document.getElementById("quoteList");
                    quoteDiv.appendChild(newDiv);
                });
            }
        }
    }
}

function showLatest() {
    clearScreen();

    xttp.open("GET", endPointRoot + "quotes/1/", true);
    xttp.send()

    xttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            let quotes = JSON.parse(xttp.responseText);
            if (quotes.length === 0) {
                alert("There are no quotes in the DB.");
            } else {
                let newDiv = document.createElement("LI");
                newDiv.id = "quote" + quotes[0]["id"];
                newDiv.innerHTML = `<form class="quoteForm" id="'quote' + quotes[0]['id']">
                    <label>
                        Quote:
                        <textarea rows="4" cols="50" name="quote" class="quote" disabled>${quotes[0]["quote"]}</textarea>
                    </label>
                    <label>
                        Source:
                        <textarea rows="4" cols="50" name="source" class="source" disabled>${quotes[0]["source"]}</textarea>
                    </label>
                    </form>
                <hr>`;
                let quoteDiv = document.getElementById("quoteList");
                quoteDiv.appendChild(newDiv);
            }
        }
    }

}