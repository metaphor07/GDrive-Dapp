import { useState } from "react";
import "./Display.css";

const Display = ({ contract, account }) => {
  const [data, setData] = useState("");
  const [oAddress, setOAddress] = useState("");

  //   const getdata = async (e) => {
  //     e.preventDefault();
  //     try {
  //       const data = await contract.methods.dispaly(account).call();
  //       console.log(data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  const getdata = async () => {
    let dataArray;
    const Otheraddress = document.querySelector(".address").value;
    try {
      if (oAddress) {
        dataArray = await contract.methods.display(account, oAddress).call();
      } else {
        dataArray = await contract.methods.display(account, account).call();
      }
      console.log(dataArray);
    } catch (e) {
      alert("You don't have access");
    }
    let isEmpty;
    if (dataArray) {
      isEmpty = Object.keys(dataArray).length === 0;
    }

    if (!isEmpty) {
      const str = dataArray?.toString();
      const str_array = str?.split(",");
      // console.log(str);
      // console.log(str_array);
      const images = str_array?.map((item, i) => {
        console.log(item);
        return (
          <a href={item} key={i} target="_blank">
            <img
              key={i}
              //   src={`https://gateway.pinata.cloud/ipfs/${item.substring(6)}`}
              src={item}
              alt="new"
              className="image-list"
            ></img>
          </a>
        );
      });
      setData(images);
    } else {
      alert("No image to display");
    }
  };
  return (
    <>
      <div className="image-list">{data}</div>
      <input
        type="text"
        placeholder="Enter Address"
        className="address"
        onChange={(e) => {
          setOAddress(e.target.value);
        }}
      ></input>
      <button className="center button" onClick={getdata}>
        Get Data
      </button>
    </>
  );
};
export default Display;
