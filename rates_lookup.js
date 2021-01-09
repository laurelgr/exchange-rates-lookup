// =================================
// ------- State variables
// =================================
init_done = false;
current_base = "";


// =================================
// --------- Display functions
// =================================
// returns html text of a rate's display
function rateHTML(currency, rate) {
    return "<div id='"+currency+"' class='rate_card'><span onclick='baseChange(\""+currency+"\")'>"+
        currency+"</span><span>"+rate+"</span></div>";
}

//insert rateHTML after an element of given ID
function insertAfterID(id, currency, rate) {
    document.getElementById(id).insertAdjacentHTML("afterend", rateHTML(currency, rate));
}

//update given currency's rate
function rateUpdate(currency, rate) {
    document.getElementById(currency).lastChild.innerText = rate;
}

//update (or initialize) display for one day's rates
//result is object of expected content { base: text; date: text; rates: [ (currency: number)* ];}
function day_rates(result){
    if(init_done) {
        //update date (because when not available like weekends, request rate is not result rate)
        document.getElementById("date").value = result.date;

        //update base rate (security)
        rateUpdate(result.base, 1);

        //update all rates
        for (var currency in result.rates){ rateUpdate(currency, result.rates[currency]); }
    }
}

// =================================
// --------- API call functions
// =================================
//GET latest with default options (base EUR, latest date available)
function APILatest(){
    return fetch("https://api.exchangeratesapi.io/latest")
        .then(response => response.json());
}

function APIDate(date, base="EUR"){
    return fetch("https://api.exchangeratesapi.io/"+date+"?base="+base)
        .then(response => response.json());
}

// -------  UI handler functions
// call upon API to get given day's (or previous) rates with given base currency, updates display
function newRequest(base, date) {
    APIDate(date, base).then(result => day_rates(result));
}

// the date of rates to show has changed -> make request
function dateChange(date) {
    newRequest(current_base, date);
}

// if new base != current base, change currency and update rates
function baseChange(new_base) {
    if (new_base != current_base) {
        currency_element = document.getElementById(new_base);
        if (currency_element.parentNode.id == "timeout"){
            return;
        } else {
            // exchange classes for display
            document.getElementById(current_base).classList.toggle("current_base");
            document.getElementById(new_base).classList.toggle("current_base");

            // update state variable and hidden form
            current_base = new_base;
            document.getElementById("base").setAttribute("value", current_base);

            // GET new rates
            //TODO: recalculate client-side from known rates
            newRequest(new_base, document.getElementById("date").value);
        }
    }
}


// =================================
// --------- Initialization
// =================================
function initApp() {
    // populate with default data (latest day available, base EUR)
    APILatest().then(result => {
        // update latest date: show current date, limit max date
        document.getElementById("date").setAttribute("max",result.date);
        document.getElementById("date").value = result.date;;

        // input base rate display
        insertAfterID("input_base", result.base, 1);
        document.getElementById(result.base).classList.add("current_base");

        // input all rates
        for (var currency in result.rates){ insertAfterID("flex_linebreak", currency, result.rates[currency]); }

        // update state variable
        init_done = true;
        current_base = result.base;
    });
}

function initDrag() {
    dragula([document.getElementById("body"), document.getElementById("timeout")], {
         invalid: function (element, handle){
             if (element.classList.contains("immobile")||element.classList.contains("current_base"))
                 return true;
             else
                 return false;
             }
         });
}
