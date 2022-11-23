import {AiFillPhone} from "react-icons/ai"
import {FaUserTie} from "react-icons/fa"
import {db} from "../utils/firebase"
 import { collection, addDoc, updateDoc, doc } from "firebase/firestore"; 
 import {useDispatch, useSelector} from "react-redux"
import   {toastSuccessNotify} from "../utils/customToastify"
import { useState } from "react";
import { changeFlag, fill } from "../redux/editAction";

const Form = ({getData})=> {

    const [kullanici, setKullanici] = useState({
        username:"",
        phone:"",
        gender:""
    });

    const [valueFlag, setValueFlag]=useState({
        nameFlag:false,
        phoneFlag:false,
        genderFlag:false
    });

    const dispatch=useDispatch()

   const {person,flag} =useSelector((state)=>state?.edit)
   console.log(person,flag);

    const addData =  async()=> {
       await addDoc(collection(db, "contacts"), {
       username:kullanici.username,
       phone:kullanici.phone,
       gender:kullanici.gender
       });
    getData();
    toastSuccessNotify("Item added successfully")     
}

    const updateData = async(id) => {

        const personRef = doc(db, "contacts", id);
        await updateDoc(personRef, {
            username:kullanici.username,
            phone:kullanici.phone,
            gender:kullanici.gender,
        }) 
        setValueFlag({...valueFlag, nameFlag:false, phoneFlag:false, genderFlag:false})
        dispatch(fill({username:"",phone:"",gender:"", id:null, flag:false})) 
        getData();

       toastSuccessNotify("Item updated successfully")  
    }


    const handleSubmit = (e)=> {
        e.preventDefault()
        if(person.id) {
            updateData(person.id)
            dispatch(changeFlag())
        }else {
            addData()
        }
        setKullanici({
            username:"",
            phone:"",
            gender:""
        })       
    }

    const getValueName = () => {
        if(flag && !valueFlag.nameFlag){
            setValueFlag({...valueFlag, nameFlag:true})
            setKullanici({...kullanici, username:person.username})
        }
        return kullanici.username
    }

    const getValuePhone = () => {
        if(flag && !valueFlag.phoneFlag){
            setValueFlag({...valueFlag, phoneFlag:true})
            setKullanici({...kullanici, phone:person.phone})
        }
         return kullanici.phone
    }

    const getValueGender = () => {
        if(flag && !valueFlag.genderFlag){
            setValueFlag({...valueFlag, genderFlag:true})
            setKullanici({...kullanici, gender:person.gender})
        }
         return kullanici.gender
    }


  return (
    <div className="formDiv" >
        <div>
            <h2 className="text-center" style={{backgroundColor:"white", padding:"0.75rem", borderRadius:"5px", marginBottom:"1rem"}}>ADD CONTACT</h2>
        </div>
        <form onSubmit={handleSubmit} style={{backgroundColor:"white", padding:"1.5rem", borderRadius:"5px", margin:"1.5rem 0", width:"100%" }}>
            <div>
                <FaUserTie style={{position:"relative",top:"30px",left:"10px"}} />
                <input
                type="text"
                placeholder="Name"
                className="form-control ps-4"
                id="name"
                value={getValueName()}
                aria-describedby="nameHelp"
                onChange={(e)=> setKullanici({...kullanici, username:e.target.value})}
                />                
            </div>
            <div className="mb-4">
                 <AiFillPhone style={{position:"relative",top:"30px",left:"10px"}} />
                <input
                type="number"
                placeholder="Phone number"
                className="form-control ps-4"
                value={getValuePhone()}
                id="phone"
                onChange={(e)=> setKullanici({...kullanici, phone:e.target.value})}
                />
            </div>
               
            <select value={getValueGender()} onChange={(e)=> setKullanici({...kullanici, gender:e.target.value})} className="form-select"   >
                    <option  >Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
            </select>
            <button   type="submit" className="btn btn-primary mt-4 w-100">
                Submit
            </button>
        </form>
    </div>
  )
}

export default Form