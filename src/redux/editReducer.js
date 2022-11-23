const initialState = {
    person:{
    id:null,
    username:"",
    phone:"",
    gender:"",
    },

    flag:false,
};

const editReducer = (state=initialState, {type,payload})=>{
    console.log(payload)
    switch (type) {
        case "FILLFORM":            
            return {person:{...state.person, id:payload.id, username:payload.username, phone:payload.phone, gender:payload.gender}, flag:payload.flag}
        case "FLAG" :
            return {person: {...state.person}, flag:false}
        default:
            return state
    }
}

export default editReducer