import React, {useState} from "react";  
import Dashboard from "../components/Dashboard";

const Home = (props) => {
    const [noteList, setNoteList] = useState([]);
    return(
        <>
        
            <Dashboard noteList={noteList} setNoteList={setNoteList}/>

        </>
            
    )
}
export default Home;
