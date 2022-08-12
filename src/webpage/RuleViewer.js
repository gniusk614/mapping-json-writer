import { TextField } from '@mui/material'
import React from 'react'
import jsonReader from '../lib/mappingRule.json'




export default function Viewer() {
    const [viewer, setViewer] = React.useState(JSON.stringify(jsonReader, null, 2))
    
    // const fieldRef = React.useRef(null)

    // const scrollToBottom = () => {
    //     fieldRef.current.scrollIntoView({ behavior: "smooth" })
    //   }

    //   React.useEffect(scrollToBottom, [viewer])
    return (
        <div style={{ "margin": "40px" }}>
            <TextField
                style={{ "margin": "10px", "width": "100%" }}
                id="outlined-multiline-static"
                label="mappingRule.json"
                multiline
                rows={21}
                defaultValue={viewer}
                inputProps={
                    { readOnly: true, }
                }
            />
        </div>
    )
}