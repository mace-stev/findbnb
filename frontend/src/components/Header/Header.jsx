import './Header.css'
function Header(){


    function exampleReducer( state={}, action){
        const newState={...state};
        let allIdsArray=[...state?.allIds|| []]
        let byIds={...state?.byId|| {}}
         switch(action.type){
          case ACTION:
          action.payload.forEach((element)=>{
            allIdsArray.push(element.id)
            byIds[element.id]=element
           })
          newState['byId']=byIds
          newState['allIds']=allIdsArray
          return newState;
         
         default:
          return state
       }}
    return(<></>)
}
export default Header;