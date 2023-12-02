import React from "react";
import BoardForm from "../../components/board/BoardForm"
import BoardItem from "../../components/board/BoardsItem"


export default function Home() {
  return (
    <div className="home-page">
      <BoardForm />
      <BoardItem />
    </div>
  );
}
