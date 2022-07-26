'use strict';
const axios = require("axios");

module.exports.getWeather = async (event) => {
  const city = event.sessionState.intent.slots.City.value.originalValue;
  const url = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&APPID=885e6010a53d68e6586907f5ec32c824";


try {
		const response = await axios.get(url);
		const data = response.data;
		const answer = "The temperature is " + data.main.temp +"C and Humidity is " + data.main.humidity + "% and "+ data.weather[0].description + " is expected";
	
		return {
		  "sessionState": {
		    "dialogAction": {
		      "type": "Close"
		    },
		    "intent": {
		      "name": "weather",
				  "state": "Fulfilled"
		    }
		  },
		  "messages": [
	       {
	         "contentType": "PlainText",
	         "content": answer
	        }
	    ]	
		}
  } catch (error){
		console.log(error);
  }
};
