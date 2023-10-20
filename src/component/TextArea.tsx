import React, { useState } from 'react'
import { InputType } from '@/type/componentType'

const TextArea = ({ dis, type, name, value, onChange, warn, icon1, icon2 }: InputType) => {
    const [focus, setFocus] = useState<boolean>(false)
    return (
        <div className={`input ${focus ? "inputFocus" : ""} ${value ? "inputFocus inputBlur" : ""} ${dis ? "inputDisable" : ""}`}>
            <p>{name}</p>
            <div className="inputBox">
                <textarea
                    disabled={dis ? dis : false}
                    value={value}
                    onChange={(e) => onChange(e)}
                    onFocus={() => { setFocus(true) }}
                    onBlur={() => setFocus(false)}>
                </textarea>
                <div className={"iconBox"}>
                    {icon1 ? icon1 : null}
                    {icon2 ? icon2 : null}
                </div>
            </div>
            {warn ? <p className='warn'>{warn}</p> : null}
        </div>
    )
}

export default TextArea