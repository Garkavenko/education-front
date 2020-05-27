import React from 'react';
import TextField from "@material-ui/core/TextField";
import {Checkbox} from "@material-ui/core";

function AbstractInput({ type, value, setValue, name, length, height, width, maxValue }) {

    let children = null;
    if (type === 'CheckBox') {
        children = (
            <div style={{ display: 'flex', margin: '8px 0', alignItems: 'center' }}>
                <Checkbox onChange={() => setValue(!value)} checked={!!value} name={name}  />
                <h7 style={{ marginBottom: 5 }}>{name}</h7>
            </div>
        )
    }
    if (type === 'Input') {
        children = (
            <>
                <h7 style={{ marginBottom: 5 }}>{name}</h7>
                <div style={{ display: 'flex' }}>
                    <TextField
                        variant="outlined"
                        style={{ flex: '0 0 90px', marginRight: 5, marginBottom: 10 }}
                        value={value}
                        placeholder="0"
                        onChange={(event) => {
                            const value = (event.target.value || '').replace(/[^0-9]/g, '');
                            if (maxValue === null || maxValue === undefined || parseInt(value, 10) <= parseInt(maxValue, 10) || !value) {
                                setValue(value);
                            }
                        }}
                    />
                </div>
            </>
        )
    }
    if (type === 'Array') {
        children = (
            <>
                <h7 style={{ marginBottom: 5 }}>{name}</h7>
                <div style={{ display: "flex" }}>
                {
                    [...Array(length || 0)].map((_, index) => {
                        return (
                            <TextField
                                key={index}
                                variant="outlined"
                                style={{ flex: '0 0 90px', marginRight: 5, marginBottom: 10 }}
                                value={value[index]}
                                placeholder="0"
                                onChange={(event) => {
                                    const value = (event.target.value || '').replace(/[^0-9]/g, '');
                                    if (maxValue === null || maxValue === undefined || parseInt(value, 10) <= parseInt(maxValue, 10) || !value) {
                                        setValue(value, index);
                                    }
                                }}
                            />
                        )
                    })
                }
                </div>
            </>
        )
    }
    if (type === 'Table') {
        children = (
            <>
                <h7 style={{ marginBottom: 5 }}>{name}</h7>
                <div style={{ display: "flex", flexDirection: 'column' }}>
                    {
                        [...Array(height || 0)].map((_, rowIndex) => {
                            return (
                                <div key={rowIndex} style={{ display: "flex" }}>
                                    {
                                        [...Array(width || 0)].map((_, columnIndex) => {
                                            return (
                                                <TextField
                                                    key={columnIndex}
                                                    variant="outlined"
                                                    placeholder="0"
                                                    style={{ flex: '0 0 90px', marginRight: 5, marginBottom: 10 }}
                                                    value={value?.[rowIndex]?.[columnIndex]}
                                                    onChange={(event) => {
                                                        const value = (event.target.value || '').replace(/[^0-9]/g, '');
                                                        if (maxValue === null || maxValue === undefined || parseInt(value, 10) <= parseInt(maxValue, 10) || !value) {
                                                            setValue(value, rowIndex, columnIndex);
                                                        }
                                                    }}
                                                />
                                            )
                                        })
                                    }
                                </div>
                            )
                        })
                    }
                </div>
            </>
        )
    }

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
        }}>
            {children}
        </div>
    );
}

export default AbstractInput;
