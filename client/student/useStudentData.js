import { useEffect, useState } from "react"

const useStudentData = ()=>{
    const [studentData, setStudentData]=useState(null);
    const [loading, setLoading]= useState(true);
    
    useEffect(()=>{
        const fetchData = async()=>{
            try{
                const res = await fetch('http://localhost:5000/api/student/profile',{
                    credentials: "include"
                });

                const data = await res.json();
                if(data.success){
                    setStudentData(data.student);
                }else{
                    console.error(data.message)
                }
            }catch(err){
                console.error('fetch error',err);
            }finally{
                setLoading(false)
            }
        }
        fetchData();
    },[]);
    return {studentData, loading} 
}
export default useStudentData;