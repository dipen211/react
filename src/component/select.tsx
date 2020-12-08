import Select from 'react-select';
import React from "react";

export const DropDown = (Props: any) => {
    return (
        <>
            <Select
                defaultValue={Props.id}
                value={Props.selectValue}
                onChange={Props.handleChange}
                options={Props.options}
            />
        </>
    )
}