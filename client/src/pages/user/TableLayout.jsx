import React, { useEffect, useState } from "react";
import API from "../../utils/axios";
import BookingForm from "../../components/user/BookingForm";

export default function TableLayout() {

  const [tables,setTables] = useState([]);
  const [selectedTable,setSelectedTable] = useState(null);

  const fetchTables = async () => {
    try{
      const res = await API.get("/api/tables");
      setTables(res.data);
    }catch(err){
      console.error(err);
    }
  };

  useEffect(()=>{
    fetchTables();
  },[]);


  return (

    <div className="max-w-6xl mx-auto py-10">

      <h2 className="text-3xl font-bold text-center mb-8">
        Choose Your Table
      </h2>

      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">

        {tables.map((table)=>{

          let color = "";

          if(table.status === "available") color = "border-green-500";
          if(table.status === "reserved") color = "border-yellow-500";
          if(table.status === "occupied") color = "border-red-500";

          return(

            <div
              key={table._id}
              className={`border-4 ${color} rounded-xl p-4 shadow cursor-pointer`}
              onClick={()=>{
                if(table.status === "available"){
                  setSelectedTable(table);
                }
              }}
            >

              <img
                src={table.image}
                alt="table"
                className="w-full h-40 object-cover rounded"
              />
              <h3 className="font-bold mt-3">
                Table {table.tableNumber}
              </h3>

              <p>
                Seats: {table.capacity}
              </p>

              <p>
                Type: {table.types}
              </p>

              <p className="text-sm mt-1">
                Status: {table.status}
              </p>
            </div>
          )
        })}
      </div>
      {selectedTable && (
        <div className="mt-10">
          <BookingForm
            tableNumber={selectedTable.tableNumber}
          />
        </div>
      )}
    </div>
  );
}