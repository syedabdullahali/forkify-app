import {async} from 'regenerator-runtime';
import{ TIMEOUT_SEC} from  './config.js'

const timeout = function (s) {
    return new Promise(function (_, reject) {
      setTimeout(function () {
        reject(new Error(`Request took too long! Timeout after ${s} second`));
      }, s * 1000);
    });
  };
 
  // fetch Api will won first race here 
  // and if it throw the error we can handel  by throw catch

export const getJSON  = async function(url){
 try{ 
const res = await Promise.race([fetch(url),timeout(TIMEOUT_SEC)])
const data = await res.json();
if(!res.ok) throw new Error(`${data.error} ${data.status}`)
 return data;
}catch(error){
  console.log(err)
    throw error
 }
}

// export const sendJSON  = async function(url,uploadData){
//   try{ 
//  const fetchPro = await fetch(url,{
//   method:'POST',
//   headers:{
//     'Content-Type':'application/json'
// },
// body:JSON.stringify(uploadData),
// });


//  const res = await Promise.race([fetchPro,timeout(TIMEOUT_SEC)])
//  const data = await res.json();
//  if(!res.ok) throw new Error(`${data.error} ${data.status}`)
//   return data;
//  }catch(error){
//    console.log(error)
//      throw error
//   }
//  }

 export const sendJSON = async function (url, uploadData ) {
  try {
    const fetchPro = fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(uploadData),
        })

    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data;
  } catch (err) {
    throw err;
  }
};




