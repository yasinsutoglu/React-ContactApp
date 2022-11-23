import {BsTrashFill} from "react-icons/bs"
import {FiEdit} from "react-icons/fi"
import { doc, deleteDoc} from "firebase/firestore";
import {db} from "../utils/firebase"
 import {useDispatch} from "react-redux"
 import { fill } from "../redux/editAction";



const Table = ({people,getData}) => {    

    const dispatch=useDispatch()

    const deleteContact = async(id)=> {
        await deleteDoc(doc(db, "contacts", id));
        getData()       
    }

    const upDateContact = async({id,username,phone,gender} ) => {
        
    //   setValueFlag({...valueFlag,  nameFlag:false, phoneFlag:false, genderFlag:false })

        dispatch(fill({username:username,phone:phone,gender:gender, id:id}))    
        
        getData()
    }

   
  return (
    <div className="tableDiv">
        <div>
            <h2 className="text-center" style={{backgroundColor:"white", padding:"0.75rem", borderRadius:"5px", marginBottom:"1rem"}}> CONTACT</h2>
        </div>
        <div className="d-sm-flex justify-content-sm-start ">
            <table className="table table-success table-striped">
                <thead>
                    <tr>
                    <th scope="col">Username</th>
                    <th scope="col">Phone Number</th>
                    <th scope="col">Gender</th>
                    <th scope="col">Delete</th>
                    <th scope="col">Edit</th>
                    </tr>
                </thead>
                <tbody>
                {people.map((person)=> {
                    const {id,data:{username,phone,gender}} =person
                    return(
                        <tr key={id}>
                    <th scope="row">{username}</th>
                    <td>{phone}</td>
                    <td>{gender}</td>
                    <td><BsTrashFill style={{cursor:"pointer"}} onClick={()=>deleteContact(id)} /></td>
                    <td><FiEdit style={{cursor:"pointer"}} onClick={()=>upDateContact({username,phone,gender,id})}  /></td>
                    </tr>
                    )
                })}                   
                </tbody>
            </table>
        </div>

    </div>
  )
}

export default Table