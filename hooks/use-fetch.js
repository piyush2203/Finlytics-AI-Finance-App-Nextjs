const { useState } = require("react");
const { toast } = require("sonner");

export const useFetch = (cb) =>{
     const [data, setdata] = useState(undefined);
     const [error, seterror] = useState(null);
     const [loading, setloading] = useState(null);

     const fn = async(...args)=>{
        setloading(true);
        seterror(null);

        try {
            const response = await cb(...args);
            setdata(response);
            seterror(null);

        } catch (error) {
            seterror(error);
            toast.error(error.message);
        }finally{
            setloading(false);
        }
     }

     return {data,loading,error,fn,setdata};
}