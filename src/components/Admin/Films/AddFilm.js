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

export default function AddFilm({ onAdd }) {
    const [newfilm, setnewfilm] = useState(
        {
            name: "",
            release_date: null,
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
    return newfilm?(

        <div>

            <Box borderColor="secondary.main" {...defaultProps}>
                <br />
                <label>Add film</label>
                <hr />
                <br />
                <div >
                    <form onSubmit={handleSubmit} {...defaultForm}>

                        <TextField
                            fullWidth
                            id="standard-multiline-flexible"
                            label="Name:"
                            multiline
                            rowsMax={4}

                            onChange={(e) => handleInput('name', e)}
                        />
                        <TextField
                            fullWidth
                            id="standard-multiline-flexible"
                            label="Release date:"
                            multiline
                            rowsMax={4}
                            onChange={(e) => handleInput('release_date', e)}
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