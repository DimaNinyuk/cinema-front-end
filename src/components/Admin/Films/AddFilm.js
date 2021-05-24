import React, { useState, useEffect } from "react";
import axios from "axios";
import { escapeLeadingUnderscores } from "typescript";
export default function AddFilm({onAdd}) {
    const [newfilm, setnewfilm] = useState(
        {
            name: "",
            description: "",
            release_date: null,
            link_trailer: "",
            duration: "",
            company_id: null,
            image_id: null
        }
    );
    function handleSubmit(e) {
        e.preventDefault();
       // console.log(newfilm);
        onAdd(newfilm);
    };
    function handleInput(key, e) {
        var state = Object.assign({}, newfilm);
        state[key] = e.target.value;
        setnewfilm(state);
    };
    return (

        <div>
            <h2> Add new film </h2>
            <div >
                <form onSubmit={handleSubmit}>
                    <label> Name:
                        <input type="text" onChange={(e) => handleInput('name', e)} />
                    </label>
                    <label> Description:
                    <input type="text" onChange={(e) => handleInput('description', e)} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        </div>

    );
};