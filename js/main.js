/**
 * Main script for the interview test
 * 
 * @author Adrián Ángel Moya Moruno
 */

//I wanted to import these variables from another file in order to not make public the api key and url value
//As I am not sure if this test will be deploy in a server or locally, I can not use import/export modules from ES6
//import { API_URL,API_KEY } from "./config";

const API_KEY = 'live_qY1REt2fuF9QPPp7o6ddpXTGaQ03OIpVPu8rjYR5qzi1WAV0OXcXuv6vJtCPCwhw';
const API_URL = 'https://api.thecatapi.com/v1/images/search';

const launch = () => {
    //Get elements from HTML
    const accordionTitles = document.getElementsByClassName('accordionTitle')
    const accordionBodies = document.getElementsByTagName('dd')
    const ajaxImage = document.getElementById('ajaxImg')
    const catLink =  document.getElementById('catLink')
   
    //At start load a random cat in section 4
    getRandomCat(ajaxImage);

    //Event Listeners
    for (const accordionTitle of accordionTitles) {
        accordionTitle.addEventListener('click', (event) =>{
            const dtElement = event.currentTarget;
            for (const accordionBody of accordionBodies) {
                if (dtElement.nextElementSibling !== accordionBody){
                    accordionBody.previousElementSibling.firstChild.nextElementSibling.innerHTML = '+'
                    accordionBody.classList = '';
                }
            }
            //Here we show or hide the dd that is next of the dt that we clicked
            if(dtElement.nextElementSibling.classList.toggle("selected")){
                dtElement.firstChild.nextElementSibling.innerHTML = '-'
            }else{
                dtElement.firstChild.nextElementSibling.innerHTML = '+'
            }
        })
    }
    catLink.addEventListener('click', (event) =>{
        event.preventDefault();
        getRandomCat(ajaxImage);
    })

};
async function getRandomCat(ajaxImage){
    ajaxImage.src = './assets/img/loading.gif'
    await fetch(`${API_URL}?size=med`,{
        headers: {
            'x-api-key': API_KEY
          } 
        }
        )
    .then(response => response.json())
    .then(cat => { 
        ajaxImage.src = cat[0].url
    })
    .catch(err => console.log(err))
}

//Apply the script functionality when the DOM is totally loaded
document.addEventListener("DOMContentLoaded", launch)