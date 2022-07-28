import React from "react";
import { useEffect, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import "../../style/homePage.css";
import db from "../../firebase/firebase";
import ListStudent from "../Student/ListStudent";

function Home(props) {
  const events = db.collection("user");
  const [admin, setAdmin] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    events.get().then((querySnapshot) => {
      const tempDoc = [];
      querySnapshot.forEach((doc) => {
        tempDoc.push({ id: doc.id, ...doc.data() });
      });
      setAdmin(tempDoc);
    });
  };

  return (
    <div className="home_page">
      <div className="flex">
        <Header getData={getData} admin={admin} />
        <ListStudent />
      </div>
      <Footer />
    </div>
  );
}

export default Home;
