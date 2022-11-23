import {  useEffect, useState } from "react";
import Form from "./components/Form";
import Table from "./components/Table";
import { collection, getDocs } from "firebase/firestore";
import { Provider } from "react-redux";
import {store} from "./redux"
import {ToastContainer} from "react-toastify"

import {db} from "./utils/firebase"

let arr =[]

function App() {

const [people,setPeople]=useState([]);

useEffect(()=> {
getData()
},[])
  
const getData = async()=> {

const querySnapshot = await getDocs(collection(db, "contacts"));

querySnapshot.docs.forEach((doc) => (arr.push({id:doc.id, data:doc.data() })))
setPeople(arr)
arr=[]
}

  return (
    <div style={{minHeight:"100vh"}} className="border border-2 app" > 
      <Provider store={store}>
      <ToastContainer/>
      <Form getData={getData}  />
      <Table people={people} getData={getData}  />
      </Provider>
    </div>
  );


  
}

export default App;
