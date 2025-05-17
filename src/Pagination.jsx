import { useEffect, useState } from "react";

const perPageCount = 10;
export const Pagination = () => {
  const [employeeData, setEmployeeData] = useState([]);
  const [pageData, setPageData] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [pageNo, setPageNo] = useState(0);

  const handleData = (data) => {
    if (data.length === 0) return;
    setEmployeeData(data);
    setPageCount(Math.ceil(data.length / perPageCount));
  };
  const IncrementPageNo = () => {
    setPageNo(Math.min(pageCount - 1, pageNo + 1));
  };
  const DecrementPageNo = () => {
    setPageNo(Math.max(0, pageNo - 1));
  };

  useEffect(() => {
    fetch(
      "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
    )
      .then((response) => response.json())
      .then((result) => handleData(result))
      .catch((error) => console.log("Error fetching employee data: ", error));
  }, []);
  useEffect(() => {
    const startIdx = pageNo * perPageCount;
    const endIdx = startIdx + perPageCount;
    setPageData(employeeData.slice(startIdx, endIdx));
  }, [pageNo, employeeData]);
  const thStyles = {
    paddingTop: " 12px",
    paddingBottom: " 12px",
    textAlign: "left",
    backgroundColor: " #04AA6D",
    color: "white",
  };
  const trStyles={
    paddingTop: "8px",
    textAlign: "left",
  };
  const buttonStyles={
    padding:"8px",
    borderRadius:"5px",
    backgroundColor: " #04AA6D",
    color: "white",
    border:"0"
  }
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "20px",
      }}
    >
      <h1>Employee Data Table</h1>
      {pageData.length > 0 && (
        <div>
          <table
            style={{
              width: "100vw",
              padding:"10px",
              border:"none"
            }}
          >
            <thead>
              <tr>
                <th style={thStyles} >ID</th>
                <th style={thStyles} >Name</th>
                <th style={thStyles} >Email</th>
                <th style={thStyles} >Role</th>
              </tr>
            </thead>
            <tbody>
              {pageData.map((row, idx) => {
                return (
                  <tr key={idx}  >
                    <td style={trStyles} >{row.id} </td>
                    <td style={trStyles} >{row.name} </td>
                    <td style={trStyles} >{row.email} </td>
                    <td style={trStyles} >{row.role} </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div style={{
            display:"flex",
            width:"100%",
            justifyContent:"center",
            alignItems:"center",
            textAlign:"center",
            gap:"10px",
            marginTop:"20px"
          }} >
            <button style={buttonStyles}  onClick={DecrementPageNo}>Previous</button>
            <p style={buttonStyles} >{pageNo + 1} </p>
            <button style={buttonStyles} onClick={IncrementPageNo}>Next</button>
          </div>
        </div>
      )}
    </div>
  );
};
