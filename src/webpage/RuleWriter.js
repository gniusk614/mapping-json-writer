import { Button, FormControl, Grid, Input, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import * as React from 'react';
import { AiOutlinePlusCircle } from 'react-icons/ai'
import { AiOutlineMinusCircle } from 'react-icons/ai'
import Viewer from './RuleViewer';
import axios from 'axios'
import jsonReader from '../lib/mappingRule.json'

const inputStyle = {
    "margin": "10px",
    "width": "100%"
}


const types = [
    {
        value: '',
        label: '--',
    },
    {
        value: 'TARGET',
        label: 'TARGET',
    },
    {
        value: 'DATETIME',
        label: 'DATETIME',
    },
    {
        value: 'TARGET_AES_ENC',
        label: 'TARGET_AES_ENC',
    },
    {
        value: 'TARGET_CONVAERT',
        label: 'TARGET_CONVAERT',
    },
    {
        value: 'TARGET_COLLECTION_SIZE',
        label: 'TARGET_COLLECTION_SIZE',
    },
    {
        value: 'TARGET_LIST',
        label: 'TARGET_LIST',
    },
    {
        value: 'TARGET_EQUALS',
        label: 'TARGET_EQUALS',
    },
    {
        value: 'CODE_DATE',
        label: 'CODE_DATE',
    },
    {
        value: 'PARAMETER',
        label: 'PARAMETER',
    },
    {
        value: 'PARAMETER_STRING_LIST',
        label: 'PARAMETER_STRING_LIST',
    },
    {
        value: 'CODE',
        label: 'CODE',
    },
];


const rules = {
    "name": "",
    "key": "",
    "targetType": "",
    "type": "",
    "defaultValue": "",
    "expression": "",
    "targetPath": ""
};




export default function Writer() {
    const [type, setType] = React.useState('');
    const [inputValue, setInputValue] = React.useState(rules);

    let jsonData = jsonReader;


    const onClickHandler = (string) => {
        console.log(string)
        if(string=='delete'){
            jsonData.splice(-1,1);
        }else{
            jsonData = jsonData.concat(inputValue)
        }
        const data = jsonData;

        console.log(JSON.stringify(data))
        axios.put("/api/setting", data).then(function (res) {
                if (res.status === 200) {
                    alert("수정에 성공하였습니다.");
                } else {
                    alert("수정에 실패하였습니다. 잠시 후 다시 시도해주세요.");
                }
            });
        // "/api/setting";
    }


    const handleChange = (event) => {
        const value = event.target.value

        switch (event.target.name) {
            case "name": rules.name = value; break;
            case "key": rules.key = value; break;
            case "targetType": rules.targetType = value; break;
            case "type": rules.type = value; setType(value); break;
            case "defaultValue": rules.defaultValue = value; break;
            case "expression": rules.expression = value; break;
            case "targetPath": rules.targetPath = value; break;
        }
        setInputValue(rules)
    }


    return (

        <Grid container spacing={2}>
            <Grid item xs={6}>
                <div style={{ "margin": "40px" }}>
                    <div>
                        <TextField style={inputStyle} name="name" onChange={handleChange} label="name" variant="outlined" /><br />
                        <TextField style={inputStyle} name="key" onChange={handleChange} label="key" variant="outlined" /><br />
                        <TextField style={inputStyle} name="targetType" onChange={handleChange} label="targetType" variant="outlined" /><br />

                        <FormControl style={inputStyle}>
                            <InputLabel id="demo-simple-select-label">type</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                value={type}
                                name="type"
                                label="type"
                                onChange={handleChange}
                            >
                                {types.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl><br />

                        <TextField style={inputStyle} name="defaultValue" onChange={handleChange} label="defaultValue" variant="outlined" /><br />
                        <TextField style={inputStyle} name="expression" onChange={handleChange} label="expression" variant="outlined" /><br />
                        <TextField style={inputStyle} name="targetPath" onChange={handleChange} label="targetPath" variant="outlined" /><br />
                    </div>
                    <div>
                        <Button style={{ "margin": "10px", "width": "240px" }} disableElevation variant="contained" onClick={()=>onClickHandler("add")} startIcon={<AiOutlinePlusCircle />}>
                            Add
                        </Button>
                        <Button style={{ "margin": "10px", "width": "240px" }} variant="outlined" color='error' flag="delete" onClick={()=>onClickHandler("delete")} startIcon={<AiOutlineMinusCircle />}>
                            delete
                        </Button>
                    </div>
                </div>
            </Grid>
            <Grid item xs={6}>
                <Viewer />
            </Grid>
        </Grid>


    )
}