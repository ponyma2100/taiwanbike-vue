import { ref } from 'vue'

function getAuthorizationHeader() {
  const AppID = '9cf5f22a363c4058b1262cbf3be0eef9';
  const AppKey = 'jojLjf4QvzK_2rNOLGNDh2qEJk0';

  let GMTString = new Date().toGMTString();
  let ShaObj = new jsSHA('SHA-1', 'TEXT');
  ShaObj.setHMACKey(AppKey, 'TEXT');
  ShaObj.update('x-date: ' + GMTString);
  let HMAC = ShaObj.getHMAC('B64');
  let Authorization = 'hmac username=\"' + AppID + '\", algorithm=\"hmac-sha1\", headers=\"x-date\", signature=\"' + HMAC + '\"';

  return { 'Authorization': Authorization, 'X-Date': GMTString /*,'Accept-Encoding': 'gzip'*/ };
}

const getBike = () => {
  const station = ref([])
  const availableBike = ref([])
  const headers = getAuthorizationHeader()

  const getStation = async (city) => {
    try {
      const response = await fetch(`https://ptx.transportdata.tw/MOTC/v2/Bike/Station/${city}?$format=JSON`, { headers })
      const data = await response.json()
      station.value = data

      return { station }

    } catch (error) {
      console.log(error)
    }
  }
  // https://ptx.transportdata.tw/MOTC/v2/Bike/Availability/Taichung?$format=JSON
  const getAvailableBike = async (city) => {

    try {
      const response = await fetch(`https://ptx.transportdata.tw/MOTC/v2/Bike/Availability/${city}?$format=JSON`, { headers })
      const data = await response.json()
      availableBike.value = await data

      return { availableBike }

    } catch (error) {
      console.log(error)
    }
  }


  return { getStation, station, getAvailableBike, availableBike }
}


export default getBike