import React from "react";
import { Checkbox } from "../checkbox/CheckBox";
import IOption from "./Item";

interface IProps {
    onSelect: (selected: boolean) => void;
    showCheckbox?: boolean;
    option: IOption;
    active: boolean;
}

export default function Option(props: IProps) {
    const select = () => {
        props.onSelect(!props.active);
    }

    return (
        <div className="rowStyle-center-row p-1">
            &nbsp;&nbsp;
            {props.showCheckbox && <Checkbox checked={props.active} onClick={select} />}
            <div onClick={select}>
                &nbsp;{props.option.Title}
            </div>
        </div>
    );
}