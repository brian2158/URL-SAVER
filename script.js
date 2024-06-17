
let myLeads = [] ;
let oldLeads = [] ;
const inputValue = document.getElementById("inputEl");
const button = document.getElementById("inputBtn");
const deleteBtn = document.getElementById("deleteBtn");
const savetab = document.getElementById("saveTab");
const ulEl = document.getElementById("unorder");
let leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));
//console.log(leadsFromLocalStorage);

savetab.addEventListener("click", () => {
    //get tab current tab from chrome
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
     myLeads.push(tabs[0].url)
    localStorage.setItem("myLeads",JSON.stringify(myLeads))
    render(myLeads);   
    } )
    
})
button.addEventListener("click", () => {
    myLeads.push(inputValue.value)
    inputValue.value = "" ;
    localStorage.setItem("myLeads",JSON.stringify(myLeads));
    render(myLeads);
})

const render = (leads) => {
    let listItems = "" ;
    for (let i = 0 ; i < leads.length ; i++)
    {
        let item = leads[i];
        listItems += `<li>
        <a target="_blank" href="${item}">
        ${item}
        </a>
        </li>`
    }
    ulEl.innerHTML = listItems ;
}
deleteBtn.addEventListener("dblclick", () => {
  localStorage.clear()
   myLeads = [] ;
   render(myLeads) ;
}) ;
if (leadsFromLocalStorage)
{
    myLeads = leadsFromLocalStorage ;
    render(myLeads);
}