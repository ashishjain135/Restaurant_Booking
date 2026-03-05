import React, { useEffect, useState } from "react";
import API from "../../utils/axios";

const TableReservation = () => {

  const [tables,setTables] = useState([]);
  const [selectedTable,setSelectedTable] = useState(null);

  const fetchTables = async () => {

    const res = await API.get("/api/tables");

    setTables(res.data);

  };

  useEffect(()=>{

    fetchTables();

  },[]);


  return (

    <div className="max-w-6xl mx-auto py-10">

      <h2 className="text-3xl font-bold mb-8 text-center">
        Choose Your Table
      </h2>

      <div className="grid md:grid-cols-4 gap-6">

        {tables.map((table)=>{

          const statusColor =
            table.status === "available"
            ? "bg-green-200"
            : table.status === "reserved"
            ? "bg-yellow-200"
            : "bg-red-200";

          return (

            <div
              key={table._id}
              onClick={()=>{
                if(table.status==="available"){
                  setSelectedTable(table);
                }
              }}
              className={`p-6 rounded-xl cursor-pointer shadow ${statusColor}`}
            >

              <h3 className="font-bold text-lg">
                Table {table.tableNumber}
              </h3>

              <p className="text-sm">
                Seats: {table.capacity}
              </p>

              <p className="text-sm">
                Type: {table.types}
              </p>

            </div>

          )

        })}

      </div>

      {selectedTable && (

        <BookingForm
          table={selectedTable}
          close={()=>setSelectedTable(null)}
        />

      )}

    </div>

  );

};

export default TableReservation;