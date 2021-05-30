import React, { useState, useEffect } from "react";
import axios from "axios";
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Add from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import { escapeLeadingUnderscores } from "typescript";
const defaultProps = {
    bgcolor: 'background.paper',
    m: 1,
    border: 5,
    style: { width: '85%', height: '80%', marginLeft: '15%', marginRight: '30%' },
};
const defaultForm = {
    style: { paddingLeft: '3%', paddingRight: '3%' },
};

export default function AddSession({ onAdd }) {
    const [newSession, setnewSession] = useState(
        {

            date:"",
            time:"",
            price:0,
            hall_id:null,
            film_id:null,
        }
    );
    function handleSubmit(e) {
        e.preventDefault();
        // console.log(newfilm);
        onAdd(newSession);
    };
    function handleInput(key, e) {
        var state = Object.assign({}, newSession);
        state[key] = e.target.value;
        setnewSession(state);
    };
    return newSession?(

        <div>

            <Box borderColor="secondary.main" {...defaultProps}>
                <br />
                <label>Add session</label>
                <hr />
                <br />
                <div >
                    <form onSubmit={handleSubmit} {...defaultForm}>

                        <TextField
                            fullWidth
                            id="standard-multiline-flexible"
                            label="Date:"
                            multiline
                            rowsMax={4}

                            onChange={(e) => handleInput('date', e)}
                        />
                        <TextField
                            fullWidth
                            id="standard-multiline-flexible"
                            label="Time:"
                            multiline
                            rowsMax={4}
                            onChange={(e) => handleInput('time', e)}
                        />
                        <br />
                        <br />
                        <Button
                            type="submit"
                            value="Submit"
                            variant="contained"
                            color="default"
                            startIcon={<Add />}
                        >

                            Add
                    </Button>
                    </form>
                </div>
            </Box>
            <br />
            <br />
        </div>

    ): (<div><p>Loading...</p></div>);
};